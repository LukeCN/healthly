import { SITE } from "@/lib/data";
import "./globals.css";
import Link from "next/link";

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    locale: "en_AU",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-AU">
      <body>
        <header className="site-header">
          <div className="container header-inner">
            <Link href="/" className="brand">
              <span className="brand-mark">＋</span> Healthly
            </Link>
            <nav className="nav">
              <Link href="/psychiatrist">Psychiatrists</Link>
              <Link href="/psychologist">Psychologists</Link>
              <Link href="/adhd-gp">ADHD GPs</Link>
              <Link href="/conditions/adhd">Health info</Link>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="site-footer">
          <div className="container">
            <p className="footer-brand">＋ Healthly</p>
            <p className="footer-note">
              {SITE.description} Healthly is an information and directory service
              and does not provide medical advice. In an emergency call 000. For
              24/7 crisis support call Lifeline on 13 11 14.
            </p>
            <p className="footer-copy">
              © {new Date().getFullYear()} Healthly. Made in Australia.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
