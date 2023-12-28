import NotionPost from "@/components/NotionPost";
import { getAllPagesInSpace, normalizeNotionCoverPath } from "@/utils/notion";
import { Box, SimpleGrid } from "@chakra-ui/react";
import dayjs from "dayjs";
import { ExtendedRecordMap } from "notion-types";
import { getPageTitle } from "notion-utils";

export default async function Page() {
  const pageMap = await getAllPagesInSpace();

  const meaningfulPost = Object.entries(pageMap);
  meaningfulPost.shift();

  return (
    <Box>
      <SimpleGrid
        gridTemplateColumns={{
          base: "1fr",
          md: "repeat(auto-fill, minmax(400px, 1fr))",
        }}
        gap={6}
      >
        {meaningfulPost
          .sort((a, b) => {
            const id1 = a[0];
            const id2 = b[0];
            const createdTime1 = a[1]?.block[id1].value.created_time;
            const createdTime2 = b[1]?.block[id2].value.created_time;
            return dayjs(createdTime1).isBefore(createdTime2) ? 1 : -1;
          })
          .map(
            ([id, data], index) =>
              index !== 0 && (
                <NotionPost
                  key={id}
                  title={getPageTitle(data as ExtendedRecordMap)}
                  createdTime={data?.block[id].value.created_time ?? null}
                  href={`/posts/${id}`}
                  cover={normalizeNotionCoverPath(
                    data?.block[id].value.format?.page_cover
                  )}
                />
              )
          )}
      </SimpleGrid>
    </Box>
  );
}
