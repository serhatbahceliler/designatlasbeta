import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import AuthProviderWrapper from "@/components/AuthProviderWrapper";

export const metadata: Metadata = {
  title: {
    default: "Design Atlas - UX, UI ve Product Design Öğrenme Platformu",
    template: "%s | Design Atlas",
  },
  description: "Design Atlas - UX, UI ve Product Designer'lar için net, açık roadmap'ler ve öğrenme yolları. UX Sözlük, Case Atölyesi ve kapsamlı tasarım rehberleri. Kayıt yok. Boş laf yok. Net öğrenme yolları.",
  keywords: [
    "Design Atlas",
    "design atlas",
    "UX design",
    "UI design",
    "Product design",
    "UX roadmap",
    "UI roadmap",
    "Product design roadmap",
    "tasarım öğrenme",
    "design öğrenme",
    "UX rehberi",
    "UI rehberi",
    "tasarım roadmap",
    "design roadmap",
    "UX case study",
    "UX sözlük",
    "design sözlük",
  ],
  authors: [{ name: "Design Atlas" }],
  creator: "Design Atlas",
  publisher: "Design Atlas",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://www.designatlas.io"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://www.designatlas.io",
    siteName: "Design Atlas",
    title: "Design Atlas - UX, UI ve Product Design Öğrenme Platformu",
    description: "Design Atlas - UX, UI ve Product Designer'lar için net, açık roadmap'ler ve öğrenme yolları. UX Sözlük, Case Atölyesi ve kapsamlı tasarım rehberleri.",
    images: [
      {
        url: "https://r.resimlink.com/Tp-aXNqbWR.png",
        width: 1200,
        height: 630,
        alt: "Design Atlas - UX, UI ve Product Design Öğrenme Platformu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Design Atlas - UX, UI ve Product Design Öğrenme Platformu",
    description: "Design Atlas - UX, UI ve Product Designer'lar için net, açık roadmap'ler ve öğrenme yolları.",
    images: ["https://r.resimlink.com/Tp-aXNqbWR.png"],
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
  icons: {
    icon: "https://r.resimlink.com/Tp-aXNqbWR.png",
    shortcut: "https://r.resimlink.com/Tp-aXNqbWR.png",
    apple: "https://r.resimlink.com/Tp-aXNqbWR.png",
  },
  verification: {
    // Google Search Console verification code'u buraya eklenecek (gerekirse)
  },
};

const GA_MEASUREMENT_ID = "G-TJKJ1NRBSF";
const MIXPANEL_TOKEN = "f6c4e96428d53c44776d7a54fcac42fb";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className="antialiased">
        {/* Mixpanel */}
        <Script
          id="mixpanel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(e,c){if(!c.__SV){var l,h;window.mixpanel=c;c._i=[];c.init=function(q,r,f){function t(d,a){var g=a.split(".");2==g.length&&(d=d[g[0]],a=g[1]);d[a]=function(){d.push([a].concat(Array.prototype.slice.call(arguments,0)))}}var b=c;"undefined"!==typeof f?b=c[f]=[]:f="mixpanel";b.people=b.people||[];b.toString=function(d){var a="mixpanel";"mixpanel"!==f&&(a+="."+f);d||(a+=" (stub)");return a};b.people.toString=function(){return b.toString(1)+".people (stub)"};l="disable time_event track track_pageview track_links track_forms track_with_groups add_group set_group remove_group register register_once alias unregister identify name_tag set_config reset opt_in_tracking opt_out_tracking has_opted_in_tracking has_opted_out_tracking clear_opt_in_out_tracking start_batch_senders start_session_recording stop_session_recording people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user people.remove".split(" ");
              for(h=0;h<l.length;h++)t(b,l[h]);var n="set set_once union unset remove delete".split(" ");b.get_group=function(){function d(p){a[p]=function(){b.push([g,[p].concat(Array.prototype.slice.call(arguments,0))])}}for(var a={},g=["get_group"].concat(Array.prototype.slice.call(arguments,0)),m=0;m<n.length;m++)d(n[m]);return a};c._i.push([q,r,f])};c.__SV=1.2;var k=e.createElement("script");k.type="text/javascript";k.async=!0;k.src="undefined"!==typeof MIXPANEL_CUSTOM_LIB_URL?MIXPANEL_CUSTOM_LIB_URL:"file:"===
              e.location.protocol&&"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\/\//)?"https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js":"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";e=e.getElementsByTagName("script")[0];e.parentNode.insertBefore(k,e)}})(document,window.mixpanel||[]);
              mixpanel.init('${MIXPANEL_TOKEN}', {
                autocapture: true,
                record_sessions_percent: 100,
                api_host: 'https://api-eu.mixpanel.com',
              });
            `,
          }}
        />
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>

        <AuthProviderWrapper>
          {children}
        </AuthProviderWrapper>
      </body>
    </html>
  );
}
