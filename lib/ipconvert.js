import { parseIp, ipToLong, octetsToBinary } from "./subnet";

export function convertIp(ipString) {
  const octets = parseIp(ipString);
  if (!octets) {
    return { error: "Enter a valid IPv4 address, four numbers 0 to 255 separated by dots." };
  }

  const long = ipToLong(octets);
  const binaryOctets = octetsToBinary(octets);
  const hexOctets = octets.map((value) => value.toString(16).padStart(2, "0"));

  return {
    dotted: octets.join("."),
    binaryDotted: binaryOctets.join("."),
    binaryOctets,
    binaryFull: binaryOctets.join(""),
    hexDotted: hexOctets.join("."),
    hexFull: "0x" + hexOctets.join("").toUpperCase(),
    decimalInteger: long,
  };
}
