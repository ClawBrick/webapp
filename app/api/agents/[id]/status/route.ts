import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase";

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
            .select("id, name, status, main_ip, subdomain, deploy_region, llm_provider, llm_model, provisioning_started_at, provisioning_completed_at, provisioning_logs, last_error, created_at")
            .eq("id", id)
            .single();

        if (error || !agent) {
            return NextResponse.json({ error: "Agent not found" }, { status: 404 });
        }

        // Calculate provisioning progress
        let progress = 0;
        let estimatedTimeRemaining = null;

        if (agent.status === "provisioning") {
            const started = new Date(agent.provisioning_started_at).getTime();
            const elapsed = Date.now() - started;
            const estimatedTotal = 5 * 60 * 1000; // 5 minutes estimate
            progress = Math.min(95, Math.floor((elapsed / estimatedTotal) * 100));
            estimatedTimeRemaining = Math.max(0, Math.ceil((estimatedTotal - elapsed) / 1000));
        } else if (agent.status === "ready" || agent.status === "running") {
            progress = 100;
        } else if (agent.status === "error") {
            progress = -1;
        }

        // Generate gateway URL if ready
        const domain = process.env.CLAWBRICK_DOMAIN || "clawbrick.com";
        const gatewayUrl = agent.main_ip
            ? (agent.subdomain ? `https://${agent.subdomain}.${domain}` : `https://${agent.main_ip}`)
            : null;

        return NextResponse.json({
            id: agent.id,
            name: agent.name,
            status: agent.status,
            mainIp: agent.main_ip,
            subdomain: agent.subdomain,
            gatewayUrl,
            deployRegion: agent.deploy_region,
            llmProvider: agent.llm_provider,
            llmModel: agent.llm_model,
            progress,
            estimatedTimeRemaining,
            logs: agent.provisioning_logs || [],
            lastError: agent.last_error,
            createdAt: agent.created_at,
            provisioningStartedAt: agent.provisioning_started_at,
            provisioningCompletedAt: agent.provisioning_completed_at,
        });

    } catch (error) {
        console.error("Status check error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
