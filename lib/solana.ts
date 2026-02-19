/**
 * Solana utilities for wallet integration
 * Uses Helius RPC for reliable balance fetching
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
    return `${formatted} SOL`;
  } catch (error) {
    console.error("Failed to fetch balance:", error);
    throw error;
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
