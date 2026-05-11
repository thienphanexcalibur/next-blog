import { getAllPagesInSpace, normalizeNotionCoverPath } from "@/utils/notion";
import { getBlockValue, getPageTitle } from "notion-utils";

import { ExtendedRecordMap } from "notion-types";
import NotionPost from "@/components/NotionPost";
import dayjs from "dayjs";

export const revalidate = 60;

export default async function Page() {
  const pageMap = await getAllPagesInSpace();

  const meaningfulPost = Object.entries(pageMap);
  meaningfulPost.shift();

  // console.log(meaningfulPost);
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-6">
      {meaningfulPost
        .sort((a, b) => {
          const id1 = a[0];
          const id2 = b[0];
          const blockValue1 = getBlockValue(a[1].block[id1]);
          const blockValue2 = getBlockValue(b[1].block[id2]);
          const createdTime1 = blockValue1.created_time;
          const createdTime2 = blockValue2.created_time;
          return dayjs(createdTime1).isBefore(createdTime2) ? 1 : -1;
        })
        .map(([id, data], index) => {
          const blockValue = getBlockValue(data.block[id]);
          return (
            <NotionPost
              key={id}
              title={getPageTitle(data as ExtendedRecordMap)}
              createdTime={blockValue.created_time}
              href={`/posts/${id}`}
              cover={normalizeNotionCoverPath(blockValue.format?.page_cover)}
            />
          );
        })}
    </div>
  );
}
