"use client";
// core styles shared by all of react-notion-x (required)

import "react-notion-x/src/styles.css";

import Comment from "./Comment";
import { ExtendedRecordMap } from "notion-types";
import { NotionRenderer } from "react-notion-x";
import dynamic from "next/dynamic";
import { getPageTitle } from "notion-utils";
import { useTheme } from "next-themes";

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
  const { theme } = useTheme();

  const title = getPageTitle(props);

  return (
    <>
      <div className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-5">
        {title}
      </div>
      <div className="[&_.notion-body]:w-full [&_.notion-body]:p-0">
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
          darkMode={theme === "dark"}
          previewImages={true}
        />
      </div>
      <Comment key={theme} />
    </>
  );
}
