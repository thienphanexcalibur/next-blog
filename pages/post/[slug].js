import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import matter from 'gray-matter'
import Head from 'next/head'
import Image from 'next/image'
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

const fs = require('fs')
const path = require('path')

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
				<div>
					<Image
						src={src}
						width="100%"
						height="100%"
						layout="responsive"
						objectFit="contain"
						alt={alt}
					/>
				</div>
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
			<Head>
				<title>{meta.title}</title>
			</Head>
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
			<Text h2>{meta.title}</Text>
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
