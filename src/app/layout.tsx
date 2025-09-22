import type { Metadata, Viewport } from "next";
import { Inter, Raleway } from "next/font/google";
import "./globals.css";
import "../styles/halloween.css";
import "../styles/seasonal-themes.css";
import { SearchProvider } from "@/contexts/search-context";
import { AuthProvider } from "@/contexts/AuthContext";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import { AdminProvider } from "@/contexts/AdminContext";
import { UserStorageProvider } from "@/contexts/UserStorageContext";
import { SeasonalThemeProvider } from "@/contexts/SeasonalThemeContext";
import { DarkLightThemeContext } from "@/contexts/DarkLightThemeContext";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from 'react-hot-toast'
import { HalloweenMusicManager } from "@/components/halloween/halloween-music-manager"
const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});
const raleway = Raleway({
  subsets: ["latin"],
  weight: ["300", "500", "700", "900"],
  variable: "--font-raleway",
});

export const metadata: Metadata = {
  title: {
    default: "Français Pro - Learn French from Zero to Hero | Free French Learning Platform",
    template: "%s | Français Pro - Master French Language"
  },
  description: "Master French language with Français Pro - the ultimate free French learning platform for Canadian immigration. Interactive lessons, AI-powered tutoring, real-time progress tracking, and CLB level preparation. Start your French journey today!",
  keywords: [
    "learn french",
    "french language learning",
    "french lessons",
    "french grammar",
    "french vocabulary",
    "french pronunciation",
    "french for beginners",
    "french for immigration",
    "canadian immigration french",
    "express entry french",
    "CLB french test",
    "french language course",
    "free french learning",
    "french online course",
    "french tutoring",
    "french practice",
    "french exercises",
    "french audio lessons",
    "french conversation",
    "french writing",
    "french reading",
    "french listening",
    "french speaking",
    "french certification",
    "french proficiency test",
    "french language app",
    "français pro",
    "kasim kazmi"
  ],
  authors: [{ name: "Kasim Kazmi", url: "https://github.com/kasimkazmi" }],
  creator: "Kasim Kazmi",
  publisher: "Français Pro",
  applicationName: "Français Pro",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  alternates: {
    canonical: "https://francais-pro.vercel.app",
    languages: {
      "en-US": "https://francais-pro.vercel.app",
      "fr-FR": "https://francais-pro.vercel.app/fr",
    },
  },
  category: "education",
  classification: "French Language Learning Platform",
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["fr_FR"],
    url: "https://francais-pro.vercel.app",
    title: "Français Pro - Learn French from Zero to Hero | Free French Learning Platform",
    description: "Master French language with interactive lessons, AI-powered tutoring, and real-time progress tracking. Perfect for Canadian immigration and Express Entry. Start learning French today!",
    siteName: "Français Pro",
    images: [
      {
        url: "https://francais-pro.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Français Pro - Learn French from Zero to Hero",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@kasimkazmi",
    creator: "@kasimkazmi",
    title: "Français Pro - Learn French from Zero to Hero | Free French Learning Platform",
    description: "Master French language with interactive lessons, AI-powered tutoring, and real-time progress tracking. Perfect for Canadian immigration and Express Entry.",
    images: ["https://francais-pro.vercel.app/twitter-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
    other: {
      me: ["https://francais-pro.vercel.app"],
    },
  },
  other: {
    "msapplication-TileColor": "#2563eb",
    "msapplication-config": "/browserconfig.xml",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "Français Pro",
    "application-name": "Français Pro",
    "mobile-web-app-capable": "yes",
    "theme-color": "#2563eb",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" }
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Français Pro",
    "description": "Master French language with Français Pro - the ultimate free French learning platform for Canadian immigration. Interactive lessons, AI-powered tutoring, and real-time progress tracking.",
    "url": "https://francais-pro.vercel.app",
    "logo": "https://francais-pro.vercel.app/logo.png",
    "image": "https://francais-pro.vercel.app/og-image.png",
    "sameAs": [
      "https://github.com/kasimkazmi/francais-pro"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "kasimdev07@gmail.com"
    },
    "founder": {
      "@type": "Person",
      "name": "Kasim Kazmi",
      "url": "https://github.com/kasimkazmi"
    },
    "educationalCredentialAwarded": "French Language Proficiency",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "French Language Courses",
      "itemListElement": [
        {
          "@type": "Course",
          "name": "French for Beginners",
          "description": "Learn French from scratch with interactive lessons",
          "provider": {
            "@type": "Organization",
            "name": "Français Pro"
          }
        },
        {
          "@type": "Course", 
          "name": "French for Canadian Immigration",
          "description": "Prepare for Express Entry with French language skills",
          "provider": {
            "@type": "Organization",
            "name": "Français Pro"
          }
        }
      ]
    },
    "applicationCategory": "Education",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    }
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body className={`${inter.variable} ${raleway.variable} font-sans antialiased`} suppressHydrationWarning>
        <div id="loading-overlay" className="fixed inset-0 bg-black z-[9998] hidden"></div>
        <DarkLightThemeContext>
          <SeasonalThemeProvider>
            <AuthProvider>
              <UserStorageProvider>
                <AdminProvider>
                  <FavoritesProvider>
                    <SearchProvider>
                      {children}
                    </SearchProvider>
                  </FavoritesProvider>
                </AdminProvider>
              </UserStorageProvider>
            </AuthProvider>
          </SeasonalThemeProvider>
        </DarkLightThemeContext>
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'var(--toast-bg)',
              color: 'var(--toast-color)',
              border: '1px solid var(--toast-border)',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: '500',
            },
            success: {
              iconTheme: {
                primary: '#10b981',
                secondary: '#ffffff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#ffffff',
              },
            },
          }}
        />
        <SpeedInsights />
        <Analytics />
        <HalloweenMusicManager volume={0.3} loop={true} />
      </body>
    </html>
  );
}