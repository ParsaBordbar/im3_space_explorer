"use client";
import Image from "next/image";
import MuonLogo from "/public/muon_logo.svg";
import MainButton from "@/app/components/MainButton";
import Lock from "/public/unlock.svg";
import Members from "/public/profile-2user.svg";
import DetailMiniBox from "@/app/components/DetailMiniBox";
import X from "/public/x.svg";
import Discord from "/public/discord.svg";
import Github from "/public/github.svg";
import SocialInfo from "@/app/components/SocialInfo";
const ExploreSpace = ({ params }: { params: string }) => {
  console.log(params); // {slug : "muon"}
  return (
    <>
      <div className="flex justify-between items-start">
        <div className="flex md:flex-row flex-col w-full  items-center gap-9 md:w-fit">
          <Image className="md:inline-block hidden" src={MuonLogo} width={96} height={96} alt="logo" />
          <Image className="md:hidden" src={MuonLogo} width={180} height={96} alt="logo" />
          <section className="flex flex-col gap-2 self-start">
            <div className="flex flex-wrap items-center gap-2">
              <Image className="md:hidden" src={Lock} width={16} height={16} alt="" title="private"/>
              <span className="text-white font-bold text-2xl md:text-4xl">
                Muon Network
              </span>
              <MainButton
                className="rounded-2xl md:flex hidden py-3 px-4"
                iconSrc={Lock}
                freez
                value={"Public"}
              />
            </div>
            <ul>
              <DetailMiniBox
                title="max_member"
                className="w-fit"
                value="20"
                icon={Members}
              />
            </ul>
          </section>
        </div>
        <MainButton pro className="py-3 md:static fixed z-20 md:bottom-auto md:left-auto md:w-auto w-full left-0 bottom-0  px-4 md:rounded-2xl" value={"Join Room"} />
      </div>
      <p className="mt-6 text-white">
        Decentralize all Off-Chain Components of your dApp
      </p>
      <ul className="flex flex-wrap items-center gap-3 mt-3">
        <SocialInfo
          width={16}
          height={16}
          icon={X}
          value="x.com/muon_net"
          link={"https://x.com/muon_net"}
          title={"X"}
        />
        <SocialInfo
          width={24}
          height={24}
          icon={Discord}
          value="discord.com/Muon"
          link={"https://discord.com/invite/rcK4p8g7Ce"}
          title={"Discord"}
        />
        <SocialInfo
          width={16}
          height={16}
          icon={Github}
          value="github.com/muon-protocol"
          link={"https://github.com/muon-protocol"}
          title={"Github"}
        />
        <SocialInfo
          width={16}
          height={16}
          icon={MuonLogo}
          value="www.muon.net"
          link={"https://www.muon.net/"}
          title={"Muon"}
        />
      </ul>
    </>
  );
};

export default ExploreSpace;
