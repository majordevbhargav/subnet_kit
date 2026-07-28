// Basic IPv6 helpers. Uses BigInt since 128 bit values exceed safe integers.

export function expandIpv6(address) {
  let addr = address.trim();
  if (addr === "") return null;

  let [head, tail] = addr.split("::");
  let headParts = head ? head.split(":").filter((p) => p !== "") : [];
  let tailParts = tail !== undefined && tail !== "" ? tail.split(":").filter((p) => p !== "") : [];

  if (addr.includes("::")) {
    const missing = 8 - headParts.length - tailParts.length;
    if (missing < 0) return null;
    const middle = new Array(missing).fill("0");
    headParts = [...headParts, ...middle, ...tailParts];
  } else {
    headParts = addr.split(":");
  }

  if (headParts.length !== 8) return null;
  const groups = headParts.map((g) => {
    if (!/^[0-9a-fA-F]{1,4}$/.test(g)) return null;
    return g.padStart(4, "0").toLowerCase();
  });
  if (groups.some((g) => g === null)) return null;
  return groups;
}

export function groupsToBigInt(groups) {
  let value = 0n;
  for (const g of groups) {
    value = (value << 16n) + BigInt(parseInt(g, 16));
  }
  return value;
}

export function bigIntToGroups(value) {
  const groups = [];
  let v = value;
  for (let i = 0; i < 8; i++) {
    groups.unshift((v & 0xffffn).toString(16).padStart(4, "0"));
    v = v >> 16n;
  }
  return groups;
}

export function compressGroups(groups) {
  let bestStart = -1;
  let bestLen = 0;
  let curStart = -1;
  let curLen = 0;

  for (let i = 0; i < 8; i++) {
    if (groups[i] === "0000") {
      if (curStart === -1) curStart = i;
      curLen++;
    } else {
      if (curLen > bestLen) {
        bestStart = curStart;
        bestLen = curLen;
      }
      curStart = -1;
      curLen = 0;
    }
  }
  if (curLen > bestLen) {
    bestStart = curStart;
    bestLen = curLen;
  }

  if (bestLen < 2) {
    return groups.map((g) => g.replace(/^0+(?=.)/, "")).join(":");
  }

  const before = groups.slice(0, bestStart).map((g) => g.replace(/^0+(?=.)/, ""));
  const after = groups.slice(bestStart + bestLen).map((g) => g.replace(/^0+(?=.)/, ""));
  return `${before.join(":")}::${after.join(":")}`;
}

export function calculateIpv6Subnet(addressString, prefix) {
  const groups = expandIpv6(addressString);
  if (!groups) return { error: "Enter a valid IPv6 address, such as 2001:db8::1" };
  if (!Number.isInteger(prefix) || prefix < 0 || prefix > 128) {
    return { error: "Enter a prefix length between 0 and 128." };
  }

  const addressValue = groupsToBigInt(groups);
  const hostBits = BigInt(128 - prefix);
  const mask = hostBits === 0n ? (2n ** 128n - 1n) : ((2n ** 128n - 1n) << hostBits) & (2n ** 128n - 1n);
  const networkValue = addressValue & mask;
  const broadcastValue = networkValue | ((2n ** hostBits) - 1n);

  const networkGroups = bigIntToGroups(networkValue);
  const lastGroups = bigIntToGroups(broadcastValue);

  const totalAddressesExact = (2n ** hostBits).toString();

  return {
    input: addressString.trim(),
    prefix,
    fullAddress: groups.join(":"),
    networkAddress: compressGroups(networkGroups),
    networkFull: networkGroups.join(":"),
    lastAddress: compressGroups(lastGroups),
    lastFull: lastGroups.join(":"),
    totalAddressesExact,
    interfaceIdBits: 128 - prefix,
  };
}
