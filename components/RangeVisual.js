"use client";
import { useTheme } from "./ThemeContext";

export default function RangeVisual({ networkIp, firstHostIp, lastHostIp, broadcastIp, totalHosts, usableHosts }) {
  const { theme } = useTheme();
  const width = 640;
  const height = 90;
  const trackY = 34;
  const trackHeight = 26;

  const networkWidth = Math.max(24, Math.min(60, width * 0.06));
  const broadcastWidth = totalHosts > 1 ? Math.max(24, Math.min(60, width * 0.06)) : 0;
  const usableWidth = Math.max(0, width - networkWidth - broadcastWidth);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" style={{ maxWidth: width, display: "block" }}>
      <rect x={0} y={trackY} width={networkWidth} height={trackHeight} rx={4} fill={theme.secondary} />
      {usableWidth > 0 ? (
        <rect x={networkWidth} y={trackY} width={usableWidth} height={trackHeight} rx={4} fill={theme.accent} opacity={0.22} stroke={theme.accent} strokeWidth={1} />
      ) : null}
      {broadcastWidth > 0 ? (
        <rect x={networkWidth + usableWidth} y={trackY} width={broadcastWidth} height={trackHeight} rx={4} fill={theme.secondary} />
      ) : null}

      <text x={0} y={trackY - 8} fontFamily={theme.mono} fontSize="11" fill={theme.muted}>{networkIp}</text>
      <text x={networkWidth + usableWidth / 2} y={trackY - 8} fontFamily={theme.mono} fontSize="11" fill={theme.muted} textAnchor="middle">
        {usableHosts.toLocaleString()} usable
      </text>
      {broadcastWidth > 0 ? (
        <text x={width} y={trackY - 8} fontFamily={theme.mono} fontSize="11" fill={theme.muted} textAnchor="end">{broadcastIp}</text>
      ) : null}

      <text x={networkWidth + 4} y={trackY + trackHeight + 16} fontFamily={theme.mono} fontSize="11" fill={theme.text}>{firstHostIp}</text>
      <text x={networkWidth + usableWidth - 4} y={trackY + trackHeight + 16} fontFamily={theme.mono} fontSize="11" fill={theme.text} textAnchor="end">{lastHostIp}</text>
    </svg>
  );
}
