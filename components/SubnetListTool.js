"use client";
import { useState, useMemo } from "react";
import { listSubnets } from "../lib/subnetlist";
import { panelStyle, labelStyle, inputStyle } from "./theme";
import { useTheme } from "./ThemeContext";

export default function SubnetListTool() {
  const { theme } = useTheme();
  const [baseIp, setBaseIp] = useState("192.168.10.0");
  const [basePrefix, setBasePrefix] = useState("24");
  const [newPrefix, setNewPrefix] = useState("26");

  const plan = useMemo(() => listSubnets(baseIp, basePrefix, newPrefix), [baseIp, basePrefix, newPrefix]);

  return (
    <div style={{ display: "grid", gap: 20 }}>
      <div style={panelStyle(theme)}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 14 }}>
          <div>
            <label style={labelStyle(theme)}>Base network</label>
            <input style={inputStyle(theme)} value={baseIp} onChange={(event) => setBaseIp(event.target.value)} />
          </div>
          <div>
            <label style={labelStyle(theme)}>Base prefix</label>
            <input
              style={inputStyle(theme)}
              type="number"
              min={0}
              max={32}
              value={basePrefix}
              onChange={(event) => setBasePrefix(event.target.value)}
            />
          </div>
          <div>
            <label style={labelStyle(theme)}>Split into prefix</label>
            <input
              style={inputStyle(theme)}
              type="number"
              min={0}
              max={32}
              value={newPrefix}
              onChange={(event) => setNewPrefix(event.target.value)}
            />
          </div>
        </div>
      </div>

      {plan.error ? (
        <div style={{ ...panelStyle(theme), color: theme.danger, fontFamily: theme.sans }}>{plan.error}</div>
      ) : (
        <div style={panelStyle(theme)}>
          <div style={{ fontFamily: theme.sans, fontSize: 13, color: theme.muted, marginBottom: 14 }}>
            {plan.count} subnets of /{plan.newPrefix} inside {plan.baseNetwork}/{plan.basePrefix}
          </div>
          <div style={{ display: "grid", gap: 0, maxHeight: 420, overflowY: "auto" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 1fr",
                gap: 8,
                fontFamily: theme.sans,
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: theme.muted,
                padding: "6px 0",
                borderBottom: `1px solid ${theme.border}`,
                position: "sticky",
                top: 0,
                background: theme.panel,
              }}
            >
              <span>Network</span>
              <span>First host</span>
              <span>Last host</span>
              <span>Broadcast</span>
            </div>
            {plan.results.map((subnet, index) => (
              <div
                key={index}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr 1fr",
                  gap: 8,
                  fontFamily: theme.mono,
                  fontSize: 12,
                  color: theme.text,
                  padding: "7px 0",
                  borderBottom: `1px solid ${theme.border}`,
                }}
              >
                <span>{subnet.networkOctets.join(".")}/{subnet.prefix}</span>
                <span>{subnet.firstHostOctets.join(".")}</span>
                <span>{subnet.lastHostOctets.join(".")}</span>
                <span>{subnet.broadcastOctets.join(".")}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
