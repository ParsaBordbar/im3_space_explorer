"use client";

import { memo, useCallback, useEffect, useMemo, useState } from "react";
import Loading from "../Loading";
import RankBox from "../RankBox";
import GetConfigData from "@/hooks/useGetConfig";
import ConvertTimestamp from "../ConvertTimesTamp";
import TopThreeRank from "../TopThreeRank";
import NoiseEffect from "/public/noiseEffect2.svg?url";
import Image from "next/image";
import InfoMiniBox from "../infoMiniBox";
import { MeetData, RoomStructure } from "@/app/types";

const MeetContent = ({ params, title }: { params: string; title: string }) => {
  const [dataMeet, setDataMeet] = useState<MeetData | null>(null);
  const [meet, setMeet] = useState<RoomStructure>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleFetchData = async () => {
      try {
        const result = await GetConfigData(
          `participants/stored-participants/${params}`
        );
        setDataMeet(result);
      } catch (err) {
        setError("Failed to fetch participants." + err);
      } finally {
      }
    };

    const handleFetchDataMeet = async () => {
      setLoading(true); // Start loading
      try {
        const result = await GetConfigData(
          `/rooms/get-collected-data/room?name=${params}`
        );
        console.log(result);
        setMeet(result);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false); // End loading
      }
    };
    handleFetchData();
    handleFetchDataMeet();
  }, [params]);

  const showInformationMeet = useCallback(() => {
    if (!dataMeet) return null;

    const topThree = dataMeet.participants.slice(0, 3);
    return (
      <div className="grid grid-cols-10 mb-12 gap-4 gap-y-14">
        <InfoMiniBox
          className={`col-span-full ${
            !!meet ? "md:col-span-5" : "md:col-span-3"
          }`}
          title={dataMeet.participants.length}
          desc="Total participants"
        />
        {!!meet && (
          <InfoMiniBox
            className="col-span-full md:col-span-5"
            title={meet?.count}
            desc="Number created"
            link={`/${params}/meets`}
          />
        )}
        {topThree.map((participant, index) => (
          <TopThreeRank
            key={index}
            joinedAt={participant.joinedAt}
            name={participant.name}
            medal={index == 0 ? "gold" : index == 1 ? "silver" : "bronze"}
            className={`col-span-full ${
              index == 0 && !meet ? "md:col-span-7" : "md:col-span-full"
            }  ${index > 0 && "md:!col-span-5"}`}
            meet={{ slug: params }}
          />
        ))}
      </div>
    );
  }, [dataMeet, meet, params]);

  const leaderBoardAllMeet = useMemo(() => {
    if (!dataMeet || dataMeet.participants.slice(3).length == 0) return null; // Handle the case where data is not available
    const participants = dataMeet.participants.slice(3); // Exclude the top 3 participants
    // Map over the remaining participants to generate the leaderboardAllMeet
    return (
      <>
        {participants.map((data, index) => {
          return (
            <div key={index}>
              <RankBox
                meet={{ slug: params }}
                user={{
                  rank: index + 3,
                  name: data.name.split("-")[0],
                  joinedAt: data.joinedAt,
                  identity: data.identity,
                }}
                permission={data.permission}
                options={{ isRank: true, infoBox: false }}
              />
            </div>
          );
        })}
      </>
    );
  }, [dataMeet, params]);

  const informationsSlug = useMemo(() => {
    if (!dataMeet) return null;
    return (
      <>
        <section className="flex max-md:flex-col md:items-center justify-between gap-1">
          <h1 className="text-white font-SpaceGrotesk text-4xl md:text-5xl">
            {title}
          </h1>
          <ConvertTimestamp
            className="text-base md:!text-lg md:self-end"
            time={dataMeet.fetchedAt}
          />
        </section>
        {showInformationMeet()}
        {leaderBoardAllMeet && (
          <section className="bg-[#5b5b5d3e]  relative z-0 rounded-xl p-4">
            <Image
              className="absolute object-cover h-full w-full -z-10 bottom-0 top-0 left-0"
              width={5000}
              height={5000}
              src={NoiseEffect}
              alt=""
            />
            <ul className="flex overflow-auto h-[580px] scrollable flex-col gap-2">
              {leaderBoardAllMeet}
            </ul>
          </section>
        )}
      </>
    );
  }, [dataMeet, leaderBoardAllMeet, showInformationMeet, title]);

  if (loading) return <Loading />;
  if (error) return <div>{error}</div>;

  return <div className="flex flex-col gap-10 my-20">{informationsSlug}</div>;
};

export default memo(MeetContent);
