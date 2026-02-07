import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase";

// GET /api/agents/[id] - Get agent details
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        if (!id) {
            return NextResponse.json({ error: "Agent ID is required" }, { status: 400 });
        }

        const supabase = createServerSupabaseClient();

        const { data: agent, error } = await supabase
            .from("agents")
            .select("*")
            .eq("id", id)
            .single();

        if (error || !agent) {
            return NextResponse.json({ error: "Agent not found" }, { status: 404 });
        }

        // Don't expose encrypted tokens
        const { telegram_bot_token_encrypted, gateway_token_hash, configuration, ...safeAgent } = agent;

        const domain = process.env.CLAWBRICK_DOMAIN || "clawbrick.com";
        const gatewayUrl = agent.main_ip
            ? (agent.subdomain ? `https://${agent.subdomain}.${domain}` : `https://${agent.main_ip}`)
            : null;

        return NextResponse.json({
            ...safeAgent,
            gatewayUrl,
        });

    } catch (error) {
        console.error("Get agent error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

// DELETE /api/agents/[id] - Destroy agent and VM
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        if (!id) {
            return NextResponse.json({ error: "Agent ID is required" }, { status: 400 });
        }

        const supabase = createServerSupabaseClient();

        // Get agent to check Vultr instance
        const { data: agent, error: fetchError } = await supabase
            .from("agents")
            .select("vultr_instance_id, status")
            .eq("id", id)
            .single();

        if (fetchError || !agent) {
            return NextResponse.json({ error: "Agent not found" }, { status: 404 });
        }

        if (agent.status === "destroyed") {
            return NextResponse.json({ error: "Agent already destroyed" }, { status: 400 });
        }

        // TODO: Trigger Terraform destroy for the VM
        // For now, just update status
        if (agent.vultr_instance_id) {
            // In production: run terraform destroy or call Vultr API directly
            console.log(`Would destroy Vultr instance: ${agent.vultr_instance_id}`);
        }

        // Update agent status
        const { error: updateError } = await supabase
            .from("agents")
            .update({
                status: "destroyed",
                updated_at: new Date().toISOString(),
                provisioning_logs: [
                    { timestamp: new Date().toISOString(), message: "Agent destruction initiated", level: "info" },
                ],
            })
            .eq("id", id);

        if (updateError) {
            console.error("Failed to update agent:", updateError);
            return NextResponse.json({ error: "Failed to destroy agent" }, { status: 500 });
        }

        return NextResponse.json({
            success: true,
            message: "Agent destruction initiated",
        });

    } catch (error) {
        console.error("Destroy agent error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

// PATCH /api/agents/[id] - Update agent (restart, stop, etc.)
export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { action } = body;

        if (!id) {
            return NextResponse.json({ error: "Agent ID is required" }, { status: 400 });
        }

        const supabase = createServerSupabaseClient();

        const { data: agent, error: fetchError } = await supabase
            .from("agents")
            .select("status, main_ip")
            .eq("id", id)
            .single();

        if (fetchError || !agent) {
            return NextResponse.json({ error: "Agent not found" }, { status: 404 });
        }

        let newStatus = agent.status;
        let logMessage = "";

        switch (action) {
            case "start":
                if (agent.status === "stopped") {
                    newStatus = "running";
                    logMessage = "Agent started";
                    // TODO: SSH into VM and start OpenClaw service
                }
                break;
            case "stop":
                if (agent.status === "running") {
                    newStatus = "stopped";
                    logMessage = "Agent stopped";
                    // TODO: SSH into VM and stop OpenClaw service
                }
                break;
            case "restart":
                if (["running", "stopped", "error"].includes(agent.status)) {
                    newStatus = "running";
                    logMessage = "Agent restarted";
                    // TODO: SSH into VM and restart OpenClaw service
                }
                break;
            default:
                return NextResponse.json({ error: "Invalid action" }, { status: 400 });
        }

        const { error: updateError } = await supabase
            .from("agents")
            .update({
                status: newStatus,
                updated_at: new Date().toISOString(),
            })
            .eq("id", id);

        if (updateError) {
            return NextResponse.json({ error: "Failed to update agent" }, { status: 500 });
        }

        return NextResponse.json({
            success: true,
            status: newStatus,
            message: logMessage,
        });

    } catch (error) {
        console.error("Update agent error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
