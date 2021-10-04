import { ChakraProvider } from "@chakra-ui/react";
import Layout from "./components/layout";


export default function Entry({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}
