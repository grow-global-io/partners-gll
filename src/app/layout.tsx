import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Partners.GrowGlobal",
  description: "Your trusted marketplace platform connecting small businesses with international buyers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts */}
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,700,700i|Poppins:300,400,500,700" rel="stylesheet" />

        {/* Bootstrap CSS */}
        <link href="/lib/bootstrap/css/bootstrap.min.css" rel="stylesheet" />

        {/* Bootstrap Icons */}
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" />

        {/* Libraries CSS Files */}
        <link href="/lib/font-awesome/css/font-awesome.min.css" rel="stylesheet" />
        <link href="/lib/animate/animate.min.css" rel="stylesheet" />

        {/* Main Stylesheet File */}
        <link href="/css/style.css" rel="stylesheet" />
      </head>
      <body>
        <div id="preloader"></div>
        {children}

        {/* JavaScript Libraries */}
        <Script src="/lib/jquery/jquery.min.js" strategy="beforeInteractive" />
        <Script src="/lib/jquery/jquery-migrate.min.js" strategy="beforeInteractive" />
        <Script src="/lib/bootstrap/js/bootstrap.bundle.min.js" strategy="beforeInteractive" />
        <Script src="/lib/easing/easing.min.js" strategy="afterInteractive" />
        <Script src="/lib/wow/wow.min.js" strategy="afterInteractive" />
        <Script src="/lib/waypoints/waypoints.min.js" strategy="afterInteractive" />
        <Script src="/lib/counterup/counterup.min.js" strategy="afterInteractive" />
        <Script src="/lib/superfish/hoverIntent.js" strategy="afterInteractive" />
        <Script src="/lib/superfish/superfish.min.js" strategy="afterInteractive" />

        {/* Template Main Javascript File */}
        <Script src="/js/main.js" strategy="afterInteractive" />
        <Script src="/js/preloader.js" strategy="afterInteractive" />

        {/* Initialize WOW.js */}
        <Script id="init-wow" strategy="afterInteractive">
          {`
            if (typeof window !== 'undefined') {
              window.addEventListener('load', function() {
                if (typeof WOW === 'function') {
                  new WOW().init();
                }
              });
            }
          `}
        </Script>
      </body>
    </html>
  );
}
