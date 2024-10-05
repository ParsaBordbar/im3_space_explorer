import clipboardCopy from "clipboard-copy";
import { useEffect, useState } from "react";

const useCopyToClipboard = (url: string, isClick: boolean) => {
  const [isCopied, setCopied] = useState(false);

  useEffect(() => {
    if (isClick) {
      clipboardCopy(url)
        .then(() => {
          console.log("copied");
          setCopied(true);
        })
        .catch((err: any) => {
          setCopied(false);
          console.error("Failed to copy:", err);
        });
    }
  }, [isClick, url]);

  return { isCopied, url, setCopied };
};

export { useCopyToClipboard };
