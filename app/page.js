"use client";
import { useState } from "react";
import Tabs from "../components/Tabs";
import CidrCalculator from "../components/CidrCalculator";
import VlsmPlanner from "../components/VlsmPlanner";
import Ipv6Calculator from "../components/Ipv6Calculator";
import { useTheme } from "../components/ThemeContext";

const tabItems = [
  { key: "cidr", label: "IPv4 subnet and CIDR" },
  { key: "vlsm", label: "VLSM planner" },
  { key: "ipv6", label: "IPv6 prefix" },
];

export default function Page() {
  const [active, setActive] = useState("cidr");
  const { theme, mode, toggleMode } = useTheme();

  return (
    <div style={{ background: theme.bg, color: theme.text, minHeight: "100vh" }}>
      <main style={{ maxWidth: 760, margin: "0 auto", padding: "48px 20px 80px" }}>
        <header style={{ marginBottom: 32, display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 20 }}>
          <div>
            <div style={{ fontFamily: theme.mono, fontSize: 12, letterSpacing: "0.15em", color: theme.accent, marginBottom: 8 }}>
              SUBNETKIT
            </div>
            <h1 style={{ fontFamily: theme.sans, fontSize: 30, fontWeight: 700, margin: 0, color: theme.text }}>
              Subnet and CIDR calculator
            </h1>
            <p style={{ fontFamily: theme.sans, fontSize: 15, color: theme.muted, marginTop: 10, maxWidth: 520 }}>
              Work out network ranges, plan VLSM allocations, and inspect IPv6 prefixes, with the bit level math
              shown as a live visualization instead of hidden behind a single answer.
            </p>
          </div>
          <button
            onClick={toggleMode}
            style={{
              fontFamily: theme.sans,
              fontWeight: 600,
              fontSize: 13,
              whiteSpace: "nowrap",
              background: theme.panelRaised,
              color: theme.text,
              border: `1px solid ${theme.border}`,
              borderRadius: 6,
              padding: "10px 16px",
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            Switch to {mode === "blue" ? "white" : "blue"} mode
          </button>
        </header>

        <Tabs active={active} onChange={setActive} items={tabItems} />

        {active === "cidr" ? <CidrCalculator /> : null}
        {active === "vlsm" ? <VlsmPlanner /> : null}
        {active === "ipv6" ? <Ipv6Calculator /> : null}

        <footer style={{ marginTop: 60, fontFamily: theme.sans, fontSize: 12, color: theme.muted }}>
          Built with Next.js. Runs entirely in the browser, no data leaves your device.
        </footer>
      </main>
    </div>
  );
}
