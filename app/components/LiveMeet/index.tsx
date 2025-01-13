"use client";
import { memo, useCallback, useEffect, useState } from "react";
import RankBox from "../RankBox";
import GetConfigData from "@/hooks/useGetConfig";
import Image from "next/image";
import NoiseEffect from "/public/noiseEffect2.svg?url";
import { Participant } from "@/app/types";
import Loading from "../Loading";

const LiveMeet = ({ params, title }: { params: string; title: string }) => {
  const [dataMeet, setDataMeet] = useState<Participant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  console.log(params);
  //get the data of live participants in specific room
  useEffect(() => {
    const handleFetchData = async () => {
      setIsLoading(true);
      try {
        const result = await GetConfigData(
          `/participants/list-participants?room=${params}`
        );
        console.log(result);
        setDataMeet(result);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    handleFetchData();
  }, [params]);
  http: useEffect(() => {
    if (Array.isArray(dataMeet)) {
      setDataMeet(dataMeet);
    }
  }, [dataMeet]);

  const informationsSlug = useCallback(() => {
    if (isLoading) return <Loading />;
    if (!dataMeet || dataMeet.length == 0) return null; // if there is not any data don't show anything

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
          <section className="bg-box-space relative z-0 rounded-lg p-2">
            <Image
              className="absolute object-cover h-full w-full  -z-10 bottom-0 top-0 left-0 "
              width={5000}
              height={5000}
              src={NoiseEffect}
              alt=""
            />
            <ul className="flex flex-col gap-6">
              {dataMeet &&
                [...dataMeet]
                  .reverse()
                  .map((data: Participant, index: number) => {
                    const findName = data.name.split("-")[0];
                    return (
                      dataMeet && (
                        <div
                          key={index + findName}
                          className="[&>div>div]:!justify-between"
                        >
                          <RankBox
                            user={{
                              rank: index,
                              name: findName,
                              joinedAt: +data.joinedAt,
                              identity: data.identity, // particiapant is admin or not base on identity
                            }}
                            permission={{
                              canSubscribe: data.permission.canSubscribe,
                              canPublish: data.permission.canPublish,
                              canPublishData: data.permission.canPublishData,
                              recorder: data.permission.recorder,
                            }}
                            meet={{
                              slug: params,
                            }}
                            options={{
                              isRank: true,
                              infoBox: true,
                            }}
                          />
                        </div>
                      )
                    );
                  })}
            </ul>
          </section>
        </>
      )
    );
  }, [dataMeet, title, params]);

  return (
    <>
      <div className="flex flex-col gap-10 mt-20">{informationsSlug()}</div>
    </>
  );
};

export default memo(LiveMeet);
