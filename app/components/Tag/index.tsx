import { TagType } from "@/app/types";
import Link from "next/link";
import React from "react";

function Tag({ tag }: TagType) {
  return (
    <Link href={`/tags/${tag}`}>
      <li
        className={`text-sm w-fit hover:underline underline-offset-4 text-[#918f8f]`}
      >
        #{tag}
      </li>
    </Link>
  );
}

export default Tag;
