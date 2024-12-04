"use client";
import Search from "/public/search.svg";
import Header from "./components/Header";
import MainButton from "./components/MainButton";
import SpaceSection from "./components/SpaceSection";
import { useEffect, useLayoutEffect, useState } from "react";
import Link from "next/link";
import Star from "/public/stars.svg?url";
import Oldest from "/public/oldest.svg?url";
import { useRouter } from "next/navigation";
import SearchBar from "./components/SearchBar";
export default function Home() {
  const [search, setSearch] = useState<string>("");
  const { push } = useRouter();

  const handleDataFromChild = (data: string) => {
    setSearch(data);
  };
  return (
    <>
      <Header />
      <main className="grid my-40 w-11/12 lg:w-[75%] gap-10 mx-auto grid-cols-8">
        <section className="flex flex-col col-span-full gap-4">
          <h1 className="text-white font-Nunito text-lg font-bold col-span-full">
            Explore Spaces
          </h1>
          <SearchBar filters sendDataToParent={handleDataFromChild} />
        </section>
        <SpaceSection search={search ?? ' '} />
      </main>
    </>
  );
}
