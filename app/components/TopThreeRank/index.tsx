import ConvertTimestamp from "../ConvertTimesTamp";
import { useMemo } from "react";
import GoldMedal from "/public/gold-medal-number.svg";
import SilverMedal from "/public/silver-medal-number.svg";
import BronzeMedal from "/public/bronze-medal-number.svg";
import Star from "/public/star.svg";
import Image from "next/image";
import NoiseEffect from "/public/noiseEffect2.svg?url";

const TopThreeRank = ({
  name,
  joinedAt,
  medal,
  className,
  count,
  countParticipants,
}: {
  name: string;
  count?: number;
  countParticipants?: number;
  joinedAt?: string | number;
  meet: { slug: string };
  medal: "gold" | "silver" | "bronze";
  className: string;
}) => {
  const validName = useMemo(() => {
    return name.split("-")[0];
  }, [name]);
  const showMedal = useMemo(() => {
    return medal == "gold" ? (
      <GoldMedal className="absolute -top-1.5 z-10 right-0 w-32 h-32" />
    ) : medal == "silver" ? (
      <SilverMedal className="absolute -top-1.5 z-10 right-0 w-32 h-32" />
    ) : (
      <BronzeMedal className="absolute -top-1.5 z-10 right-0 w-32 h-32" />
    );
  }, [medal]);

  const styles = useMemo(() => {
    if (medal == "gold")
      return "hover:border-[#ffce31] hover:border-opacity-50";
    if (medal == "silver")
      return "hover:border-[#b2c1c0] hover:border-opacity-50";
    if (medal == "bronze")
      return "hover:border-[#d3976e] hover:border-opacity-50";
  }, [medal]);

  return (
    <div
      className={`${className} ${styles} border-2 border-transparent transition-all ease-in-out duration-200 [&>p]:max-md:text-sm bg-[#5b5b5d3e]  relative flex z-0 flex-col gap-2 rounded-xl  p-4`}
    >
      <Image
        className="absolute object-cover h-full w-full  -z-10 bottom-0 top-0 left-0 "
        width={5000}
        height={5000}
        src={NoiseEffect}
        alt=""
      />
      {showMedal}
      <h1 className="text-white font-SpaceGrotesk w-[63%] text-ellipsis overflow-hidden whitespace-nowrap text-xl">
        {validName}
      </h1>
      {count && countParticipants && (
        <section
          title="point"
          className="bg-[#5b5b5d3e] flex items-center gap-2 [&_p]:text-white font-SpaceGrotesk text-lg w-fit p-1.5 rounded-lg"
        >
          <Star className="size-6" />
          <p>{countParticipants * count}</p>
        </section>
      )}
      {joinedAt && <ConvertTimestamp time={String(joinedAt)} />}
      {countParticipants && (
        <p className="text-white font-SpaceGrotesk">
          <span>{countParticipants}</span> Total Participants
        </p>
      )}
      {count && (
        <p className="text-white font-SpaceGrotesk">
          <span>{count}</span> Number Created
        </p>
      )}
    </div>
  );
};

export default TopThreeRank;
