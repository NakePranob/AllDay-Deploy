import type { Metadata } from "next";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Noto_Sans_Thai } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";

// Provider
import { ThemeProvider } from "@/provider/Theme";
import { MuiThemeProvider } from "@/provider/MuiTheme";
import SessionProvider from "@/provider/Session"

const inter = Noto_Sans_Thai({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "All Day",
  description: "ค้นหาหอพักที่คุณต้องการ",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession()
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-100 dark:bg-superdark`}>
        <ThemeProvider>
          <MuiThemeProvider>
            <SessionProvider session={session}>
              {children}
              <SpeedInsights />
            </SessionProvider>
          </MuiThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
