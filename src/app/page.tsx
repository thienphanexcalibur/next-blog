import NotionPost from "@/components/NotionPost";
import { getAllPagesInSpace, normalizeNotionCoverPath } from "@/utils/notion";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { ExtendedRecordMap } from "notion-types";
import { getPageTitle } from "notion-utils";

export default async function Page() {
  const pageMap = await getAllPagesInSpace();

  return (
    <Box>
      <SimpleGrid
        gridTemplateColumns={{
          base: "1fr",
          md: "repeat(auto-fill, minmax(400px, 1fr))",
        }}
        gap={6}
      >
        {Object.entries(pageMap).map(
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
