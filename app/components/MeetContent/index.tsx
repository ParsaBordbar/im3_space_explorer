"use client";

import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import Loading from "../Loading";
import RankBox from "../RankBox";
import useGetConfigData from "@/hooks/useGetConfig";
import ConvertTimestamp from "../ConvertTimesTamp";
import TopThreeRank from "../TopThreeRank";
import NoiseEffect from "/public/noiseEffect2.svg?url";
import Image from "next/image";
import InfoMiniBox from "../infoMiniBox";

interface Participant {
  name: string;
  joinedAt: number;
  identity: string;
  permission: {
    canSubscribe: boolean;
    canPublish: boolean;
    canPublishData: boolean;
    recorder: boolean;
  };
}

interface MeetData {
  participants: Participant[];
  fetchedAt: number;
}

const MeetContent = ({ params, title }: { params: string; title: string }) => {
  const [dataMeet, setDataMeet] = useState<MeetData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleFetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await useGetConfigData(
        `participants/stored-participants/${params}`
      );
      setDataMeet(result);
    } catch (err) {
      setError("Failed to fetch participants.");
    } finally {
      setLoading(false);
    }
  };

  const useDebouncedEffect = (
    callback: () => void,
    delay: number,
    deps: any[]
  ) => {
    useEffect(() => {
      const handler = setTimeout(callback, delay);
      return () => clearTimeout(handler);
    }, [...deps]);
  };

  useDebouncedEffect(
    () => {
      handleFetchData();
    },
    300,
    [params]
  );

  const showInformationMeet = useCallback(() => {
    if (!dataMeet) return null;

    const topThree = dataMeet.participants.slice(0, 3);
    return (
      <div className="grid grid-cols-10 mb-12 gap-4 gap-y-14">
        <InfoMiniBox
          className="col-span-full md:col-span-3"
          title={dataMeet.participants.length}
          desc="Total participants"
        />
        {topThree.map((participant, idx) => (
          <TopThreeRank
            key={idx}
            joinedAt={participant.joinedAt}
            name={participant.name}
            medal={"gold"}
            className={`col-span-full md:col-span-${idx === 0 ? 7 : 5}`}
            identity={participant.identity}
            meet={{ slug: params }}
          />
        ))}
      </div>
    );
  }, [dataMeet, params]);

  const leaderBoard = useMemo(() => {
    console.log(dataMeet); // Debugging log

    if (!dataMeet) return null; // Handle the case where data is not available
    const participants = dataMeet.participants.slice(3); // Exclude the top 3 participants

    // Map over the remaining participants to generate the leaderboard
    return (
      <>
        {participants.map((data, index) => {
          return (
            <div key={index}>
              <RankBox
                user={{
                  rank: index + 4,
                  name: data.name.split("-")[0],
                  joinedAt: data.joinedAt,
                  identity: data.identity,
                }}
                permission={data.permission}
                meet={{ slug: params }}
              />
            </div>
          );
        })}
      </>
    );
  }, [dataMeet]);

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
        <section className="bg-box-space relative z-0 rounded-xl p-4">
          <Image
            className="absolute object-cover h-full w-full -z-10 bottom-0 top-0 left-0"
            width={5000}
            height={5000}
            src={NoiseEffect}
            alt=""
          />
          <ul className="flex overflow-auto h-[580px] scrollable flex-col gap-6">{leaderBoard}</ul>
        </section>
      </>
    );
  }, [dataMeet, leaderBoard, showInformationMeet, title]);

  if (loading) return <Loading />;
  if (error) return <div>{error}</div>;

  return <div className="flex flex-col gap-10 my-20">{informationsSlug}</div>;
};

export default memo(MeetContent);
