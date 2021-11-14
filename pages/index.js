import matter from 'gray-matter'
import { default as NextLink } from 'next/link'
import Image from 'next/image'
import { promises as fs } from 'fs'
import { Card, Grid, Text, Link, Spacer } from '@geist-ui/react'
import { ArrowRightCircleFill } from '@geist-ui/react-icons'
import path from 'path'
import { useMemo } from 'react'
import Head from 'next/head'
import styled from 'styled-components'

const readingTime = (content) => {
	const wpm = 225
	const words = content.trim().split(/\s+/).length
	const time = Math.ceil(words / wpm)
	return time
}

const ReadButton = styled(Link)`
	display: flex;
	align-items: center !important;
	justify-content: center;
`

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
					({
						meta: { title, description, date, cover },
						filename,
						readTime,
					}) => (
						<Grid xs={24} sm={24} md={24} lg={12} key={title}>
							<NextLink href={`/post/${filename}`}>
								<Link>
									<Card hoverable>
										<Card.Content>
											{cover && (
												<Image
													src={cover}
													layout="responsive"
													width="100%"
													height="30px"
													priority
													placeholder="blur"
													blurDataURL="iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO8/eR2PQAIVwMbEwfT0QAAAABJRU5ErkJggg=="
													objectFit="cover"
													alt={title}
												/>
											)}
											<Spacer h={1} />
											<Text h4>{title}</Text>
											<Text>{description}</Text>
										</Card.Content>
										<Card.Footer>
											<ReadButton block align="center">
												<ArrowRightCircleFill
													size={18}
												/>
												{readTime} minutes read
											</ReadButton>
										</Card.Footer>
									</Card>
								</Link>
							</NextLink>
						</Grid>
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
				readTime: readingTime(raw),
			}
		})
	)

	return {
		props: {
			posts: file.map(({ raw, filename, readTime }) => {
				const { data: meta } = matter(raw)
				return { meta, filename, readTime }
			}),
		},
	}
}
