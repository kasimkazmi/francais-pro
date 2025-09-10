import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SearchProvider } from "@/contexts/search-context";
import { AuthProvider } from "@/contexts/AuthContext";
import { FavoritesProvider } from "@/contexts/FavoritesContext";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Français Pro - Learn French from Zero to Hero",
  description: "A modern, documentation-style French learning platform. Master French with interactive lessons, AI-powered tutoring, and comprehensive progress tracking.",
  keywords: ["french", "language learning", "education", "nextjs", "tailwindcss"],
  authors: [{ name: "Raja Kazmi" }],
  creator: "Raja Kazmi",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://francais-pro.vercel.app",
    title: "Français Pro - Learn French from Zero to Hero",
    description: "Master French with our modern, interactive learning platform",
    siteName: "Français Pro",
  },
  twitter: {
    card: "summary_large_image",
    title: "Français Pro - Learn French from Zero to Hero",
    description: "Master French with our modern, interactive learning platform",
    creator: "@rajakazmi",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`} suppressHydrationWarning>
        <AuthProvider>
          <FavoritesProvider>
            <SearchProvider>
              {children}
            </SearchProvider>
          </FavoritesProvider>
        </AuthProvider>
      </body>
    </html>
  );
}