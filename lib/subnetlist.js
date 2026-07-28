import { calculateSubnet, longToIp } from "./subnet";

const MAX_RESULTS = 512;

export function listSubnets(baseIp, basePrefix, newPrefix) {
  const base = calculateSubnet(baseIp, Number(basePrefix));
  if (base.error) return { error: base.error };

  const newP = Number(newPrefix);
  if (!Number.isInteger(newP) || newP < 0 || newP > 32) {
    return { error: "Enter a new prefix length between 0 and 32." };
  }
  if (newP < base.prefix) {
    return { error: "The new prefix must be equal to or longer than the base prefix." };
  }

  const count = Math.pow(2, newP - base.prefix);
  if (count > MAX_RESULTS) {
    return { error: `That would produce ${count.toLocaleString()} subnets. Choose a new prefix that yields ${MAX_RESULTS} or fewer to keep the list readable.` };
  }

  const blockSize = Math.pow(2, 32 - newP);
  const results = [];
  let cursor = base.networkLong;
  for (let i = 0; i < count; i++) {
    results.push(calculateSubnet(longToIp(cursor), newP));
    cursor += blockSize;
  }

  return {
    baseNetwork: base.networkOctets.join("."),
    basePrefix: base.prefix,
    newPrefix: newP,
    count,
    results,
  };
}
