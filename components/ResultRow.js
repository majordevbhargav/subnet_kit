"use client";
import { useTheme } from "./ThemeContext";

export default function ResultRow({ label, value }) {
  const { theme } = useTheme();

  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${theme.border}` }}>
      <span style={{ fontFamily: theme.sans, fontSize: 13, color: theme.muted }}>{label}</span>
      <span style={{ fontFamily: theme.mono, fontSize: 14, color: theme.text }}>{value}</span>
    </div>
  );
}
