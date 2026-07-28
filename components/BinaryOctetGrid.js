"use client";
import { useTheme } from "./ThemeContext";

export default function BinaryOctetGrid({ binaryOctets, prefix, caption, plain }) {
  const { theme } = useTheme();
  const bits = binaryOctets.join("").split("");
  const effectivePrefix = plain ? -1 : prefix;

  return (
    <div style={{ marginTop: 14 }}>
      {caption ? (
        <div style={{ fontFamily: theme.sans, fontSize: 12, color: theme.muted, marginBottom: 8 }}>
          {caption}
        </div>
      ) : null}
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {[0, 1, 2, 3].map((octetIndex) => (
          <div key={octetIndex} style={{ display: "flex", gap: 3 }}>
            {bits.slice(octetIndex * 8, octetIndex * 8 + 8).map((bit, bitIndex) => {
              const globalIndex = octetIndex * 8 + bitIndex;
              const isNetworkBit = globalIndex < effectivePrefix;
              return (
                <div
                  key={bitIndex}
                  title={`Bit ${globalIndex + 1}, ${isNetworkBit ? "network" : "host"}`}
                  style={{
                    width: 20,
                    height: 26,
                    borderRadius: 4,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: theme.mono,
                    fontSize: 12,
                    color: isNetworkBit ? theme.accentText : theme.text,
                    background: isNetworkBit ? theme.accent : theme.panelRaised,
                    border: `1px solid ${isNetworkBit ? theme.accent : theme.border}`,
                  }}
                >
                  {bit}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      {!plain ? (
        <div style={{ display: "flex", gap: 16, marginTop: 8, fontFamily: theme.sans, fontSize: 11, color: theme.muted }}>
          <span><i style={{ display: "inline-block", width: 10, height: 10, background: theme.accent, borderRadius: 2, marginRight: 6 }} />Network portion</span>
          <span><i style={{ display: "inline-block", width: 10, height: 10, background: theme.panelRaised, border: `1px solid ${theme.border}`, borderRadius: 2, marginRight: 6 }} />Host portion</span>
        </div>
      ) : null}
    </div>
  );
}
