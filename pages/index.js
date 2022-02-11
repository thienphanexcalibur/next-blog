import matter from 'gray-matter'
import { default as NextLink } from 'next/link'
import Image from 'next/image'
import { promises as fs } from 'fs'
import { Grid, Text, Fieldset } from '@geist-ui/react'
import path from 'path'
import { useMemo } from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import dayjs from 'dayjs'

const getReadingTime = (content) => {
	const wpm = 225
	const words = content.trim().split(/\s+/).length
	const time = Math.ceil(words / wpm)
	return time
}

const Meta = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`
const Hoverable = styled.div`
	&:hover {
		cursor: pointer;
	}
	width: 100%;
	display: flex;
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
			<Grid.Container gap={3}>
				{sortedPosts.map(
					({
						meta: { title, description, date, cover },
						filename,
						readTime,
					}) => (
						<Grid xs={24} md={12} key={title}>
							<NextLink href={`/post/${filename}`} width="100%">
								<Hoverable>
									<Fieldset width="100%" display="flex">
										<Fieldset.Content padding={0}>
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
										</Fieldset.Content>
										<Fieldset.Content pt="10px">
											<Meta>
												<Text
													font="12px"
													type="success"
													p
													b
												>
													{readTime} minutes read
												</Text>

												<Text
													font="12px"
													my={0}
													p
													b
													type="secondary"
												>
													{dayjs(date).format(
														'YYYY-MM-DD'
													)}
												</Text>
											</Meta>
											<Fieldset.Title>
												{title}
											</Fieldset.Title>
											<Fieldset.Subtitle>
												<Text my={0}>
													{description}
												</Text>
											</Fieldset.Subtitle>
										</Fieldset.Content>
									</Fieldset>
								</Hoverable>
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
				readTime: getReadingTime(raw),
			}
		})
	)

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
		},
	}
}
