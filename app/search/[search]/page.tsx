"use client";
import SpaceSection from "@/app/components/SpaceSection";
import SearchBar from "@/app/components/SearchBar";

const SearchingPage = ({ params }: { params: { search: string } }) => {
  return (
    <div className="flex flex-col my-40 w-11/12 lg:w-[75%] mx-auto gap-4 items-start">
      <h1 className="text-white col-span-full text-lg font-bold font-SpaceGrotesk capitalize">
        You are Looking for {params.search}
      </h1>
      <SearchBar filters={false} />
      <SpaceSection search={params.search} />
    </div>
  );
};
export default SearchingPage;
