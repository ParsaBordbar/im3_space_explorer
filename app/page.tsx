"use client";
import Header from "./components/Header";
import SpaceSection from "./components/SpaceSection";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import SearchBar from "./components/SearchBar";
import Tab from "./components/Tab";
import Tabs from "./components/Tabs";
import LeaderBoard from "./components/LeaderBoard";
import InfoMiniBox from "./components/infoMiniBox";
import Image from "next/image";
import NoiseEffect from "/public/noiseEffect.svg?url";
import NoiseEffect3 from "/public/noiseEffect3.svg?url";
import NavBar from "./components/Navbar";
export default function Home() {
  const [data, setData] = useState({ count: "", maxParticipants: 0 });
  const [search, setSearch] = useState<string>("");
  const handleDataFromChild = (data: string) => {
    setSearch(data);
  };

  const handleDataFromLeaderBoard = (
    count: string,
    maxParticipants: number
  ) => {
    setData({ count, maxParticipants });
  };

  const informationsMeets = useMemo(() => {
    return (
      data.count &&
      data.maxParticipants && (
        <div className="flex items-center max-sm:flex-col gap-4">
          <InfoMiniBox
            title={data.count}
            desc={"The total number of held meetings"}
            className={
              "[&>h1]:!text-4xl [&>section>p]:max-md:!text-sm [&>h1]:md:!text-7xl"
            }
          />
          <InfoMiniBox
            title={data.maxParticipants}
            desc={"The total number of particapants"}
            className={
              "[&>h1]:!text-4xl [&>section>p]:max-md:!text-sm [&>h1]:md:!text-7xl"
            }
          />
        </div>
      )
    );
  }, [data]);

  return (
    <>
      <header className="relative  w-full h-[170px]  flex-col justify-center">
        <Image
          className="object-cover max-md:hidden left-0 right-0 top-0 w-full -z-10 absolute"
          src={NoiseEffect}
          width={5000}
          height={1}
          alt=""
        />
        <Image
          className="object-cover md:hidden left-0 right-0 top-0 w-full -z-10 absolute"
          src={NoiseEffect3}
          width={5000}
          height={1}
          alt=""
        />
        <NavBar />
        <section className="absolute flex-wrap gap-6 left-[4%] max-sm:w-[92%] flex items-center justify-between right-40 w-[75%] lg:w-9/12 md:left-[12%] top-[100%] md:top-[90%]">
          <h1 className="font-SpaceGrotesk text-white  text-5xl md:text-6xl font-bold">
            Spacehall
          </h1>
          {informationsMeets}
        </section>
      </header>
      <main className={`grid w-11/12 md:w-[75%] gap-10 mx-auto grid-cols-8`}>
        <Tabs
          className={`col-span-full ${
            data.count && data.maxParticipants ? "my-80 lg:my-48" : "my-40"
          }  space-y-4`}
        >
          <Tab className="flex flex-col mt-14 gap-4" title="Explore Spaces">
            <SearchBar filters sendDataToParent={handleDataFromChild} />
            <SpaceSection search={search ?? " "} />
          </Tab>
          <Tab title="Leader Board">
            <LeaderBoard onSendData={handleDataFromLeaderBoard} />
          </Tab>
        </Tabs>
      </main>
    </>
  );
}
