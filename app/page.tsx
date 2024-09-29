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
export default function Home() {
  return (
    <div>
      <header className="relative  w-full  flex-col justify-center">
        <section className=" bg-[#121212] w-full p-8 flex items-center justify-between">
          <Image src={Logo} width={100} height={26} alt="logo" />
          <ul className="flex items-center gap-4">
            <Link href={"https://x.com/IM3_live"}>
              <Image src={X} width={24} height={24} alt="X" />
            </Link>
            {/* <li>
              <Image src={Discord} width={32} height={32} alt="discord" />
            </li> */}
            <Link href={"https://github.com/Im3-protocol"}>
              <Image src={Github} width={24} height={24} alt="Github" />
            </Link>
          </ul>
        </section>
        <h1 className="text-white absolute left-[10%] md:left-[13%] md:top-[30%] text-2xl md:text-5xl font-bold">
          Spacehall
        </h1>
        <Image src={Graph} width={5000} height={1000} className="object-cover" alt="graph" />
      </header>
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
                  type="text"
                  placeholder="Search your space"
                  className="w-full bg-transparent"
                />
              </section>
              <button className="px-4 py-1 bg-black rounded-lg text-white">
                Search
              </button>
            </div>
            <button className="text-white py-4 col-span-4 md:col-span-1 text-center bg-[#1e1e1e] rounded-2xl border border-[#ffffff] border-opacity-10">
              Newest
            </button>
            <button className="text-white py-4 col-span-4 md:col-span-1 text-center bg-[#1e1e1e] rounded-2xl border border-[#ffffff] border-opacity-10">
              Oldest
            </button>
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
