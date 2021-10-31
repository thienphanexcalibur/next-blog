import matter from 'gray-matter'
import Link from 'next/link'
import { promises as fs } from 'fs'
import { Card, Grid, Text } from '@geist-ui/react'
import path from 'path'
import { useMemo } from 'react'
import Head from 'next/head'

export default function Home({ posts }) {
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
	return (
		<>
			<Head>
				<title>Thien K. Phan</title>
			</Head>
			<Grid.Container gap={2}>
				{sortedPosts.map(
					({ meta: { title, description, date }, filename }) => (
						<Link key={title} href={`/post/${filename}`} passHref>
							<Grid xs={24} sm={24} md={24} lg={12}>
								<Card key={title} width="100%">
									<Text h4>{title}</Text>
									<Text>{description}</Text>
								</Card>
							</Grid>
						</Link>
					)
				)}
			</Grid.Container>
		</>
	)
}

export async function getStaticProps() {
	const blogPath = path.resolve(process.cwd(), './blog')
	const dirs = await fs.readdir(blogPath)

	const file = await Promise.all(
		dirs.map(async (fileDir) => {
			const raw = await fs.readFile(
				path.join(blogPath, fileDir, 'index.mdx'),
				'utf-8'
			)
			return {
				raw,
				filename: fileDir,
			}
		})
	)

	return {
		props: {
			posts: file.map(({ raw, filename }) => {
				const { data: meta } = matter(raw)
				return { meta, filename }
			}),
		},
	}
}
