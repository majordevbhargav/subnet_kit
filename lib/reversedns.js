import { parseIp } from "./subnet";

export function reverseDnsName(ipString) {
  const octets = parseIp(ipString);
  if (!octets) {
    return { error: "Enter a valid IPv4 address, four numbers 0 to 255 separated by dots." };
  }

  const ptrName = [...octets].reverse().join(".") + ".in-addr.arpa";

  let classfulZone = null;
  const [a, b, c] = octets;
  classfulZone = {
    forOctet24: `${c}.${b}.${a}.in-addr.arpa`,
    forOctet16: `${b}.${a}.in-addr.arpa`,
    forOctet8: `${a}.in-addr.arpa`,
  };

  return {
    address: octets.join("."),
    ptrName,
    classfulZone,
  };
}
