import type { Metadata } from "next";
import { Audiowide, Fira_Code } from "next/font/google";
import "./globals.css";

const audiowide = Audiowide({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-audiowide",
  display: "swap",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Portofolio Dimas",
  description: "Portofolio Dimas Aksa Oktapian - System Engineer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={`${audiowide.variable} ${firaCode.variable} antialiased`}>
        <div className="bg-glow-wrapper" aria-hidden="true">
          <div className="bg-glow-blue animate-glow-blue" />
          <div className="bg-glow-purple animate-glow-purple" />
        </div>
        {children}
      </body>
    </html>
  );
}
  