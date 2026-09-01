import type { Metadata } from "next";
import { DM_Sans, Libre_Caslon_Text, Noto_Naskh_Arabic } from "next/font/google";
import { AuthProvider } from "@/components/AuthProvider";
import { Chrome } from "@/components/Chrome";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const libreCaslon = Libre_Caslon_Text({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-serif",
  display: "swap",
});

const notoNaskh = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  weight: ["400", "600"],
  variable: "--font-arabic",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Relegious — Hadith Research",
  description: "An English-first, source-neutral hadith research platform.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${libreCaslon.variable} ${notoNaskh.variable}`}>
      <body className={dmSans.className}>
        <AuthProvider>
          <Chrome>{children}</Chrome>
        </AuthProvider>
      </body>
    </html>
  );
}
