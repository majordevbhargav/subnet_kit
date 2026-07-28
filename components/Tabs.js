"use client";
import { useTheme } from "./ThemeContext";

export default function Tabs({ active, onChange, items }) {
  const { theme } = useTheme();

  return (
    <div style={{ display: "flex", gap: 6, marginBottom: 24, borderBottom: `1px solid ${theme.border}` }}>
      {items.map((item) => {
        const isActive = item.key === active;
        return (
          <button
            key={item.key}
            onClick={() => onChange(item.key)}
            style={{
              fontFamily: theme.sans,
              fontSize: 14,
              fontWeight: 600,
              padding: "10px 16px",
              background: "transparent",
              border: "none",
              borderBottom: isActive ? `2px solid ${theme.accent}` : "2px solid transparent",
              color: isActive ? theme.text : theme.muted,
              cursor: "pointer",
            }}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
