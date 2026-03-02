/**
 * Solana utilities for wallet integration
 * Uses Helius RPC for reliable balance fetching and SNS resolution
 */

const LAMPORTS_PER_SOL = 1_000_000_000;

/**
 * Get the SOL balance for a given wallet address
 * @param address - Solana wallet address
 * @returns Formatted balance string (e.g., "1.45 SOL")
 */
export async function getBalance(address: string): Promise<string> {
  const rpcUrl =
    process.env.NEXT_PUBLIC_HELIUS_RPC_URL ||
    process.env.NEXT_PUBLIC_SOLANA_RPC_URL ||
    "https://api.mainnet-beta.solana.com";

  try {
    const response = await fetch(rpcUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "getBalance",
        params: [address],
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();

    if (data.error) {
      console.error("RPC error:", data.error);
      throw new Error(data.error.message);
    }

    const lamports = data.result?.value ?? 0;
    const sol = lamports / LAMPORTS_PER_SOL;

    // Format to 4 decimal places max, removing trailing zeros
    const formatted = sol.toFixed(4).replace(/\.?0+$/, "");
    return `${formatted || "0"} SOL`;
  } catch (error) {
    console.error("Failed to fetch balance:", error);
    throw error;
  }
}

/**
 * Resolve a Solana wallet address to its .sol SNS domain name.
 * Uses the Helius DAS searchAssets API — no extra npm package needed.
 *
 * @param address - Solana wallet address (base58)
 * @returns The primary .sol domain (e.g. "alice.sol") or null if none found
 */
export async function getSNSDomain(address: string): Promise<string | null> {
  const rpcUrl =
    process.env.NEXT_PUBLIC_HELIUS_RPC_URL ||
    process.env.NEXT_PUBLIC_SOLANA_RPC_URL ||
    "https://api.mainnet-beta.solana.com";

  try {
    // Use Helius DAS searchAssets filtered to the SNS program
    // Each .sol NFT domain has in its grouping the SNS Name Service program
    const response = await fetch(rpcUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: "sns-lookup",
        method: "searchAssets",
        params: {
          ownerAddress: address,
          grouping: [
            "collection",
            "HYi4MBbZsZMM9UiMgtMN4FtPtMQVD91sF5vFrpZgR13", // SNS Collection on mainnet
          ],
          page: 1,
          limit: 10,
          displayOptions: { showNativeBalance: false },
        },
      }),
    });

    if (!response.ok) return null;
    const data = await response.json();

    const items: Array<{ content?: { metadata?: { name?: string } } }> =
      data?.result?.items ?? [];

    // Filter for .sol names and pick the shortest (primary)
    const solNames = items
      .map((item) => item?.content?.metadata?.name ?? "")
      .filter((name) => name.endsWith(".sol"));

    if (solNames.length === 0) return null;

    // Sort by length (shortest = most likely the primary domain)
    solNames.sort((a, b) => a.length - b.length);
    return solNames[0];
  } catch (err) {
    console.warn("SNS lookup failed:", err);
    return null;
  }
}

/**
 * Get recent transactions for a wallet address
 * @param address - Solana wallet address
 * @param limit - Number of transactions to fetch
 */
export async function getRecentTransactions(
  address: string,
  limit: number = 5,
) {
  const rpcUrl =
    process.env.NEXT_PUBLIC_HELIUS_RPC_URL ||
    process.env.NEXT_PUBLIC_SOLANA_RPC_URL ||
    "https://api.mainnet-beta.solana.com";

  try {
    const response = await fetch(rpcUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "getSignaturesForAddress",
        params: [address, { limit }],
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();

    if (data.error) {
      console.error("RPC error:", data.error);
      return [];
    }

    return data.result || [];
  } catch (error) {
    console.error("Failed to fetch transactions:", error);
    return [];
  }
}

/**
 * Format a Solana address for display
 */
export function formatAddress(address: string, chars: number = 4): string {
  if (!address || address.length < chars * 2) return address;
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}

/**
 * Get Solscan URL for an address
 */
export function getSolscanUrl(
  address: string,
  type: "account" | "tx" = "account",
): string {
  return `https://solscan.io/${type}/${address}`;
}

