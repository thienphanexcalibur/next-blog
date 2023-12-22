import Highlight, { defaultProps, Language } from 'prism-react-renderer'
import github from 'prism-react-renderer/themes/github'
import nightOwl from 'prism-react-renderer/themes/nightOwl'
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'
import { FC } from 'react'
import { ThemeMode } from '@/types/theme'
import { Box, useColorMode } from '@chakra-ui/react'

interface CodeBlockProps {
	codeString?: string
	language: Language
	isLive: boolean
}

const CodeBlock: FC<CodeBlockProps> = ({ codeString, language, isLive }) => {
	const { colorMode } = useColorMode()

	if (isLive) {
		return (
			<Box>
				<LiveProvider
					code={codeString}
					transformCode={(code) => `() => {${code}}`}
				>
					<LivePreview />
					<LiveEditor />
					<LiveError />
				</LiveProvider>
			</Box>
		)
	}

	return (
		<>
			<Highlight
				{...defaultProps}
				code={codeString}
				language={language}
				theme={colorMode === 'light' ? github : nightOwl}
			>
				{({
					className,
					style,
					tokens,
					getLineProps,
					getTokenProps,
				}) => (
					<pre className={className} style={{ ...style }}>
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

export default CodeBlock
