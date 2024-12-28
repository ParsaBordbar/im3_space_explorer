"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import Loading from "../Loading";
import RankBox from "../RankBox";
import useGetConfigData from "@/hooks/useGetConfig";
import Image from "next/image";
import NoiseEffect from "/public/noiseEffect2.svg?url";
import { AdminData } from "@/app/types";

const LiveMeet = ({ params, title }: { params: string; title: string }) => {
  const [dataMeet, setDataMeet] = useState<any>();
  console.log(params);
  //get the data of live participants in specific room
  const { configData, error, isLoading } = useGetConfigData(
    `/participants/list-participants?room=${params}`
  );

  http: useEffect(() => {
    if (Array.isArray(configData)) {
      setDataMeet(configData);
    }
  }, [configData]);

  const admins = useGetConfigData(`admin/admins/sort?sort=room&room=${params}`);
  const isAdmin = useMemo(() => {
    return (
      Array.isArray(admins.configData) &&
      admins.configData.map((admin: AdminData) => {
        return admin.identity; // return the identity if admins
      })
    );
  }, [admins]);

  //showing the leader board
  const leaderBoard = useCallback(() => {
    return (
      dataMeet &&
      [...dataMeet].reverse().map((data: any, index: number) => {
        const findName = data.name.split("-")[0];
        return (
          dataMeet && (
            <>
              <RankBox
                user={{
                  rank: index,
                  name: findName,
                  joinedAt: +data.joinedAt,
                  isAdmin: data.isAdmin == isAdmin, // particiapant is admin or not base on identity
                }}
                permission={{
                  canSubscribe: data.permission.canSubscribe,
                  canPublish: data.permission.canPublish,
                  canPublishData: data.permission.canPublishData,
                  recorder: data.permission.recorder,
                }}
              />
            </>
          )
        );
      })
    );
  }, [dataMeet]);

  const informationsSlug = useCallback(() => {
    if (isLoading) return <Loading />; // loading animations
    if (!dataMeet || (dataMeet.length == 0 && isLoading)) return null; // if there is not any data don't show anything

    return (
      dataMeet && (
        <>
          <section className="flex items-center justify-between gap-4">
            <section className="flex items-center gap-2">
              <div className="recording-circle"></div>
              <h1 className="text-white font-SpaceGrotesk text-4xl md:text-5xl">
                {title}
              </h1>
            </section>
          </section>
          <section className="bg-box-space relative z-0 rounded-lg p-4">
            <Image
              className="absolute object-cover h-full w-full  -z-10 bottom-0 top-0 left-0 "
              width={5000}
              height={5000}
              src={NoiseEffect}
              alt=""
            />
            <ul className="flex flex-col gap-6">{leaderBoard()}</ul>
          </section>
        </>
      )
    );
  }, [dataMeet, isLoading]);

  return (
    <>
      <div className="flex flex-col gap-10 mt-20">{informationsSlug()}</div>
    </>
  );
};

export default LiveMeet;
