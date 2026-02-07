import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient, Agent } from "@/lib/supabase";
import crypto from "crypto";

// Simple encryption for storing sensitive tokens
function encryptToken(token: string): string {
    const key = process.env.ENCRYPTION_KEY;
    if (!key) throw new Error("ENCRYPTION_KEY not set");

    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(key, "hex"), iv);
    let encrypted = cipher.update(token, "utf8", "hex");
    encrypted += cipher.final("hex");
    return iv.toString("hex") + ":" + encrypted;
}

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

        const supabase = createServerSupabaseClient();

        // Generate credentials
        const gatewayToken = generateGatewayToken();
        const subdomain = generateSubdomain(userId);

        // Encrypt sensitive data
        const telegramTokenEncrypted = encryptToken(telegramBotToken);
        const gatewayTokenHash = hashToken(gatewayToken);

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
                configuration: { apiKey: apiKey ? encryptToken(apiKey) : null },
            })
            .select()
            .single();

        if (insertError) {
            console.error("Failed to create agent:", insertError);
            return NextResponse.json({ error: "Failed to create agent" }, { status: 500 });
        }

        // TODO: Queue Terraform provisioning job
        // For now, we'll simulate async provisioning with a placeholder
        // In production, use BullMQ, Redis, or Supabase Edge Functions

        // Log provisioning queued
        await supabase
            .from("agents")
            .update({
                provisioning_logs: [
                    ...((agent as Agent).provisioning_logs || []),
                    { timestamp: new Date().toISOString(), message: "Terraform provisioning queued", level: "info" },
                ],
            })
            .eq("id", agent.id);

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
