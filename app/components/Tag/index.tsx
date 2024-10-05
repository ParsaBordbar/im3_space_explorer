import { TagType } from "@/app/types";
import Link from "next/link";
import React from "react";

function Tag({ tag }: TagType) {
  return (
    <Link href={`/tags/${tag}`}>
      <li
        className={`text-xs w-fit text-white hover:underline underline-offset-4`}
      >
        #{tag}
      </li>
    </Link>
  );
}

export default Tag;
