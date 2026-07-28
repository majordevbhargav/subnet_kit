"use client";
import { useState, useMemo } from "react";
import { calculateSubnet } from "../lib/subnet";
import { panelStyle, labelStyle, inputStyle } from "./theme";
import { useTheme } from "./ThemeContext";
import BinaryOctetGrid from "./BinaryOctetGrid";
import RangeVisual from "./RangeVisual";
import ResultRow from "./ResultRow";

export default function CidrCalculator() {
  const { theme } = useTheme();
  const [address, setAddress] = useState("192.168.10.0");
  const [prefix, setPrefix] = useState("26");

  const result = useMemo(() => {
    return calculateSubnet(address, Number(prefix));
  }, [address, prefix]);

  return (
    <div style={{ display: "grid", gap: 20 }}>
      <div style={panelStyle(theme)}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 14, alignItems: "end" }}>
          <div>
            <label style={labelStyle(theme)}>IPv4 address</label>
            <input
              style={inputStyle(theme)}
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              placeholder="192.168.10.0"
            />
          </div>
          <div>
            <label style={labelStyle(theme)}>Prefix length</label>
            <input
              style={inputStyle(theme)}
              type="number"
              min={0}
              max={32}
              value={prefix}
              onChange={(event) => setPrefix(event.target.value)}
            />
          </div>
        </div>
        <div style={{ fontFamily: theme.sans, fontSize: 11, color: theme.muted, marginTop: 8 }}>
          Results update as you type. You can also paste an address with a slash, such as 10.0.0.0/24, into the address field.
        </div>
      </div>

      {result.error ? (
        <div style={{ ...panelStyle(theme), color: theme.danger, fontFamily: theme.sans }}>{result.error}</div>
      ) : (
        <>
          <div style={panelStyle(theme)}>
            <div style={{ fontFamily: theme.sans, fontSize: 13, color: theme.muted, marginBottom: 10 }}>
              Address range
            </div>
            <RangeVisual
              networkIp={result.networkOctets.join(".")}
              firstHostIp={result.firstHostOctets.join(".")}
              lastHostIp={result.lastHostOctets.join(".")}
              broadcastIp={result.broadcastOctets.join(".")}
              totalHosts={result.totalHosts}
              usableHosts={result.usableHosts}
            />
            <BinaryOctetGrid binaryOctets={result.binary.ip} prefix={result.prefix} caption="Address in binary" />
            <BinaryOctetGrid binaryOctets={result.binary.mask} prefix={result.prefix} caption="Subnet mask in binary" />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <div style={panelStyle(theme)}>
              <ResultRow label="Network address" value={result.networkOctets.join(".")} />
              <ResultRow label="Broadcast address" value={result.broadcastOctets.join(".")} />
              <ResultRow label="Subnet mask" value={result.maskOctets.join(".")} />
              <ResultRow label="Wildcard mask" value={result.wildcardOctets.join(".")} />
              <ResultRow label="CIDR notation" value={`${result.networkOctets.join(".")}/${result.prefix}`} />
            </div>
            <div style={panelStyle(theme)}>
              <ResultRow label="First usable host" value={result.firstHostOctets.join(".")} />
              <ResultRow label="Last usable host" value={result.lastHostOctets.join(".")} />
              <ResultRow label="Total addresses" value={result.totalHosts.toLocaleString()} />
              <ResultRow label="Usable hosts" value={result.usableHosts.toLocaleString()} />
              <ResultRow label="Address class" value={result.ipClass} />
              <ResultRow label="Address scope" value={result.isPrivate ? "Private" : "Public"} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
