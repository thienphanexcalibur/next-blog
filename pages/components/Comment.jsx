import { useColorMode } from '@chakra-ui/react'
import React, { useCallback, useEffect, useRef } from 'react'
import Script from 'next/script'
import { useTheme } from '@geist-ui/react'

const Comment = () => {
	const { type } = useTheme()

	const commentRef = useCallback(
		(node) => {
			const script = document.createElement('script')
			if (node && type) {
				node.innerHTML = ''
				const theme = `github-${type}`
				const attributes = {
					src: `https://utteranc.es/client.js?v=${Math.round(
						Math.random() * 1000
					)}`,
					repo: 'thienphanexcalibur/personal-blog',
					['issue-term']: 'title',
					theme,
					crossorigin: 'anonymous',
					async: true,
				}
				for (const [key, value] of Object.entries(attributes)) {
					script.setAttribute(key, value)
				}
				node.appendChild(script)
			}
		},
		[type]
	)

	return (
		<>
			<div ref={commentRef} />
		</>
	)
}

export default Comment
