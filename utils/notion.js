import { NotionAPI } from 'notion-client'
import * as notionUtils from 'notion-utils'
const notionAPI = new NotionAPI({
	activeUser: '96c3610f-e6ac-4220-a62e-ea41e17def37',
	authToken:
		'4d19855a2bb8ea7794e16ed9d19034082b3eca3a94bd66fecb2b23c61e5a167104db4fdc790d9b013b72dd7e1380d669a9e09cf5c9859e7711591f8a5a0b435b2b8f9f7319649ef9021eff228f4d',
})

export const getAllPagesInSpace = async () => {
	const rootNotionPageId = process.env.NOTION_ROOT_PAGE_ID
	const rootNotionSpaceId = process.env.NOTION_ROOT_SPACE_ID
	const pages = await notionUtils.getAllPagesInSpace(
		rootNotionPageId,
		rootNotionSpaceId,
		async (pageId) => {
			return await notionAPI.getPage(pageId)
		},
		{
			traverseCollections: false,
		}
	)
	return pages
}

export const getPage = (pageId) => notionAPI.getPage(pageId)
