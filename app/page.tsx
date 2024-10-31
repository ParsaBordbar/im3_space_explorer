"use client";
import Search from "/public/search.svg";
import Header from "./components/Header";
import MainButton from "./components/MainButton";
import SpaceSection from "./components/SpaceSection";
import { useState } from "react";
import Link from "next/link";
import Star from "/public/stars.svg?url";
import Oldest from "/public/oldest.svg?url";
export default function Home() {
  const [search, setSearch] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    console.log("Event value:", event.target.value);
    setSearch(event.target.value);
  };

  return (
    <>
      <Header />
      <main className="grid my-40 w-11/12 lg:w-[75%] gap-10 mx-auto grid-cols-8">
        <section className="flex flex-col col-span-full gap-4">
          <h1 className="text-white font-Nunito text-lg font-bold col-span-full">
            Explore Spaces
          </h1>
          <form className="col-span-full flex md:flex-row flex-col border border-[#7B7B7B] rounded-[11px] items-center gap-2">
            <div className="flex pl-3 items-center p-2 bg-transparent w-full rounded-2xl border border-[#7B7B7B] border-opacity-10">
              <section className="flex  w-full items-center gap-2">
                <Search />
                <input
                  onChange={handleChange}
                  type="string"
                  placeholder="Search your space"
                  className="w-full font-Nunito outline-none text-white bg-transparent"
                />
              </section>
            </div>
            <div className="md:flex hidden px-4 py-2 bg-box-space rounded-[11px] items-center  w-full md:w-fit gap-2">
              <Link
                href={"/filters/newest"}
                className="w-full group md:w-[104px]"
              >
                <MainButton
                  value={"Newest"}
                  mode="simple"
                  iconSrc={Star}
                  className="w-full bg-[#9C9898] group-hover:[&>*]:scale-110  [&>*]:transition-all [&>*]:ease-in-out [&>*]:duration-200 !text-black font-Nunito rounded-lg"
                />
              </Link>
              <Link href={"/filters/oldest"} className="w-full group md:w-[104px]">
                <MainButton
                  value={"Oldest"}
                  mode="simple"
                  iconSrc={Oldest}
                  className="w-full bg-[#9C9898] group-hover:[&>*]:scale-110  [&>*]:transition-all [&>*]:ease-in-out [&>*]:duration-200 !text-black font-Nunito rounded-lg"
                />
              </Link>
            </div>
          </form>
          <div className="flex md:hidden rounded-[11px] items-center self-end w-fit gap-2">
            <Link href={"/filters/newest"} className="w-[78px]">
              <MainButton
                value={"Newest"}
                mode="simple"
                iconSrc={Star}
                className="w-full [&>span]:text-xs [&>img]:h-3 [&>img]:w-3 bg-[#9C9898] !text-black font-Nunito rounded-lg"
              />
            </Link>
            <Link href={"/filters/oldest"} className=" w-[78px]">
              <MainButton
                value={"Oldest"}
                mode="simple"
                iconSrc={Oldest}
                className="w-full  [&>span]:text-xs [&>img]:h-3 [&>img]:w-3 bg-[#9C9898] !text-black font-Nunito rounded-lg"
              />
            </Link>
          </div>
        </section>
        <SpaceSection search={search} />
      </main>
    </>
  );
}
