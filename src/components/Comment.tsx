import React, { useCallback } from "react";
import { useTheme } from "next-themes";

const Comment = () => {
  const { theme: colorMode } = useTheme();
  const commentRef = useCallback(
    (node: HTMLDivElement) => {
      const script = document.createElement("script");
      if (node && colorMode) {
        const theme = `github-${colorMode}`;
        const attributes = {
          src: `https://utteranc.es/client.js`,
          repo: "thienphanexcalibur/next-blog",
          ["issue-term"]: "title",
          theme,
          crossorigin: "anonymous",
          async: true,
        };
        for (const [key, value] of Object.entries(attributes)) {
          script.setAttribute(key, value as string);
        }
        node.appendChild(script);
      }
    },
    [colorMode]
  );

  return <div ref={commentRef} id="comment" />;
};

export default Comment;
