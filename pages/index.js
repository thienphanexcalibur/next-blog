import matter from 'gray-matter'
import { promises as fs } from 'fs'
import { Grid } from '@geist-ui/react'
import path from 'path'
import { useEffect, useMemo } from 'react'
import Head from 'next/head'
import { getAllPagesInSpace } from '@/utils/notion'
import { getPageImageUrls, getPageProperty, getPageTitle } from 'notion-utils'
import MarkdownPost from '@/components/Posts/MarkdownPost'
import NotionPost from '@/components/Posts/NotionPost'

export default function Home({ posts, notionPosts }) {
	const sortedPosts = useMemo(
		() =>
			posts.slice().sort((a, b) => {
				return (
					new Date(b.meta.date).getTime() -
					new Date(a.meta.date).getTime()
				)
			}),
		[posts]
	)

	useEffect(() => {
		console.log(notionPosts)
	}, [notionPosts])
	return (
		<>
			<Head>
				<title>Thien K. Phan</title>
			</Head>
			<Grid.Container gap={3}>
				{notionPosts.map((post) => (
					<NotionPost
						key={post.id}
						id={post.id}
						title={post.title}
						cover={`https://notion.so${post.cover}`}
					/>
				))}
				{sortedPosts.map((post) => (
					<MarkdownPost
						key={post.filename}
						meta={post.meta}
						filename={post.filename}
						readTime={post.readTime}
					/>
				))}
			</Grid.Container>
		</>
	)
}

export async function getStaticProps() {
	const blogPath = path.resolve(process.cwd(), './blog')
	const dirs = await fs.readdir(blogPath)

	const getReadingTime = (content) => {
		const wpm = 225
		const words = content.trim().split(/\s+/).length
		const time = Math.ceil(words / wpm)
		return time
	}

	const file = await Promise.all(
		dirs.map(async (fileDir) => {
			const raw = await fs.readFile(
				path.join(blogPath, fileDir, 'index.mdx'),
				'utf-8'
			)
			return {
				raw,
				filename: fileDir,
				readTime: getReadingTime(raw),
			}
		})
	)

	const notionPostIds = await getAllPagesInSpace()

	const notionPosts = Object.keys(notionPostIds).map((item) => {
		const recordMap = notionPostIds[item]
		const imageUrls = getPageImageUrls(recordMap, {
			mapImageUrl: (url) => url,
		})
		return {
			title: getPageTitle(recordMap),
			cover: imageUrls?.length > 0 ? imageUrls[0] : null,
			id: item,
		}
	})

	return {
		props: {
			posts: file
				.map(({ raw, filename, readTime }) => {
					const { data: meta } = matter(raw)
					if (meta.hidden) {
						return null
					}
					return { meta, filename, readTime }
				})
				.filter(Boolean),
			notionPosts,
		},
	}
}
