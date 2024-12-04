"use client";
import Link from "next/link";
import MainButton from "../MainButton";
import Search from "/public/search.svg";
import Star from "/public/stars.svg?url";
import Oldest from "/public/oldest.svg?url";
import { useState } from "react";
import { TSearch } from "@/app/types";
import { useRouter } from "next/navigation";
import useSearch from "@/hooks/useSearch";

const SearchBar = (props: TSearch) => {
  const [search, setSearch] = useState<string>("");
  const { handleSubmit, register } = useSearch();
  const { push } = useRouter();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    console.log("Event value:", event.target.value);
    sendData(event.target.value);
    setSearch(event.target.value);
  };

  const sendData = (data: string) => {
    props.sendDataToParent && props.sendDataToParent(data);
  };

  return (
    <form
      onSubmit={handleSubmit(() => {
        console.log("this is searc=h", search);
        search != "" && push(`/search/${search}`);
      })}
      className="col-span-full w-full flex md:flex-row flex-col border border-[#7B7B7B] rounded-[11px] items-center gap-2"
    >
      <div className="flex pl-3 items-center p-2 bg-transparent w-full rounded-2xl border border-[#7B7B7B] border-opacity-10">
        <section className="flex  w-full items-center gap-2">
          <Search />
          <input
            {...register("search")}
            onChange={handleChange}
            type="string"
            placeholder="Search your space"
            className="w-full font-Nunito outline-none text-white bg-transparent"
          />
        </section>
      </div>
      <button type="submit" className={"hidden text-white"}>
        link search
      </button>
      {props.filters && (
        <div className="md:flex hidden px-4 py-2 bg-box-space rounded-[11px] items-center  w-full md:w-fit gap-2">
          <Link href={"/filters/newest"} className="w-full group md:w-[104px]">
            <MainButton
              value={"Newest"}
              mode="simple"
              iconSrc={Star}
              className="w-full bg-[#9C9898] transition-all duration-300 ease-in-out group-hover:[&>*]:scale-110  [&>*]:transition-all [&>*]:ease-in-out [&>*]:duration-200 !text-black font-Nunito rounded-lg"
            />
          </Link>
          <Link href={"/filters/oldest"} className="w-full group md:w-[104px]">
            <MainButton
              value={"Oldest"}
              mode="simple"
              iconSrc={Oldest}
              className="w-full bg-[#9C9898] transition-all duration-300 ease-in-out group-hover:[&>*]:scale-110  [&>*]:transition-all [&>*]:ease-in-out [&>*]:duration-200 !text-black font-Nunito rounded-lg"
            />
          </Link>
        </div>
      )}
    </form>
  );
};

export default SearchBar;
