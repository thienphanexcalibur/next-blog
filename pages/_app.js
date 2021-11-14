import { ThemeManager } from '@/utils'
import { GeistProvider, CssBaseline } from '@geist-ui/react'
import { useCallback, useEffect, useState } from 'react'
import Layout from '../components/layout'

const { persistTheme, getInitialTheme } = new ThemeManager('theme')

export default function Entry({ Component, pageProps }) {
	const [theme, setTheme] = useState('light')

	useEffect(() => {
		setTheme(getInitialTheme())
	}, [])

	const switchTheme = useCallback(() => {
		setTheme((prev) => {
			const nextTheme = prev === 'light' ? 'dark' : 'light'
			persistTheme(nextTheme)
			return nextTheme
		})
	}, [])

	return (
		<>
			<GeistProvider themeType={theme}>
				<CssBaseline />
				<Layout switchTheme={switchTheme}>
					<Component {...pageProps} />
				</Layout>
			</GeistProvider>
		</>
	)
}
