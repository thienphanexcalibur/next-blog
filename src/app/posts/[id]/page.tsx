import { getPage } from "@/utils/notion";

import NotionPage from "@/components/NotionPage";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const data = await getPage(id);

  const spaceId = process.env.NOTION_ROOT_SPACE_ID;

  return <NotionPage {...data} spaceId={spaceId} />;
}
