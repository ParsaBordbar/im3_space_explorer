import ConvertTimestamp from "../ConvertTimesTamp";
import { memo, useMemo } from "react";
import GoldMedal from "/public/gold-medal.svg";
import SilverMedal from "/public/silver-medal.svg";
import BronzeMedal from "/public/bronze-medal.svg";
import Image from "next/image";
import NoiseEffect from "/public/noiseEffect2.svg?url";
import Loading from "../Loading";

const TopThreeRank = ({
  name,
  joinedAt,
  medal,
  className,
  identity,
  meet,
}: {
  name: string;
  joinedAt: string | number;
  meet: { slug: string };
  medal: "gold" | "silver" | "bronze";
  className: string;
  identity: string;
}) => {
  //calling the this hook to find out is admin or not

  const validName = useMemo(() => {
    return name.split("-")[0];
  }, []);
  const showMedal = useMemo(() => {
    return medal == "gold" ? (
      <GoldMedal className="absolute top-0 z-10 right-0 w-32 h-32" />
    ) : medal == "silver" ? (
      <SilverMedal className="absolute top-0 z-10 right-0 w-32 h-32" />
    ) : (
      <BronzeMedal className="absolute top-0 z-10 right-0 w-32 h-32" />
    );
  }, []);

  return (
    <div
      className={`${className} [&>p]:max-md:text-sm bg-box-space relative flex z-0 flex-col gap-2 rounded-xl  p-4`}
    >
      <Image
        className="absolute object-cover h-full w-full  z-10 bottom-0 top-0 left-0 "
        width={5000}
        height={5000}
        src={NoiseEffect}
        alt=""
      />
      {showMedal}
      <h1 className="text-white font-SpaceGrotesk w-[63%] text-ellipsis overflow-hidden whitespace-nowrap text-xl">
        {validName}
      </h1>
      <ConvertTimestamp time={String(joinedAt)} />
    </div>
  );
};

export default TopThreeRank;
