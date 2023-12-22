import { NotionAPI } from "notion-client";
import { PageMap } from "notion-types";
import { getAllPagesInSpace as notionUtilsGetAllPaceInSpaces } from "notion-utils";
const notionAPI = new NotionAPI({
  activeUser: "96c3610f-e6ac-4220-a62e-ea41e17def37",
  authToken: process.env.NOTION_TOKEN_V2,
});

export const getAllPagesInSpace = async () => {
  const rootNotionPageId = process.env.NOTION_ROOT_PAGE_ID;
  const rootNotionSpaceId = process.env.NOTION_ROOT_SPACE_ID;
  if (!rootNotionPageId) return {} as PageMap;

  const pages = await notionUtilsGetAllPaceInSpaces(
    rootNotionPageId,
    rootNotionSpaceId,
    async (pageId) => {
      return await notionAPI.getPage(pageId);
    },
    {
      traverseCollections: false,
    }
  );
  return pages;
};

export const getPage = (pageId: string) => notionAPI.getPage(pageId);

export const normalizeNotionCoverPath = (path: string) => {
  if (!path) return null;
  return path.indexOf("/") === 0 ? `https://notion.so${path}` : path;
};
