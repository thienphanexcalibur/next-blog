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
  params: Promise<{
    id: string;
  }>;
}
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { id } = await params;

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

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getPage(id);

  const spaceId = process.env.NOTION_ROOT_SPACE_ID;

  return <NotionPage {...data} spaceId={spaceId} />;
}
