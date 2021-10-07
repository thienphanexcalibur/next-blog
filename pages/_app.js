import { GeistProvider, CssBaseline } from "@geist-ui/react";
import {useCallback, useState} from "react";
import Layout from "./components/layout";


export default function Entry({ Component, pageProps }) {
  const [theme, setTheme] = useState('light')
  const switchTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }, [])
  return (
    <GeistProvider themeType={theme}>
      <CssBaseline />
      <Layout switchTheme={switchTheme}>
        <Component {...pageProps} />
      </Layout>
    </GeistProvider>
  );
}
