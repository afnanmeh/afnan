import "./globals.css";
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Afnan Mehmood | Frontend Engineer & Designer",
  description:
    "Code, craft, and a little curiosity. Afnan Mehmood builds thoughtful digital experiences with React, Next.js, Vue, and TypeScript. Frontend engineering, UI/UX, and design.",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Afnan Mehmood | From code to experience",
    description:
      "Frontend Engineer + UI/UX Engineer + Designer. Based in Pakistan.",
  },
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ead4e1",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/fonts/story-serif.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/story-sans.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
