import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import matter from 'gray-matter'
import Head from 'next/head'
import Image from 'next/image'
import styled from 'styled-components'
import {
	Text,
	Code,
	Badge,
	useTheme,
	Grid,
	Keyboard,
	Tag,
	Note,
} from '@geist-ui/react'
import dayjs from 'dayjs'
import CodeBlock from '../../components/CodeBlock'
import Comment from '../../components/Comment'
import { useMemo } from 'react'
import { NextSeo } from 'next-seo'

const fs = require('fs')
const path = require('path')

const ImgContainer = styled.div`
	position: relative;
	width: ${(props) => props.width ?? '100%'};
	height: ${(props) => props.height ?? '500px'};
`

const heading = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
	.map((item) => {
		const prop = { [`${item}`]: true }
		return {
			[`${item}`]: ({ children, ...props }) => (
				<Text {...prop} {...props}>
					{children}
				</Text>
			),
		}
	})
	.reduce((accu, val) => ({ ...accu, ...val }), {})

const Post = ({ source, meta, slug }) => {
	const theme = useTheme()
	const components = useMemo(() => {
		return {
			...heading,
			p: Text,
			img: ({ src, alt }) => (
				<ImgContainer>
					<Image
						src={src}
						layout="fill"
						alt={alt}
						priority
						placeholder="blur"
						blurDataURL="iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO8/eR2PQAIVwMbEwfT0QAAAABJRU5ErkJggg=="
						objectFit="contain"
					/>
				</ImgContainer>
			),
			pre: (props) => <div {...props} />,
			code: (props) => <CodeBlock {...props} theme={theme} />,
			Keyboard,
			Tag,
			Note,
		}
	}, [theme])
	return (
		<>
			<NextSeo
				title={meta.title}
				description={meta.description}
				canonical="https://www.canonical.ie/"
				openGraph={{
					url: `https://thienkphan.com/post/${slug}`,
					title: meta.title,
					description: meta.description,
					images: [
						{
							url: `https://thienkphan.com${meta.cover}`,
							width: 800,
							height: 100,
							alt: meta.title,
							type: 'image/jpeg',
						},
					],
					site_name: 'thienkphan',
				}}
			/>
			<Head>
				<title>{meta.title}</title>
			</Head>

			<Text h2>{meta.title}</Text>
			<Grid mb={1}>
				<Badge
					type="success"
					style={{
						backgroundColor:
							theme.type === 'light'
								? theme.palette.successLight
								: theme.palette.successDark,
					}}
				>
					{dayjs(meta.date).format('MMMM DD YYYY')}
				</Badge>
			</Grid>
			<MDXRemote {...source} components={components} scope={meta} />
			<Comment key={theme.type} />
		</>
	)
}

export const getStaticProps = async ({ params: { slug } }) => {
	const file = fs.readFileSync(
		path.resolve(process.cwd(), `blog/${slug}/index.mdx`),
		'utf-8'
	)
	const { data, content } = matter(file)
	const serialized = await serialize(content)
	return {
		props: {
			meta: data,
			source: serialized,
			slug,
		},
	}
}

export const getStaticPaths = () => {
	const filenames = fs.readdirSync(path.resolve(process.cwd(), 'blog'))
	const paths = filenames.map((filename) => ({
		params: {
			slug: filename,
		},
	}))
	return {
		paths,
		fallback: false,
	}
}

export default Post
