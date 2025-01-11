import Link from "next/link";
import React from "react";

interface TabProps {
  tabName: string;
  className?: string;
  link: string;
}

const Tab = ({ tabName, className, link }: TabProps) => {
  return (
    <Link
      href={`${link}`}
      className={`${className} text-white cursor-pointer max-sm:text-base !rounded-[11px] bg-[#5b5b5d3e] transition-all ease-in-out duration-200 font-Nunito text-lg font-bold py-2 px-4 `}
    >
      {tabName}
    </Link>
  );
};

export default Tab;
