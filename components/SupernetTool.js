"use client";
import { useState, useMemo } from "react";
import { summarizeNetworks } from "../lib/supernet";
import { panelStyle, labelStyle, inputStyle, buttonStyle, ghostButtonStyle } from "./theme";
import { useTheme } from "./ThemeContext";
import ResultRow from "./ResultRow";

function makeRow(ip, prefix) {
  return { id: `${ip}${Math.random()}`, ip, prefix };
}

function SupernetVisual({ summary }) {
  const { theme } = useTheme();
  const width = 640;
  const height = 70;
  const trackY = 24;
  const trackHeight = 22;

  const totalSpan = summary.supernetBroadcastLong - summary.supernetLong + 1;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" style={{ maxWidth: width, display: "block" }}>
      <rect x={0} y={trackY} width={width} height={trackHeight} rx={4} fill={theme.panelRaised} stroke={theme.border} />
      {summary.members.map((member, index) => {
        const memberSpan = member.broadcastLong - member.networkLong + 1;
        const startX = ((member.networkLong - summary.supernetLong) / totalSpan) * width;
        const memberWidth = Math.max(2, (memberSpan / totalSpan) * width);
        return (
          <rect
            key={index}
            x={startX}
            y={trackY}
            width={memberWidth}
            height={trackHeight}
            fill={theme.accent}
            opacity={0.55}
          />
        );
      })}
      <text x={0} y={trackY - 8} fontFamily={theme.mono} fontSize="11" fill={theme.muted}>
        {summary.supernetIp}
      </text>
      <text x={width} y={trackY - 8} fontFamily={theme.mono} fontSize="11" fill={theme.muted} textAnchor="end">
        {summary.broadcastIp}
      </text>
    </svg>
  );
}

export default function SupernetTool() {
  const { theme } = useTheme();
  const [rows, setRows] = useState([
    makeRow("192.168.0.0", 24),
    makeRow("192.168.1.0", 24),
    makeRow("192.168.2.0", 24),
    makeRow("192.168.3.0", 24),
  ]);

  const summary = useMemo(() => summarizeNetworks(rows), [rows]);

  function updateRow(id, field, value) {
    setRows((current) => current.map((row) => (row.id === id ? { ...row, [field]: value } : row)));
  }

  function addRow() {
    setRows((current) => [...current, makeRow("", 24)]);
  }

  function removeRow(id) {
    setRows((current) => current.filter((row) => row.id !== id));
  }

  return (
    <div style={{ display: "grid", gap: 20 }}>
      <div style={panelStyle(theme)}>
        <div style={{ fontFamily: theme.sans, fontSize: 11, color: theme.muted, marginBottom: 14 }}>
          Add two or more networks and get the smallest single route that covers all of them.
        </div>
        {rows.map((row) => (
          <div key={row.id} style={{ display: "grid", gridTemplateColumns: "2fr 1fr auto", gap: 10, marginBottom: 10 }}>
            <input
              style={inputStyle(theme)}
              value={row.ip}
              onChange={(event) => updateRow(row.id, "ip", event.target.value)}
              placeholder="192.168.0.0"
            />
            <input
              style={inputStyle(theme)}
              type="number"
              min={0}
              max={32}
              value={row.prefix}
              onChange={(event) => updateRow(row.id, "prefix", event.target.value)}
            />
            <button onClick={() => removeRow(row.id)} style={ghostButtonStyle(theme)}>
              Remove
            </button>
          </div>
        ))}
        <button style={buttonStyle(theme)} onClick={addRow}>
          Add network
        </button>
      </div>

      {summary.error ? (
        <div style={{ ...panelStyle(theme), color: theme.danger, fontFamily: theme.sans }}>{summary.error}</div>
      ) : (
        <div style={panelStyle(theme)}>
          <SupernetVisual summary={summary} />
          <div style={{ marginTop: 14 }}>
            <ResultRow label="Summarized route" value={`${summary.supernetIp}/${summary.prefix}`} />
            <ResultRow label="Subnet mask" value={summary.maskIp} />
            <ResultRow label="Covers up to" value={summary.broadcastIp} />
            <ResultRow label="Total addresses covered" value={summary.totalAddresses.toLocaleString()} />
          </div>
        </div>
      )}
    </div>
  );
}
