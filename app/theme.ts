import { createTheme } from "@mantine/core";

export const theme = createTheme({
  primaryColor: "blue",
  fontFamily:
    'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  headings: {
    fontFamily:
      'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontWeight: "900",
    sizes: {
      h1: { fontSize: "4rem", lineHeight: "1.1", fontWeight: "900" },
      h2: { fontSize: "3rem", lineHeight: "1.2", fontWeight: "900" },
      h3: { fontSize: "2rem", lineHeight: "1.3", fontWeight: "800" },
      h4: { fontSize: "1.5rem", lineHeight: "1.4", fontWeight: "700" },
    },
  },
  colors: {
    dark: [
      "#C1C2C5",
      "#A6A7AB",
      "#909296",
      "#5c5f66",
      "#373A40",
      "#2C2E33",
      "#25262b",
      "#1A1B1E",
      "#141517",
      "#101113",
    ],
  },
  defaultRadius: "xl",
});
