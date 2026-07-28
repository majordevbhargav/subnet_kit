"use client";
import { useState, useMemo } from "react";
import { convertIp } from "../lib/ipconvert";
import { panelStyle, labelStyle, inputStyle } from "./theme";
import { useTheme } from "./ThemeContext";
import BinaryOctetGrid from "./BinaryOctetGrid";
import ResultRow from "./ResultRow";

export default function IpConverterTool() {
  const { theme } = useTheme();
  const [address, setAddress] = useState("192.168.10.5");

  const result = useMemo(() => convertIp(address), [address]);

  return (
    <div style={{ display: "grid", gap: 20 }}>
      <div style={panelStyle(theme)}>
        <label style={labelStyle(theme)}>IPv4 address</label>
        <input style={inputStyle(theme)} value={address} onChange={(event) => setAddress(event.target.value)} />
      </div>

      {result.error ? (
        <div style={{ ...panelStyle(theme), color: theme.danger, fontFamily: theme.sans }}>{result.error}</div>
      ) : (
        <div style={panelStyle(theme)}>
          <BinaryOctetGrid binaryOctets={result.binaryOctets} caption="Binary" plain />
          <div style={{ marginTop: 14 }}>
            <ResultRow label="Dotted decimal" value={result.dotted} />
            <ResultRow label="Binary" value={result.binaryDotted} />
            <ResultRow label="Hexadecimal" value={result.hexFull} />
            <ResultRow label="Unsigned 32 bit integer" value={result.decimalInteger.toLocaleString()} />
          </div>
        </div>
      )}
    </div>
  );
}
