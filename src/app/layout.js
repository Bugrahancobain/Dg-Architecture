import "./globals.css";
import { Poppins } from "next/font/google";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import ScrollToTopButton from "./components/ScrollToTopButton";

export const metadata = {
  title: "DG Mimarlık",
  description: "Buğrahan Çoban",
  icons: {
    icon: "/favicon.ico",
  },
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Navbar />
        {children}
        <ScrollToTopButton />
        <Footer />
      </body>
    </html>
  );
}
