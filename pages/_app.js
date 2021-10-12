import { GeistProvider, CssBaseline } from '@geist-ui/react'
import { useCallback, useEffect, useState } from 'react'
import Layout from './components/layout'

export default function Entry({ Component, pageProps }) {
	const [theme, setTheme] = useState('light')

	const switchTheme = useCallback((themeType) => {
		setTheme((prev) => {
			const nextTheme = prev === 'light' ? 'dark' : 'light'
			localStorage.setItem('theme', nextTheme)
			return themeType || nextTheme
		})
	}, [])

	return (
		<GeistProvider themeType={theme}>
			<CssBaseline />
			<Layout switchTheme={switchTheme}>
				<Component {...pageProps} />
			</Layout>
		</GeistProvider>
	)
}
