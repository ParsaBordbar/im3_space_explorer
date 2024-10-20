import { TagType } from "@/app/types";
import Link from "next/link";
import React from "react";

function Tag({ tag }: TagType) {
  return (
    <Link href={`/tags/${tag}`}>
      <li
        className={`text-xs w-fit font-Nunito hover:underline underline-offset-4 opacity-70 text-[#F4F4F4]`}
      >
        #{tag}
      </li>
    </Link>
  );
}

export default Tag;
