import "@mantine/core/styles.css";
import "./globals.css";
import React from "react";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import { theme } from "./theme";

export const metadata = {
  title: "Afnan Mehmood - Software Developer",
  description:
    "Portfolio of Afnan Mehmood, a skilled Software Developer proficient in ReactJS, Next.js, JavaScript, TypeScript, and Vue.js",
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme}>{children}</MantineProvider>
      </body>
    </html>
  );
}
