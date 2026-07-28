"use client";
import { useState, useMemo } from "react";
import { planVlsm } from "../lib/vlsm";
import { panelStyle, labelStyle, inputStyle, buttonStyle, ghostButtonStyle } from "./theme";
import { useTheme } from "./ThemeContext";
import RangeVisual from "./RangeVisual";

function makeRow(label, hosts) {
  return { id: `${label}${Math.random()}`, label, hosts };
}

export default function VlsmPlanner() {
  const { theme } = useTheme();
  const [baseIp, setBaseIp] = useState("192.168.10.0");
  const [basePrefix, setBasePrefix] = useState("24");
  const [rows, setRows] = useState([
    makeRow("Sales", 60),
    makeRow("Engineering", 25),
    makeRow("Guest wifi", 10),
    makeRow("Point to point link", 2),
  ]);

  const plan = useMemo(() => {
    return planVlsm(baseIp, Number(basePrefix), rows);
  }, [baseIp, basePrefix, rows]);

  function updateRow(id, field, value) {
    setRows((current) => current.map((row) => (row.id === id ? { ...row, [field]: value } : row)));
  }

  function addRow() {
    setRows((current) => [...current, makeRow("New segment", 10)]);
  }

  function removeRow(id) {
    setRows((current) => current.filter((row) => row.id !== id));
  }

  return (
    <div style={{ display: "grid", gap: 20 }}>
      <div style={panelStyle(theme)}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 14, marginBottom: 18 }}>
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
        </div>

        {rows.map((row) => (
          <div key={row.id} style={{ display: "grid", gridTemplateColumns: "2fr 1fr auto", gap: 10, marginBottom: 10 }}>
            <input
              style={inputStyle(theme)}
              value={row.label}
              onChange={(event) => updateRow(row.id, "label", event.target.value)}
              placeholder="Segment name"
            />
            <input
              style={inputStyle(theme)}
              type="number"
              min={1}
              value={row.hosts}
              onChange={(event) => updateRow(row.id, "hosts", event.target.value)}
              placeholder="Hosts needed"
            />
            <button onClick={() => removeRow(row.id)} style={ghostButtonStyle(theme)}>
              Remove
            </button>
          </div>
        ))}

        <button style={buttonStyle(theme)} onClick={addRow}>
          Add segment
        </button>
      </div>

      {plan.error ? (
        <div style={{ ...panelStyle(theme), color: theme.danger, fontFamily: theme.sans }}>{plan.error}</div>
      ) : (
        <div style={panelStyle(theme)}>
          <div style={{ fontFamily: theme.sans, fontSize: 13, color: theme.muted, marginBottom: 14 }}>
            {plan.baseNetwork}/{plan.basePrefix} — {plan.usedSize.toLocaleString()} addresses allocated,{" "}
            {plan.remainingSize.toLocaleString()} remaining
          </div>
          <div style={{ display: "grid", gap: 22 }}>
            {plan.results.map((entry, index) => (
              <div key={index} style={{ borderTop: index > 0 ? `1px solid ${theme.border}` : "none", paddingTop: index > 0 ? 18 : 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontFamily: theme.sans, fontSize: 13, marginBottom: 8 }}>
                  <span style={{ color: theme.text, fontWeight: 600 }}>{entry.label}</span>
                  {entry.error ? (
                    <span style={{ color: theme.danger }}>{entry.error}</span>
                  ) : (
                    <span style={{ color: theme.muted, fontFamily: theme.mono }}>
                      {entry.networkOctets.join(".")}/{entry.prefix} — needs {entry.hosts}, provides {entry.usableHosts} usable
                    </span>
                  )}
                </div>
                {!entry.error ? (
                  <RangeVisual
                    networkIp={entry.networkOctets.join(".")}
                    firstHostIp={entry.firstHostOctets.join(".")}
                    lastHostIp={entry.lastHostOctets.join(".")}
                    broadcastIp={entry.broadcastOctets.join(".")}
                    totalHosts={entry.totalHosts}
                    usableHosts={entry.usableHosts}
                  />
                ) : null}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
