import Image from "next/image";
import MuonLogo from "/public/muon_logo.svg";
import UnLock from "/public/unlock.svg";
import Lock from "/public/lock.svg";
import Members from "/public/profile-2user.svg";
import { Component } from "react";
import { SpaceCardProps } from "@/app/types";
import DetailMiniBox from "../DetailMiniBox";
import Link from "next/link";

const SpaceCard = ({
  className,
  logo_URL,
  name_space,
  members,
  slug,
  privateSpace,
}: SpaceCardProps) => {
  return (
    <Link
      href={'/muon'}
      className={`${className} hover:bg-[#2a2a2a] cursor-pointer bg-[#1E1E1E] rounded-2xl flex items-start gap-4 p-4`}
    >
      <Image src={logo_URL} width={80} height={80} alt="logo_space" />
      <div className="flex flex-col justify-between gap-2">
        <section className="flex items-center gap-1">
          <Image
            title={`${privateSpace ? "Public" : "Private"}`}
            src={privateSpace ? Lock : UnLock}
            width={16}
            className=""
            height={16}
            alt={privateSpace ? "public" : "Private"}
          />
          <h1 className="text-white overflow-clip whitespace-nowrap w-32 font-bold text-lg">
            {name_space}
          </h1>
        </section>
        <ul className="grid grid-cols-3 gap-4">
          <DetailMiniBox
            className="col-span-1"
            value={members}
            icon={Members}
            title={"max_member"}
          />
        </ul>
      </div>
    </Link>
  );
};

export default SpaceCard;
