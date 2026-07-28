import { calculateSubnet, ipToLong, longToIp, parseIp, cidrCountFromHosts } from "./subnet";

// requirements: array of { label, hosts }
export function planVlsm(baseIp, basePrefix, requirements) {
  const baseOctets = parseIp(baseIp);
  if (!baseOctets) return { error: "Enter a valid base network address." };
  if (!Number.isInteger(basePrefix) || basePrefix < 0 || basePrefix > 32) {
    return { error: "Enter a base prefix between 0 and 32." };
  }

  const cleaned = requirements
    .filter((r) => r.hosts && Number(r.hosts) > 0)
    .map((r) => ({ label: r.label, hosts: Number(r.hosts) }))
    .sort((a, b) => b.hosts - a.hosts);

  if (cleaned.length === 0) return { error: "Add at least one subnet with a host count." };

  const baseLong = ipToLong(baseOctets) & ((0xffffffff << (32 - basePrefix)) >>> 0);
  const baseSize = Math.pow(2, 32 - basePrefix);

  let cursor = baseLong >>> 0;
  const results = [];
  let overflow = false;

  for (const req of cleaned) {
    const prefix = cidrCountFromHosts(req.hosts);
    const blockSize = Math.pow(2, 32 - prefix);

    if (cursor + blockSize > baseLong + baseSize) {
      overflow = true;
      results.push({ label: req.label, hosts: req.hosts, error: "Does not fit in remaining space." });
      continue;
    }

    const detail = calculateSubnet(longToIp(cursor), prefix);
    results.push({ label: req.label, hosts: req.hosts, prefix, ...detail });
    cursor = cursor + blockSize;
  }

  return {
    baseNetwork: longToIp(baseLong),
    basePrefix,
    baseSize,
    usedSize: cursor - baseLong,
    remainingSize: baseLong + baseSize - cursor,
    overflow,
    results,
  };
}
