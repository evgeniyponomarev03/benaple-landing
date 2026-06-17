import type { Metadata } from 'next'
import Script from 'next/script'

import { cn } from '@/utilities/ui'
import { Poppins, Inter } from 'next/font/google'
import React from 'react'
import { ViewTransitions } from 'next-view-transitions'

import { AdminBar } from '@/components/AdminBar'
import { BottomMobileNav } from '@/components/BottomMobileNav'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import {
  AuroraConfigProvider,
  AuroraWrapper,
} from '@/components/GlobalAuroraBackground'
import { Providers } from '@/providers'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'

// Configure Poppins font
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
})

// Configure Inter font
const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isEnabled } = await draftMode()

  return (
    <html
      className={cn(poppins.variable, inter.variable)}
      data-theme="light"
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <link
          rel="icon"
          type="image/png"
          href="/favicon-96x96.png"
          sizes="96x96"
        />
        <link
          rel="icon"
          type="image/svg+xml"
          href="/favicon.svg"
        />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        {/* Meta Pixel noscript */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=3726758320788783&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* LinkedIn Insight Tag noscript */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            alt=""
            src="https://px.ads.linkedin.com/collect/?pid=8398154&fmt=gif"
          />
        </noscript>
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-M22X86"
            height="0"
            width="0"
            style={{
              display: 'none',
              visibility: 'hidden',
            }}
          />
        </noscript>
        <AuroraConfigProvider>
          <AuroraWrapper />
          <ViewTransitions>
            <Providers>
              <AdminBar
                adminBarProps={{
                  preview: isEnabled,
                }}
              />

              <Header />
              {children}
              <Footer />
              <BottomMobileNav />
            </Providers>
          </ViewTransitions>
        </AuroraConfigProvider>
        {process.env.NODE_ENV === 'development' &&
          process.env.PINY_VISUAL_SELECT === 'true' && (
            <Script
              src="/_piny/piny.phone.js"
              strategy="beforeInteractive"
            />
          )}

        {/* Meta Pixel Code */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '3726758320788783');
            fbq('track', 'PageView');
          `}
        </Script>

        {/* Google Tag Manager */}
        <Script id="gtm" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-M22X86');
          `}
        </Script>

        {/* LinkedIn Insight Tag */}
        <Script
          id="linkedin-insight"
          strategy="afterInteractive"
        >
          {`
            _linkedin_partner_id = "8398154";
            window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
            window._linkedin_data_partner_ids.push(_linkedin_partner_id);
            (function(l) {
              if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
              window.lintrk.q=[]}
              var s = document.getElementsByTagName("script")[0];
              var b = document.createElement("script");
              b.type = "text/javascript";b.async = true;
              b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
              s.parentNode.insertBefore(b, s);
            })(window.lintrk);
          `}
        </Script>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}
