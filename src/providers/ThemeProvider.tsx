"use client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { ReactNode } from "react";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

const theme = extendTheme({
  fonts: {
    body: inter.style.fontFamily,
  },
  styles: {
    global: {
      body: {
        minHeight: "100vh",
      },
    },
  },
});

export default function ThemeProvider({ children }: { children: ReactNode }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
