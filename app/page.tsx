"use client";
import Image from "next/image";
import Search from "/public/search.svg";
import Header from "./components/Header";
import MainButton from "./components/MainButton";
import SpaceSection from "./components/SpaceSection";
import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [search, setSearch] = useState();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Event value:", event.target.value);
    setSearch(event.target.value);
  };

  return (
    <div>
      <Header />
      <main className="grid my-10 w-11/12 md:w-[75%] gap-10 mx-auto grid-cols-8">
        <section className="flex flex-col col-span-full gap-4">
          <h1 className="text-white text-lg font-bold col-span-full">
            Explore Spaces
          </h1>
          <form action="" className="col-span-full grid grid-cols-8 gap-2">
            <div className="flex pl-3 items-center p-2 bg-[#1E1E1E] col-span-full md:col-span-6 rounded-2xl border border-[#ffffff] border-opacity-10">
              <section className="flex  w-full items-center gap-4">
                <Image src={Search} height={24} width={24} alt="search" />
                <input
                  onChange={handleChange}
                  type="search"
                  placeholder="Search your space"
                  className="w-full outline-none text-white bg-transparent"
                />
              </section>
            </div>
            <Link href={'/filters/newest'} className="col-span-4 md:col-span-1">
              <MainButton
                value={"Newest"}
                simple
                className="w-full rounded-2xl"
              />
            </Link>
            <Link href={'/filters/oldest'} className="col-span-4 md:col-span-1">
              <MainButton
                value={"Oldest"}
                simple
                className="w-full rounded-2xl"
              />
            </Link>
          </form>
        </section>
          <SpaceSection search={search}/>
      </main>
    </div>
  );
}
