import { Metadata, ResolvingMetadata } from "next";
import {
  getBlockValue,
  getPageContentBlockIds,
  getPageProperty,
  getPageTitle,
} from "notion-utils";
import { getPage, normalizeNotionCoverPath } from "@/utils/notion";

import NotionPage from "@/components/NotionPage";

interface Props {
  params: {
    id: string;
  };
}
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const id = params.id;

  // fetch data
  const recordMap = await getPage(id);

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: getPageTitle(recordMap),
    openGraph: {
      images: [
        normalizeNotionCoverPath(
          getBlockValue(recordMap.block[id]).format?.page_cover,
        ) ?? "",
        ...previousImages,
      ].filter(Boolean),
    },
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const data = await getPage(id);

  const spaceId = process.env.NOTION_ROOT_SPACE_ID;

  return <NotionPage {...data} spaceId={spaceId} />;
}
