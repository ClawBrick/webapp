import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient, Agent, encryptToken } from "@/lib/supabase";
import { terraformProvisioner } from "@/lib/terraform/provisioner";
import crypto from "crypto";

function hashToken(token: string): string {
    return crypto.createHash("sha256").update(token).digest("hex");
}

function generateGatewayToken(): string {
    return crypto.randomBytes(32).toString("hex");
}

function generateSubdomain(userId: string): string {
    const hash = crypto.createHash("sha256").update(userId + Date.now()).digest("hex");
    return hash.substring(0, 12);
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const {
            userId,
            name,
            description,
            llmProvider,
            llmModel,
            telegramBotToken,
            apiKey,
            deployRegion = "bom",
        } = body;

        // Validation
        if (!userId) {
            return NextResponse.json({ error: "userId is required" }, { status: 400 });
        }
        if (!name) {
            return NextResponse.json({ error: "name is required" }, { status: 400 });
        }
        if (!llmProvider || !llmModel) {
            return NextResponse.json({ error: "LLM provider and model are required" }, { status: 400 });
        }
        if (!telegramBotToken) {
            return NextResponse.json({ error: "Telegram bot token is required" }, { status: 400 });
        }

        // Check required environment variables
        const vultrApiKey = process.env.VULTR_API_KEY;
        const controlServerIp = process.env.CONTROL_SERVER_IP;
        const domain = process.env.CLAWBRICK_DOMAIN || "clawbrick.com";
        const adminEmail = process.env.ADMIN_EMAIL || "support@clawbrick.com";

        if (!vultrApiKey) {
            return NextResponse.json({ error: "VULTR_API_KEY not configured" }, { status: 500 });
        }
        if (!controlServerIp) {
            return NextResponse.json({ error: "CONTROL_SERVER_IP not configured" }, { status: 500 });
        }

        const supabase = createServerSupabaseClient();

        // Generate credentials
        const gatewayToken = generateGatewayToken();
        const subdomain = generateSubdomain(userId);

        // Encrypt sensitive data
        const telegramTokenEncrypted = encryptToken(telegramBotToken);
        const gatewayTokenHash = hashToken(gatewayToken);
        const apiKeyEncrypted = apiKey ? encryptToken(apiKey) : null;

        // Create agent record
        const { data: agent, error: insertError } = await supabase
            .from("agents")
            .insert({
                user_id: userId,
                name,
                description: description || `OpenClaw agent with ${llmModel}`,
                status: "provisioning",
                llm_provider: llmProvider,
                llm_model: llmModel,
                telegram_bot_token_encrypted: telegramTokenEncrypted,
                gateway_token_hash: gatewayTokenHash,
                subdomain,
                deploy_region: deployRegion,
                provisioning_started_at: new Date().toISOString(),
                provisioning_logs: [{ timestamp: new Date().toISOString(), message: "Agent creation initiated", level: "info" }],
                configuration: { apiKey: apiKeyEncrypted },
            })
            .select()
            .single();

        if (insertError) {
            console.error("Failed to create agent:", insertError);
            return NextResponse.json({ error: "Failed to create agent" }, { status: 500 });
        }

        // Start Terraform provisioning in the background
        // We don't await this - it runs asynchronously
        const agentRecord = agent as Agent;
        provisionAgentAsync(agentRecord.id, {
            vultr_api_key: vultrApiKey,
            user_id: userId,
            agent_id: agentRecord.id,
            llm_provider: llmProvider,
            llm_model: llmModel,
            telegram_bot_token: telegramBotToken,
            api_key: apiKey || "",
            gateway_token: gatewayToken,
            subdomain,
            domain,
            admin_email: adminEmail,
            control_server_ip: controlServerIp,
            vultr_region: deployRegion,
        });

        return NextResponse.json({
            success: true,
            agent: {
                id: agent.id,
                name: agent.name,
                status: agent.status,
                subdomain: agent.subdomain,
                deployRegion: agent.deploy_region,
            },
            // Show gateway token ONCE - user must save it
            gatewayToken,
            message: "Agent deployment started. This may take 3-7 minutes.",
        });

    } catch (error) {
        console.error("Launch error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

/**
 * Asynchronous Terraform provisioning
 * This runs in the background and updates the agent record with progress
 */
async function provisionAgentAsync(agentId: string, vars: {
    vultr_api_key: string;
    user_id: string;
    agent_id: string;
    llm_provider: string;
    llm_model: string;
    telegram_bot_token: string;
    api_key: string;
    gateway_token: string;
    subdomain: string;
    domain: string;
    admin_email: string;
    control_server_ip: string;
    vultr_region?: string;
}) {
    const supabase = createServerSupabaseClient();

    try {
        // Update logs
        await addProvisioningLog(supabase, agentId, "Initializing Terraform workspace...", "info");

        // Run Terraform provisioning
        const result = await terraformProvisioner.provisionAgent(vars);

        // Process logs
        for (const log of result.logs) {
            await addProvisioningLog(supabase, agentId, log, "info");
        }

        if (result.success && result.outputs) {
            // Update agent with success status
            await supabase
                .from("agents")
                .update({
                    status: "running",
                    instance_id: result.outputs.instance_id,
                    instance_ip: result.outputs.main_ip,
                    gateway_url: `https://${vars.subdomain}.${vars.domain}`,
                    provisioning_completed_at: new Date().toISOString(),
                })
                .eq("id", agentId);

            await addProvisioningLog(supabase, agentId, `OpenClaw instance ready at https://${vars.subdomain}.${vars.domain}`, "success");
        } else {
            // Update agent with error status
            await supabase
                .from("agents")
                .update({
                    status: "error",
                    provisioning_error: "Terraform provisioning failed. Check logs for details.",
                })
                .eq("id", agentId);

            await addProvisioningLog(supabase, agentId, "Provisioning failed. See previous logs for details.", "error");
        }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error(`Provisioning error for agent ${agentId}:`, error);

        await addProvisioningLog(supabase, agentId, `Error: ${errorMessage}`, "error");

        await supabase
            .from("agents")
            .update({
                status: "error",
                provisioning_error: errorMessage,
            })
            .eq("id", agentId);
    }
}

async function addProvisioningLog(supabase: ReturnType<typeof createServerSupabaseClient>, agentId: string, message: string, level: "info" | "success" | "error" | "warning") {
    try {
        // First get current logs
        const { data: agent } = await supabase
            .from("agents")
            .select("provisioning_logs")
            .eq("id", agentId)
            .single();

        const currentLogs = (agent?.provisioning_logs as Array<{ timestamp: string; message: string; level: string }>) || [];
        const newLog = { timestamp: new Date().toISOString(), message, level };

        // Update with new log
        await supabase
            .from("agents")
            .update({
                provisioning_logs: [...currentLogs, newLog],
            })
            .eq("id", agentId);
    } catch (error) {
        console.error("Failed to add provisioning log:", error);
    }
}
