import { Inter, IBM_Plex_Mono } from "next/font/google";
import { ThemeProvider } from "../components/ThemeContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-mono" });

export const metadata = {
  title: "subnetkit",
  description: "An IPv4 subnet calculator, VLSM planner, and IPv6 prefix calculator with live visualizations.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${plexMono.variable}`}>
      <body style={{ margin: 0, fontFamily: "Inter, Segoe UI, sans-serif", minHeight: "100vh" }}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
