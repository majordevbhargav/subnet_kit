import { calculateSubnet, longToIp, prefixToMaskLong } from "./subnet";

function commonPrefixLength(startLong, endLong) {
  const diff = (startLong ^ endLong) >>> 0;
  if (diff === 0) return 32;
  let count = 0;
  for (let i = 31; i >= 0; i--) {
    if ((diff >>> i) & 1) break;
    count++;
  }
  return count;
}

// entries: array of { ip, prefix } describing each network to summarize
export function summarizeNetworks(entries) {
  const cleaned = entries.filter((entry) => entry.ip && entry.ip.trim() !== "");
  if (cleaned.length < 2) {
    return { error: "Add at least two networks to summarize." };
  }

  const parsed = [];
  for (const entry of cleaned) {
    const detail = calculateSubnet(entry.ip, Number(entry.prefix));
    if (detail.error) {
      return { error: `${entry.ip}/${entry.prefix}: ${detail.error}` };
    }
    parsed.push(detail);
  }

  const startLong = Math.min(...parsed.map((p) => p.networkLong));
  const endLong = Math.max(...parsed.map((p) => p.broadcastLong));

  const prefix = commonPrefixLength(startLong >>> 0, endLong >>> 0);
  const maskLong = prefixToMaskLong(prefix);
  const supernetLong = (startLong & maskLong) >>> 0;
  const supernetBroadcastLong = (supernetLong | (~maskLong >>> 0)) >>> 0;

  return {
    supernetIp: longToIp(supernetLong),
    prefix,
    maskIp: longToIp(maskLong),
    broadcastIp: longToIp(supernetBroadcastLong),
    totalAddresses: Math.pow(2, 32 - prefix),
    supernetLong,
    supernetBroadcastLong,
    members: parsed.map((p) => ({
      label: `${p.networkOctets.join(".")}/${p.prefix}`,
      networkLong: p.networkLong,
      broadcastLong: p.broadcastLong,
    })),
  };
}
