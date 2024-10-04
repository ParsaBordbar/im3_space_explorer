import { TagType } from '@/app/types'
import Link from 'next/link'
import React from 'react'

function Tag({tag}: TagType) {
  return (
    <Link href={`/${tag}`}>
        <li className="flex col-span-1 text-xs p-1.5 w-full text-white bg-[#373737] mx-2 my-.5 justify-center items-center rounded-lg">
        {tag}
        </li>
    </Link>
  )
}

export default Tag