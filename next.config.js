const withMDX = require('@next/mdx')({
	extension: /\.(md|mdx)$/,
})

module.exports = withMDX({
	images: {
		domains: ['i.imgur.com', 'images.unsplash.com', 'notion.so'],
	},
})
