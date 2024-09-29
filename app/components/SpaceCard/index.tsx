import Image from "next/image";
import MuonLogo from "/public/muon_logo.svg";
import UnLock from "/public/unlock.svg";
import Lock from "/public/lock.svg";
import Members from "/public/profile-2user.svg";
import { Component } from "react";

type SpaceCardProps = {
  className: string;
  logo_URL: any;
  name_space: string;
  members: string;
  privateSpace: boolean;
};

const SpaceCard = ({
  className,
  logo_URL,
  name_space,
  members,
  privateSpace,
}: SpaceCardProps) => {
  return (
    <div
      className={`${className} bg-[#1E1E1E] rounded-2xl flex items-start gap-4 p-4`}
    >
      <Image src={logo_URL} width={80} height={80} alt="logo_space" />
      <div className="flex flex-col justify-between gap-2">
        <section className="flex items-center gap-2">
          <Image
            src={privateSpace ? Lock : UnLock}
            width={16}
            className=""
            height={16}
            alt={privateSpace ? "public" : "Private"}
          />
          <h1 className="text-white overflow-clip whitespace-nowrap w-32 font-bold text-lg">{name_space}</h1>
        </section>
        <ul className="grid grid-cols-3 gap-4">
          <li className="flex items-center col-span-1 bg-[#373737] rounded-lg px-1 py-0.5 gap-1">
            <Image src={Members} width={14} height={14} alt="members" />
            <p className="text-white">{members}</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SpaceCard;
