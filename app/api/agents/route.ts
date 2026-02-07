import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase";

// GET /api/agents - List agents for a user
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");

        if (!userId) {
            return NextResponse.json({ error: "userId is required" }, { status: 400 });
        }

        const supabase = createServerSupabaseClient();

        const { data: agents, error } = await supabase
            .from("agents")
            .select(`
        id,
        name,
        description,
        status,
        vultr_instance_id,
        main_ip,
        subdomain,
        deploy_region,
        llm_provider,
        llm_model,
        created_at,
        updated_at
      `)
            .eq("user_id", userId)
            .neq("status", "destroyed")
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Failed to fetch agents:", error);
            return NextResponse.json({ error: "Failed to fetch agents" }, { status: 500 });
        }

        // Add gateway URLs
        const domain = process.env.CLAWBRICK_DOMAIN || "clawbrick.com";
        const agentsWithUrls = agents.map((agent) => ({
            ...agent,
            gatewayUrl: agent.main_ip
                ? agent.subdomain
                    ? `https://${agent.subdomain}.${domain}`
                    : `https://${agent.main_ip}`
                : null,
        }));

        return NextResponse.json({ agents: agentsWithUrls });

    } catch (error) {
        console.error("List agents error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
