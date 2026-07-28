// Core IPv4 subnet and CIDR math. No external dependencies.

export function isValidOctet(n) {
  return Number.isInteger(n) && n >= 0 && n <= 255;
}

export function parseIp(ipString) {
  const parts = ipString.trim().split(".");
  if (parts.length !== 4) return null;
  const octets = parts.map((p) => Number(p));
  if (!octets.every(isValidOctet)) return null;
  return octets;
}

export function ipToLong(octets) {
  return (
    (octets[0] << 24) +
    (octets[1] << 16) +
    (octets[2] << 8) +
    octets[3]
  ) >>> 0;
}

export function longToIp(long) {
  return [
    (long >>> 24) & 255,
    (long >>> 16) & 255,
    (long >>> 8) & 255,
    long & 255,
  ].join(".");
}

export function prefixToMaskLong(prefix) {
  if (prefix === 0) return 0;
  return (0xffffffff << (32 - prefix)) >>> 0;
}

export function maskLongToPrefix(maskLong) {
  let count = 0;
  for (let i = 31; i >= 0; i--) {
    if ((maskLong >>> i) & 1) count++;
    else break;
  }
  return count;
}

export function octetsToBinary(octets) {
  return octets.map((o) => o.toString(2).padStart(8, "0"));
}

export function ipClassOf(firstOctet) {
  if (firstOctet >= 1 && firstOctet <= 126) return "A";
  if (firstOctet >= 128 && firstOctet <= 191) return "B";
  if (firstOctet >= 192 && firstOctet <= 223) return "C";
  if (firstOctet >= 224 && firstOctet <= 239) return "D (multicast)";
  return "E (reserved)";
}

export function isPrivateAddress(octets) {
  const [a, b] = octets;
  if (a === 10) return true;
  if (a === 172 && b >= 16 && b <= 31) return true;
  if (a === 192 && b === 168) return true;
  if (a === 169 && b === 254) return true;
  return false;
}

// Accepts a string like "192.168.1.10/24" or an ip plus separate prefix.
export function calculateSubnet(input, maybePrefix) {
  let ipPart = input;
  let prefix = maybePrefix;

  if (typeof input === "string" && input.includes("/")) {
    const [left, right] = input.split("/");
    ipPart = left;
    prefix = Number(right);
  }

  const octets = parseIp(ipPart);
  if (!octets) return { error: "Enter a valid IPv4 address, four numbers 0 to 255 separated by dots." };
  if (!Number.isInteger(prefix) || prefix < 0 || prefix > 32) {
    return { error: "Enter a prefix length between 0 and 32." };
  }

  const ipLong = ipToLong(octets);
  const maskLong = prefixToMaskLong(prefix);
  const networkLong = (ipLong & maskLong) >>> 0;
  const broadcastLong = (networkLong | (~maskLong >>> 0)) >>> 0;
  const wildcardLong = (~maskLong) >>> 0;

  const totalHosts = Math.pow(2, 32 - prefix);
  const usableHosts = prefix >= 31 ? (prefix === 31 ? 2 : 1) : totalHosts - 2;

  let firstHostLong = networkLong;
  let lastHostLong = broadcastLong;
  if (prefix < 31) {
    firstHostLong = networkLong + 1;
    lastHostLong = broadcastLong - 1;
  }

  return {
    input: ipPart.trim(),
    prefix,
    ipOctets: octets,
    maskOctets: parseIp(longToIp(maskLong)),
    wildcardOctets: parseIp(longToIp(wildcardLong)),
    networkOctets: parseIp(longToIp(networkLong)),
    broadcastOctets: parseIp(longToIp(broadcastLong)),
    firstHostOctets: parseIp(longToIp(firstHostLong)),
    lastHostOctets: parseIp(longToIp(lastHostLong)),
    ipLong,
    networkLong,
    broadcastLong,
    totalHosts,
    usableHosts,
    ipClass: ipClassOf(octets[0]),
    isPrivate: isPrivateAddress(octets),
    binary: {
      ip: octetsToBinary(octets),
      mask: octetsToBinary(parseIp(longToIp(maskLong))),
      network: octetsToBinary(parseIp(longToIp(networkLong))),
    },
  };
}

export function cidrCountFromHosts(neededHosts) {
  let hostBits = 0;
  while (Math.pow(2, hostBits) - 2 < neededHosts) hostBits++;
  return 32 - hostBits;
}
