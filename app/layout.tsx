import '../src/styles/globals.css';
import Header from '../src/components/Header';
import NeuralCanvas from '../src/components/NeuralCanvas';
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ZENØ",
  description: "Your AI assistant hub",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NeuralCanvas />
        <Header />
        <div className="min-h-screen">
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
