import Link from 'next/link'
import { Grid, Text, Page, useTheme, Button } from '@geist-ui/react'
import { Moon, Sun, GitBranch } from '@geist-ui/react-icons'
import { useCallback, useEffect } from 'react'

const Header = ({ switchTheme }) => {
	const { type } = useTheme()
	const title = 'thien k phan'

	return (
		<Grid.Container gap={1} justify="center">
			<Grid xs={12} sm={8} alignItems="center">
				<Text h3 p="0" margin="0">
					<Link href="/">{title}</Link>
				</Text>
			</Grid>
			<Grid xs={12} sm={8} justify="flex-end" alignItems="center">
				<Button
					w="70px"
					mr={1}
					h={0.7}
					auto
					icon={<GitBranch />}
					scale={2 / 3}
				>
					Contact me
				</Button>
				<Button
					type="abort"
					h={0.7}
					onClick={switchTheme}
					iconRight={type === 'light' ? <Sun /> : <Moon />}
					auto
					scale={2 / 3}
				/>
			</Grid>
		</Grid.Container>
	)
}

const Content = ({ children }) => {
	return (
		<Grid.Container justify="center">
			<Grid xs sm={16} direction="column">
				{children}
			</Grid>
		</Grid.Container>
	)
}

const Footer = ({ children }) => {
	return (
		<Grid.Container justify="center">
			<Grid xs sm={16}>
				<Text h6>© {new Date().getFullYear()}, Thien K. Phan</Text>
			</Grid>
		</Grid.Container>
	)
}

const Layout = ({ children, switchTheme }) => {
	return (
		<Page width="100%">
			<Page.Header pt={1}>
				<Header switchTheme={switchTheme} />
			</Page.Header>
			<Page.Content>
				<Content>{children}</Content>
			</Page.Content>
			<Page.Footer>
				<Footer />
			</Page.Footer>
		</Page>
	)
}

export default Layout
