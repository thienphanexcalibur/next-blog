import React, { useCallback } from 'react'
import { useTheme } from '@geist-ui/react'

const Comment = () => {
	const { type } = useTheme()
	const commentRef = useCallback(
		(node) => {
			const script = document.createElement('script')
			if (node && type) {
				const theme = `github-${type}`
				const attributes = {
					src: `https://utteranc.es/client.js`,
					repo: 'thienphanexcalibur/next-blog',
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
		<div>
			<div ref={commentRef} id="comment" />
		</div>
	)
}

export default Comment
