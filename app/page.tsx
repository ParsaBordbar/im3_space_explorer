import Image from "next/image";
import Logo from "/public/logo.svg";
import Github from "/public/github.svg";
import Discord from "/public/discord.svg";
import X from "/public/x.svg";
import Graph from "/public/graph.svg";
import Search from "/public/search.svg";
import MuonLogo from "/public/muon_logo.svg";
import UnLock from "/public/unlock.svg";
import Members from "/public/profile-2user.svg";
import Link from "next/link";
import SpaceCard from "./components/SpaceCard";
import Header from "./components/Header";
import MainButton from "./components/MainButton";
export default function Home() {
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
                  type="search"
                  placeholder="Search your space"
                  className="w-full outline-none text-white bg-transparent"
                />
              </section>
              <MainButton
                value={"Search"}
                submit
                className="px-4 py-1 rounded-lg"
              />
            </div>
            <MainButton
              value={"Newest"}
              simple
              className="col-span-4 md:col-span-1  rounded-2xl"
            />
            <MainButton
              value={"Oldest"}
              simple
              className="col-span-4 md:col-span-1  rounded-2xl"
            />
          </form>
        </section>
        <div className="grid col-span-full grid-cols-2 gap-4">
          <SpaceCard
            logo_URL={MuonLogo}
            name_space={"Muon Network"}
            members={"20"}
            privateSpace={false}
            className={"md:col-span-1 col-span-full"}
          />
          <SpaceCard
            logo_URL={MuonLogo}
            name_space={"Muon Network"}
            members={"20"}
            privateSpace={false}
            className={"md:col-span-1 col-span-full"}
          />
          <SpaceCard
            logo_URL={MuonLogo}
            name_space={"Muon Network"}
            members={"20"}
            privateSpace={false}
            className={"md:col-span-1 col-span-full"}
          />
          <SpaceCard
            logo_URL={MuonLogo}
            name_space={"Muon Network"}
            members={"20"}
            privateSpace={false}
            className={"md:col-span-1 col-span-full"}
          />
          <SpaceCard
            logo_URL={MuonLogo}
            name_space={"Muon Network"}
            members={"20"}
            privateSpace={false}
            className={"md:col-span-1 col-span-full"}
          />
          <SpaceCard
            logo_URL={MuonLogo}
            name_space={"Muon Network"}
            members={"20"}
            privateSpace={false}
            className={"md:col-span-1 col-span-full"}
          />
          <SpaceCard
            logo_URL={MuonLogo}
            name_space={"Muon Network"}
            members={"20"}
            privateSpace={false}
            className={"md:col-span-1 col-span-full"}
          />
          <SpaceCard
            logo_URL={MuonLogo}
            name_space={"Muon Network"}
            members={"20"}
            privateSpace={false}
            className={"md:col-span-1 col-span-full"}
          />
          <SpaceCard
            logo_URL={MuonLogo}
            name_space={"Muon Network"}
            members={"20"}
            privateSpace={false}
            className={"md:col-span-1 col-span-full"}
          />
          <SpaceCard
            logo_URL={MuonLogo}
            name_space={"Muon Network"}
            members={"20"}
            privateSpace={false}
            className={"md:col-span-1 col-span-full"}
          />
          <SpaceCard
            logo_URL={MuonLogo}
            name_space={"Muon Network"}
            members={"20"}
            privateSpace={false}
            className={"md:col-span-1 col-span-full"}
          />
        </div>
      </main>
    </div>
  );
}
