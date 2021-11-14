import Document, { Html, Head, Main, NextScript } from 'next/document'
import { CssBaseline } from '@geist-ui/react'

class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx)
		const styles = CssBaseline.flush()
		return {
			...initialProps,
			styles: (
				<>
					{initialProps.styles}
					{styles}
				</>
			),
		}
	}

	render() {
		return (
			<Html>
				<Head>
					<script
						async
						src="https://www.googletagmanager.com/gtag/js?id=UA-117668794-1"
					/>
					<script
						dangerouslySetInnerHTML={{
							__html: `
						window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}
						gtag('js', new Date());
						gtag('config', 'UA-117668794-1');
					`,
						}}
					></script>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

export default MyDocument
