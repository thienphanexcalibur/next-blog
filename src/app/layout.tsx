import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ThemeProvider from "@/providers/ThemeProvider";
import { Box, Container } from "@chakra-ui/react";
import type { Metadata, Viewport } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Thien k Phan",
};
export const viewport: Viewport = {
  width: "device-width",
  height: "device-height",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-JTCVKJWNE9" />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', 'G-JTCVKJWNE9');
        `}
      </Script>
      <body>
        <ThemeProvider>
          <Container
            maxW="7xl"
            minHeight="100vh"
            pos="relative"
            display="flex"
            flexDir="column"
          >
            <Header />
            <Box as="main" flex={1}>
              {children}
            </Box>
            <Footer />
          </Container>
        </ThemeProvider>
      </body>
    </html>
  );
}
