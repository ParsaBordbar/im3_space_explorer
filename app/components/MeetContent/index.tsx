"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import Loading from "../Loading";
import RankBox from "../RankBox";
import useGetConfigData from "@/hooks/useGetConfig";
import ConvertTimestamp from "../ConvertTimesTamp";
import TopThreeRank from "../TopThreeRank";
import NoiseEffect from "/public/noiseEffect2.svg?url";
import Image from "next/image";
import InfoMiniBox from "../infoMiniBox";
import { AdminData } from "@/app/types";

const MeetContent = ({ params, title }: { params: string; title: string }) => {
  const [dataMeet, setDataMeet] = useState<any>();

  //get the stored pariticipants of the specific room
  const { configData, isLoading } = useGetConfigData(
    `participants/stored-participants/${params}`
  );

  http: useEffect(() => {
    setDataMeet(configData);
  }, [configData]);

  //

  // get admins data for the specific room
  const admins = useGetConfigData(`admin/admins/sort?sort=room&room=${params}`);
  const isAdmin = useMemo(() => {
    return (
      Array.isArray(admins.configData) &&
      admins.configData.map((admin: AdminData) => {
        return admin.identity; // return the identity if admins
      })
    );
  }, [admins]);

  const leaderBoard = useCallback(() => {
    return (
      dataMeet &&
      [...dataMeet.participants]
        .reverse()
        .slice(3) // get the data of the participents just after 3 first data
        .map((data: any, index: number) => {
          const findName = data.name.split("-")[0];
          return (
            <>
              <RankBox
                user={{
                  rank: index + 3,
                  name: findName,
                  joinedAt: +data.joinedAt,
                  isAdmin: data.identity == isAdmin, // particiapant is admin or not base on identity
                }}
                permission={{
                  canSubscribe: data.permission.canSubscribe,
                  canPublish: data.permission.canPublish,
                  canPublishData: data.permission.canPublishData,
                  recorder: data.permission.recorder,
                }}
              />
            </>
          );
        })
    );
  }, [dataMeet, admins]);

  const informationsSlug = useCallback(() => {
    if (!dataMeet) return null;
    return !isLoading ? (
      <>
        <section className="flex max-md:flex-col md:items-center justify-between gap-1">
          <h1 className="text-white font-SpaceGrotesk text-4xl md:text-5xl">
            {title}
          </h1>
          <ConvertTimestamp
            className="text-base md:!text-lg md:self-end"
            time={dataMeet && dataMeet.fetchedAt}
          />
        </section>
        <div className="grid grid-cols-10 mb-12 gap-4 gap-y-14">
          <InfoMiniBox
            className="col-span-full md:col-span-3"
            title={dataMeet.participants.length}
            desc="Total participants"
          />
          <TopThreeRank
            joinedAt={dataMeet.participants.slice(-1)[0].joinedAt}
            name={dataMeet.participants.slice(-1)[0].name}
            medal={"gold"}
            className={"col-span-full md:col-span-7 "}
          />
          <TopThreeRank
            joinedAt={dataMeet.participants.slice(-2)[0].joinedAt}
            name={dataMeet.participants.slice(-2)[0].name}
            medal={"silver"}
            className={"col-span-full md:col-span-5"}
          />
          <TopThreeRank
            joinedAt={dataMeet.participants.slice(-3)[0].joinedAt}
            name={dataMeet.participants.slice(-3)[0].name}
            medal={"bronze"}
            className={"col-span-full md:col-span-5"}
          />
        </div>
        <section className="bg-box-space relative z-0 rounded-xl p-4">
          <Image
            className="absolute object-cover h-full w-full  -z-10 bottom-0 top-0 left-0 "
            width={5000}
            height={5000}
            src={NoiseEffect}
            alt=""
          />
          <ul className="flex flex-col gap-6">
            {leaderBoard() ?? (
              <p className="text-white font-SpaceGrotesk">
                There is no {title}!
              </p>
            )}
          </ul>
        </section>
      </>
    ) : (
      <Loading />
    );
  }, [dataMeet, isLoading]);
  return (
    <>
      <div className="flex flex-col gap-10 my-20">{informationsSlug()}</div>
    </>
  );
};

export default MeetContent;
