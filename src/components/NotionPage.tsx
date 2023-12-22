"use client";
// core styles shared by all of react-notion-x (required)

import "react-notion-x/src/styles.css";

import { Box, Heading, useColorMode } from "@chakra-ui/react";
import { ExtendedRecordMap } from "notion-types";
import { getPageTitle } from "notion-utils";
import { NotionRenderer } from "react-notion-x";
import Comment from "./Comment";
import dynamic from "next/dynamic";

const Code = dynamic(() => {
  // @ts-ignore
  import("prismjs/themes/prism-okaidia.min.css");
  return import("react-notion-x/build/third-party/code").then(async (m) => {
    await Promise.all([
      // @ts-ignore
      import("prismjs/components/prism-solidity.js"),

      // @ts-ignore
      import("prismjs/components/prism-jsx.js"),

      // @ts-ignore
      import("prismjs/components/prism-javascript.js"),

      // @ts-ignore
      import("prismjs/components/prism-bash"),
    ]);
    return m.Code;
  });
});

interface NotionPageProps extends ExtendedRecordMap {
  spaceId?: string;
}
export default function NotionPage(props: NotionPageProps) {
  const { spaceId, ...recordMap } = props;
  const { colorMode } = useColorMode();

  const title = getPageTitle(props);

  return (
    <Box>
      <Heading size="xl" mb={5}>
        {title}
      </Heading>
      <Box
        sx={{
          ".notion-body": {
            width: "100%",
            p: 0,
          },
        }}
      >
        <NotionRenderer
          recordMap={recordMap}
          fullPage={false}
          bodyClassName="notion-body"
          // mapImageUrl={(url, block) =>
          //   recordMap.signed_urls[block.id]
          //     ? `${recordMap.signed_urls[block.id]}&spaceId=${spaceId}`
          //     : url
          // }
          rootPageId={process.env.NEXT_PUBLIC_ROOT_PAGE_ID}
          components={{
            Code,
          }}
          darkMode={colorMode === "dark"}
          previewImages={true}
        />
      </Box>
      <Comment key={colorMode} />
    </Box>
  );
}
