import NotionPost from "@/components/NotionPost";
import { getAllPagesInSpace, normalizeNotionCoverPath } from "@/utils/notion";
import dayjs from "dayjs";
import { ExtendedRecordMap } from "notion-types";
import { getPageTitle } from "notion-utils";


export const revalidate = 60

export default async function Page() {
  const pageMap = await getAllPagesInSpace();

  const meaningfulPost = Object.entries(pageMap);
  meaningfulPost.shift();

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-6">
      {meaningfulPost
        .sort((a, b) => {
          const id1 = a[0];
          const id2 = b[0];
          const createdTime1 = a[1]?.block[id1].value.created_time;
          const createdTime2 = b[1]?.block[id2].value.created_time;
          return dayjs(createdTime1).isBefore(createdTime2) ? 1 : -1;
        })
        .map(([id, data], index) => (
          <NotionPost
            key={id}
            title={getPageTitle(data as ExtendedRecordMap)}
            createdTime={data?.block[id].value.created_time ?? null}
            href={`/posts/${id}`}
            cover={normalizeNotionCoverPath(
              data?.block[id].value.format?.page_cover
            )}
          />
        ))}
    </div>
  );
}
