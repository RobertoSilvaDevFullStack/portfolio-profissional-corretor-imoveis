import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import MetaPixel from "@/components/analytics/MetaPixel";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Portfólio Profissional - Corretor de Imóveis",
  description: "Especialista em realizar sonhos. Encontre o imóvel ideal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth" suppressHydrationWarning>
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID || ""} />
      <body
        className={`${inter.variable} ${playfair.variable} antialiased bg-background text-foreground font-sans`}
      >
        <MetaPixel id={process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID} />
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
