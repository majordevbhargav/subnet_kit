"use client";
import { useState, useMemo } from "react";
import { reverseDnsName } from "../lib/reversedns";
import { panelStyle, labelStyle, inputStyle } from "./theme";
import { useTheme } from "./ThemeContext";
import ResultRow from "./ResultRow";

export default function ReverseDnsTool() {
  const { theme } = useTheme();
  const [address, setAddress] = useState("192.168.10.5");

  const result = useMemo(() => reverseDnsName(address), [address]);

  return (
    <div style={{ display: "grid", gap: 20 }}>
      <div style={panelStyle(theme)}>
        <label style={labelStyle(theme)}>IPv4 address</label>
        <input style={inputStyle(theme)} value={address} onChange={(event) => setAddress(event.target.value)} />
        <div style={{ fontFamily: theme.sans, fontSize: 11, color: theme.muted, marginTop: 8 }}>
          Generates the PTR record name used for reverse DNS lookups on this address.
        </div>
      </div>

      {result.error ? (
        <div style={{ ...panelStyle(theme), color: theme.danger, fontFamily: theme.sans }}>{result.error}</div>
      ) : (
        <div style={panelStyle(theme)}>
          <ResultRow label="PTR record name" value={result.ptrName} />
          <ResultRow label="Reverse zone for a /24" value={result.classfulZone.forOctet24} />
          <ResultRow label="Reverse zone for a /16" value={result.classfulZone.forOctet16} />
          <ResultRow label="Reverse zone for a /8" value={result.classfulZone.forOctet8} />
        </div>
      )}
    </div>
  );
}
