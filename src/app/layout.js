import "./globals.css";
import { Poppins } from "next/font/google";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import ScrollToTopButton from "./components/ScrollToTopButton";
import Script from "next/script";

export const metadata = {
  title: "DG Mimarlık | Modern ve Fonksiyonel Mimari Projeler",
  description:
    "DG Mimarlık; konut, ticari alan ve yaşam projelerinde modern ve fonksiyonel çözümler sunar. Bursa merkezli mimarlık ofisimizle kaliteli ve estetik projeler üretiyoruz.",
  keywords: [
    "mimarlık",
    "dg mimarlık",
    "mimari proje",
    "iç mimarlık",
    "mimari tasarım",
    "Bursa mimarlık",
    "mimari görselleştirme",
    "konut projesi",
    "villa tasarımı",
    "iç mekan tasarımı"
  ],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "DG Mimarlık | Modern ve Fonksiyonel Mimari Projeler",
    description:
      "DG Mimarlık; estetik, sürdürülebilir ve kullanıcı odaklı projeler üretir. Web sitemizden tamamlanan ve devam eden projelerimizi inceleyin.",
    url: "https://www.damlagocermimarlik.com", // varsa senin domain
    siteName: "DG Mimarlık",
    images: [
      {
        url: "/dg-mimarlik-logo.png", // varsa bir sosyal medya paylaşım görseli
        width: 1200,
        height: 630,
        alt: "DG Mimarlık Projeleri",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-DM5DXRFNMZ"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
        >
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-DM5DXRFNMZ');
          `}
        </Script>
      </head>
      <body className={poppins.className}>
        <Navbar />
        {children}
        <ScrollToTopButton />
        <Footer />
      </body>
    </html>
  );
}
