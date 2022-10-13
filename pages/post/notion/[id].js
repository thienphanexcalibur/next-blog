import { NotionRenderer, defaultMapPageUrl } from 'react-notion-x'
import Image from 'next/image'
import Link from 'next/link'
// core styles shared by all of react-notion-x (required)
import 'react-notion-x/src/styles.css'
import { useTheme } from '@geist-ui/react'
import Comment from '@/components/Comment'
import Head from 'next/head'
import { getPageTitle } from 'notion-utils'
import { useEffect } from 'react'
import { getAllPagesInSpace, getPage } from '@/utils/notion'

const NotionPage = ({ recordMap }) => {
	const theme = useTheme()
	const isDark = theme.type === 'dark'
	const title = recordMap ? getPageTitle(recordMap) : null

	return (
		<>
			<Head>
				<title>{title}</title>
			</Head>
			<h2>{title}</h2>
			<div>
				<NotionRenderer
					recordMap={recordMap}
					fullPage={false}
					components={{
						nextImage: Image,
						nextLink: Link,
					}}
					darkMode={isDark}
				/>
			</div>
			<Comment key={theme.type} />
		</>
	)
}

export const getStaticProps = async ({ params: { id } }) => {
	const recordMap = await getPage(id)

	return {
		props: {
			recordMap,
		},
	}
}

export const getStaticPaths = async () => {
	const mapPageUrl = defaultMapPageUrl(process.env.NOTION_ROOT_PAGE_ID)
	const pages = await getAllPagesInSpace()
	const paths = Object.keys(pages)
		.map((pageId) => mapPageUrl(pageId))
		.filter((path) => path && path !== '/')
		.map((path) => `/post/notion${path}`)
	return {
		paths,
		fallback: true,
	}
}

export default NotionPage
