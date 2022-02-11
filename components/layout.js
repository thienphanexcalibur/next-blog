import Link from 'next/link'
import { Grid, Text, Page, useTheme, Button, Spacer } from '@geist-ui/react'
import { Moon, Sun, Linkedin, Github, Facebook } from '@geist-ui/react-icons'

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
					h={0.7}
					onClick={switchTheme}
					icon={type === 'light' ? <Sun /> : <Moon />}
					auto
					scale={2 / 3}
				/>
			</Grid>
		</Grid.Container>
	)
}

const Content = ({ children }) => {
	return (
		<Grid.Container justify="center" mb={2}>
			<Grid xs sm={16} direction="column">
				{children}
			</Grid>
		</Grid.Container>
	)
}

const Footer = ({ children }) => {
	return (
		<>
			<Grid.Container justify="center">
				<Grid xs={12} sm={8} alignItems="center">
					<Text font="12px" type="secondary" b m={0} p={0}>
						© {new Date().getFullYear()}, Thien K. Phan
					</Text>
				</Grid>
				<Grid xs={12} sm={8} justify="flex-end" pr={2}>
					<Linkedin
						onClick={() =>
							window.open(
								'https://www.linkedin.com/in/phankhanhthien/'
							)
						}
						size={16}
						cursor="pointer"
					/>
					<Spacer inline={0.35} />
					<Github
						onClick={() =>
							wincow.open('https://www.facebook.com/ThienFoster')
						}
						size={16}
						cursor="pointer"
					/>
					<Spacer inline={0.35} />
					<Facebook
						onClick={() =>
							window.open('https://github.com/thienphanexcalibur')
						}
						size={16}
						cursor="pointer"
					/>
				</Grid>
			</Grid.Container>
			<Spacer h={2} />
		</>
	)
}

const Layout = ({ children, switchTheme }) => {
	return (
		<Page width="100%" x>
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
