export const themes = {
  blue: {
    bg: "#0B0F14",
    panel: "#121821",
    panelRaised: "#161E29",
    border: "#232E3B",
    accent: "#4CE0D2",
    accentText: "#08201D",
    secondary: "#FFB454",
    text: "#E8EDF2",
    muted: "#8A98A6",
    danger: "#FF6B6B",
    mono: "'IBM Plex Mono', 'Courier New', monospace",
    sans: "'Inter', 'Segoe UI', sans-serif",
  },
  white: {
    bg: "#FFFFFF",
    panel: "#FAFAFA",
    panelRaised: "#FFFFFF",
    border: "#DFDFDF",
    accent: "#2B2B2B",
    accentText: "#FFFFFF",
    secondary: "#9A9A9A",
    text: "#1A1A1A",
    muted: "#767676",
    danger: "#B3261E",
    mono: "'IBM Plex Mono', 'Courier New', monospace",
    sans: "'Inter', 'Segoe UI', sans-serif",
  },
};

export function panelStyle(theme) {
  return {
    background: theme.panel,
    border: `1px solid ${theme.border}`,
    borderRadius: 10,
    padding: 20,
  };
}

export function labelStyle(theme) {
  return {
    fontFamily: theme.sans,
    fontSize: 12,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: theme.muted,
    marginBottom: 6,
    display: "block",
  };
}

export function inputStyle(theme) {
  return {
    fontFamily: theme.mono,
    fontSize: 15,
    background: theme.panelRaised,
    border: `1px solid ${theme.border}`,
    borderRadius: 6,
    padding: "10px 12px",
    color: theme.text,
    width: "100%",
    boxSizing: "border-box",
    outline: "none",
  };
}

export function buttonStyle(theme) {
  return {
    fontFamily: theme.sans,
    fontWeight: 600,
    fontSize: 13,
    letterSpacing: "0.03em",
    background: theme.accent,
    color: theme.accentText,
    border: "none",
    borderRadius: 6,
    padding: "10px 18px",
    cursor: "pointer",
  };
}

export function ghostButtonStyle(theme) {
  return {
    fontFamily: theme.sans,
    fontWeight: 600,
    fontSize: 13,
    background: theme.panelRaised,
    color: theme.muted,
    border: `1px solid ${theme.border}`,
    borderRadius: 6,
    padding: "10px 18px",
    cursor: "pointer",
  };
}
