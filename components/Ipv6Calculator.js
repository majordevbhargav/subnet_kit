"use client";
import { useState, useMemo } from "react";
import { calculateIpv6Subnet } from "../lib/ipv6";
import { panelStyle, labelStyle, inputStyle } from "./theme";
import { useTheme } from "./ThemeContext";
import ResultRow from "./ResultRow";

export default function Ipv6Calculator() {
  const { theme } = useTheme();
  const [address, setAddress] = useState("2001:db8::");
  const [prefix, setPrefix] = useState("64");

  const result = useMemo(() => {
    return calculateIpv6Subnet(address, Number(prefix));
  }, [address, prefix]);

  return (
    <div style={{ display: "grid", gap: 20 }}>
      <div style={panelStyle(theme)}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 14 }}>
          <div>
            <label style={labelStyle(theme)}>IPv6 address</label>
            <input style={inputStyle(theme)} value={address} onChange={(event) => setAddress(event.target.value)} />
          </div>
          <div>
            <label style={labelStyle(theme)}>Prefix length</label>
            <input
              style={inputStyle(theme)}
              type="number"
              min={0}
              max={128}
              value={prefix}
              onChange={(event) => setPrefix(event.target.value)}
            />
          </div>
        </div>
      </div>

      {result.error ? (
        <div style={{ ...panelStyle(theme), color: theme.danger, fontFamily: theme.sans }}>{result.error}</div>
      ) : (
        <div style={panelStyle(theme)}>
          <ResultRow label="Full address" value={result.fullAddress} />
          <ResultRow label="Network address" value={`${result.networkAddress}/${result.prefix}`} />
          <ResultRow label="Last address in block" value={result.lastAddress} />
          <ResultRow label="Interface id bits" value={result.interfaceIdBits} />
          <ResultRow label="Addresses in block" value={result.totalAddressesExact} />
        </div>
      )}
    </div>
  );
}
