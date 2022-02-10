import React from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import github from 'prism-react-renderer/themes/github'
import nightOwl from 'prism-react-renderer/themes/nightOwl'
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'
import { Grid, useTheme } from '@geist-ui/react'
import { mdx } from '@mdx-js/react'

export default function CodeBlock({ children, className, live, theme }) {
	const language = className?.replace(/language-/, '') ?? ''

	if (live) {
		return (
			<Grid>
				<LiveProvider
					code={children.trim()}
					transformCode={(code) => '/** @jsx mdx */' + code}
					scope={{ mdx }}
				>
					<LivePreview />
					<LiveEditor />
					<LiveError />
				</LiveProvider>
			</Grid>
		)
	}

	return (
		<>
			<Highlight
				{...defaultProps}
				code={children}
				language={language}
				theme={theme.type === 'light' ? github : nightOwl}
			>
				{({
					className,
					style,
					tokens,
					getLineProps,
					getTokenProps,
				}) => (
					<pre
						className={className}
						style={{ ...style, padding: '20px' }}
					>
						{tokens.map((line, i) => (
							<div key={i} {...getLineProps({ line, key: i })}>
								{line.map((token, key) => (
									<span
										key={key}
										{...getTokenProps({
											token,
											key,
										})}
									/>
								))}
							</div>
						))}
					</pre>
				)}
			</Highlight>
		</>
	)
}
