/**
 * Terraform provisioner for OpenClaw VM deployment
 * Executes Terraform commands to provision Vultr instances
 */

import { exec } from "child_process";
import { promisify } from "util";
import path from "path";
import fs from "fs/promises";

const execAsync = promisify(exec);

export interface TerraformVars {
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
    vultr_plan?: string;
}

export interface TerraformOutputs {
    instance_id: string;
    main_ip: string;
    status: string;
}

export class TerraformProvisioner {
    private terraformDir: string;
    private workDir: string;

    constructor() {
        this.terraformDir = path.resolve(process.cwd(), "terraform/openclaw");
        this.workDir = path.resolve(process.cwd(), "terraform/workspaces");
    }

    /**
     * Initialize Terraform workspace for an agent
     */
    async initWorkspace(agentId: string): Promise<string> {
        const workspaceDir = path.join(this.workDir, agentId);

        // Create workspace directory
        await fs.mkdir(workspaceDir, { recursive: true });

        // Copy Terraform files to workspace
        const files = ["main.tf", "variables.tf", "bootstrap.sh"];
        for (const file of files) {
            const src = path.join(this.terraformDir, file);
            const dest = path.join(workspaceDir, file);
            try {
                await fs.copyFile(src, dest);
            } catch (error) {
                console.error(`Failed to copy ${file}:`, error);
                throw new Error(`Failed to copy Terraform file: ${file}`);
            }
        }

        return workspaceDir;
    }

    /**
     * Create terraform.tfvars file
     */
    async createVarsFile(workspaceDir: string, vars: TerraformVars): Promise<void> {
        const varsContent = `# Auto-generated terraform.tfvars for OpenClaw
# Agent ID: ${vars.agent_id}

vultr_api_key       = "${vars.vultr_api_key}"
user_id             = "${vars.user_id}"
agent_id            = "${vars.agent_id}"
llm_provider        = "${vars.llm_provider}"
llm_model           = "${vars.llm_model}"
telegram_bot_token  = "${vars.telegram_bot_token}"
api_key             = "${vars.api_key}"
gateway_token       = "${vars.gateway_token}"
subdomain           = "${vars.subdomain}"
domain              = "${vars.domain}"
admin_email         = "${vars.admin_email}"
control_server_ip   = "${vars.control_server_ip}"
vultr_region        = "${vars.vultr_region || "bom"}"
vultr_plan          = "${vars.vultr_plan || "vc2-1c-2gb"}"
`;

        await fs.writeFile(path.join(workspaceDir, "terraform.tfvars"), varsContent, { mode: 0o600 });
    }

    /**
     * Initialize Terraform
     */
    async init(workspaceDir: string): Promise<{ success: boolean; output: string }> {
        try {
            const { stdout, stderr } = await execAsync("terraform init", {
                cwd: workspaceDir,
                timeout: 120000,
                env: {
                    ...process.env,
                    TF_IN_AUTOMATION: "true",
                    TF_INPUT: "0",
                },
            });

            return {
                success: true,
                output: stdout + (stderr ? `\nStderr: ${stderr}` : ""),
            };
        } catch (error: unknown) {
            const err = error as Error & { stderr?: string; stdout?: string };
            return {
                success: false,
                output: err.stdout + "\n" + err.stderr || err.message,
            };
        }
    }

    /**
     * Apply Terraform configuration
     */
    async apply(workspaceDir: string): Promise<{ success: boolean; output: string }> {
        try {
            const { stdout, stderr } = await execAsync("terraform apply -auto-approve", {
                cwd: workspaceDir,
                timeout: 300000, // 5 minutes timeout for VM provisioning
                env: {
                    ...process.env,
                    TF_IN_AUTOMATION: "true",
                    TF_INPUT: "0",
                },
            });

            return {
                success: true,
                output: stdout + (stderr ? `\nStderr: ${stderr}` : ""),
            };
        } catch (error: unknown) {
            const err = error as Error & { stderr?: string; stdout?: string };
            return {
                success: false,
                output: err.stdout + "\n" + err.stderr || err.message,
            };
        }
    }

    /**
     * Get Terraform outputs
     */
    async getOutputs(workspaceDir: string): Promise<TerraformOutputs> {
        try {
            const { stdout } = await execAsync("terraform output -json", {
                cwd: workspaceDir,
                timeout: 30000,
            });

            const outputs = JSON.parse(stdout);
            return {
                instance_id: outputs.instance_id?.value || "",
                main_ip: outputs.main_ip?.value || "",
                status: outputs.status?.value || "",
            };
        } catch (error) {
            console.error("Failed to get Terraform outputs:", error);
            return {
                instance_id: "",
                main_ip: "",
                status: "error",
            };
        }
    }

    /**
     * Destroy Terraform infrastructure
     */
    async destroy(workspaceDir: string): Promise<{ success: boolean; output: string }> {
        try {
            const { stdout, stderr } = await execAsync("terraform destroy -auto-approve", {
                cwd: workspaceDir,
                timeout: 300000,
                env: {
                    ...process.env,
                    TF_IN_AUTOMATION: "true",
                    TF_INPUT: "0",
                },
            });

            return {
                success: true,
                output: stdout + (stderr ? `\nStderr: ${stderr}` : ""),
            };
        } catch (error: unknown) {
            const err = error as Error & { stderr?: string; stdout?: string };
            return {
                success: false,
                output: err.stdout + "\n" + err.stderr || err.message,
            };
        }
    }

    /**
     * Clean up workspace
     */
    async cleanupWorkspace(agentId: string): Promise<void> {
        const workspaceDir = path.join(this.workDir, agentId);
        try {
            await fs.rm(workspaceDir, { recursive: true, force: true });
        } catch (error) {
            console.warn(`Failed to cleanup workspace for ${agentId}:`, error);
        }
    }

    /**
     * Full provisioning workflow
     */
    async provisionAgent(vars: TerraformVars): Promise<{
        success: boolean;
        outputs?: TerraformOutputs;
        logs: string[];
    }> {
        const logs: string[] = [];
        const workspaceDir = await this.initWorkspace(vars.agent_id);

        try {
            // Create vars file
            logs.push(`[${new Date().toISOString()}] Creating Terraform configuration...`);
            await this.createVarsFile(workspaceDir, vars);

            // Initialize Terraform
            logs.push(`[${new Date().toISOString()}] Initializing Terraform...`);
            const initResult = await this.init(workspaceDir);
            logs.push(initResult.output);

            if (!initResult.success) {
                return { success: false, logs };
            }

            // Apply Terraform
            logs.push(`[${new Date().toISOString()}] Provisioning Vultr instance...`);
            const applyResult = await this.apply(workspaceDir);
            logs.push(applyResult.output);

            if (!applyResult.success) {
                return { success: false, logs };
            }

            // Get outputs
            logs.push(`[${new Date().toISOString()}] Retrieving instance details...`);
            const outputs = await this.getOutputs(workspaceDir);
            logs.push(`Instance ID: ${outputs.instance_id}`);
            logs.push(`IP Address: ${outputs.main_ip}`);
            logs.push(`Status: ${outputs.status}`);

            return {
                success: true,
                outputs,
                logs,
            };
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            logs.push(`[${new Date().toISOString()}] Error: ${errorMessage}`);
            return { success: false, logs };
        }
    }
}

// Singleton instance
export const terraformProvisioner = new TerraformProvisioner();
