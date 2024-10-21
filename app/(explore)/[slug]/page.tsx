"use client";
import Image from "next/image";
import MainButton from "@/app/components/MainButton";
import UnLock from "/public/unlock.svg?url";
import Lock from "/public/lock.svg?url";
import Members from "/public/profile-2user.svg?url";
import DetailMiniBox from "@/app/components/DetailMiniBox";
import X from "/public/x.svg?url";
import Discord from "/public/discord.svg?url";
import Github from "/public/github.svg?url";
import SocialInfo from "@/app/components/SocialInfo";
import Link from "next/link";
import useGetConfigData from "@/hooks/useGetConfig";
import Verify from "/public/verify.svg";
import NoiseEffect from "/public/noiseEffect2.svg?url";

import { useCallback, useEffect, useState } from "react";
import Tag from "@/app/components/Tag";
import { dataType, ParamsType } from "@/app/types";

const ExploreSpace = ({ params }: { params: ParamsType }) => {
  const [data, setData] = useState<dataType>();

  const [isLoading, setIsLoading] = useState(true);
  const handelParamsSlug = (url: string) => {
    return url.replace(/_/g, " ");
  };
  const validParamsSlug = handelParamsSlug(params?.slug);
  const uiData = useGetConfigData(
    `/rooms/get-all-room-configs/sort?sort=${
      validParamsSlug == "im3" ? "default" : "all"
    }`
  );
  useEffect(() => {
    if (Array.isArray(uiData)) {
      uiData?.map((conf) => {
        if (conf.slug == validParamsSlug) {
          setData(conf);
          setIsLoading(false);
        }
      });
    } else {
      console.log(uiData);
      setData(uiData);
      setIsLoading(false);
    }
  }, [uiData]);

  const showsPrivateRoom = useCallback(() => {
    console.log(!!data?.config?.ui?.privateRoom);
    return (
      <>
        <DetailMiniBox
          className="[&>p]:opacity-60 [&>p]:!text-base [&>img]:w-2  !py-0.5"
          icon={!!data?.config?.ui?.privateRoom ? UnLock : Lock}
          value={data?.config?.ui?.privateRoom ? "Private" : "Public"}
          title={data?.config?.ui?.privateRoom ? "Private" : "Public"}
        />
      </>
    );
  }, [data]);

  return (
    !isLoading && (
      <div className="flex relative flex-col max-md:gap-10 bg-box-slug p-6 md:p-10 rounded-[40px]">
        <Image
          className="absolute object-cover h-full w-full  z-0 bottom-0 top-0 left-0 "
          width={5000}
          height={5000}
          src={NoiseEffect}
          alt=""
        />
        <div className="flex max-md:flex-col z-20 justify-between items-start">
          <div className="flex flex-row max-md:w-full  items-start gap-4 md:gap-9">
            {data ? (
              <div className="bg-[#131313] flex justify-center h-[60px] w-[30%] md:h-[150px] md:w-[150px] md:rounded-3xl rounded-[10px] ">
                <Image
                  className="sm:inline-block h-full hidden"
                  src={data?.config?.ui?.logo}
                  width={96}
                  height={96}
                  alt="logo"
                />
                <Image
                  className="sm:hidden h-full"
                  src={data?.config?.ui?.logo}
                  width={40}
                  height={40}
                  alt="logo"
                />
              </div>
            ) : null}
            <section className="flex flex-col w-[70%] gap-2 md:gap-6 justify-between ">
              <div className="flex flex-wrap items-center gap-2">
                <section className="flex items-center gap-2">
                  <h1 className="text-white capitalize font-SpaceGrotesk font-bold text-xl md:text-4xl">
                    {data?.slug ?? "IM3"}
                  </h1>
                  {data?.config?.verified && <Verify />}
                </section>
                {showsPrivateRoom()}
              </div>
              <ul className="grid grid-cols-4 gap-2">
                {data ? (
                  <DetailMiniBox
                    title="max_member"
                    className="!col-span-1 justify-center"
                    value={data?.config?.maxParticipants}
                    icon={Members}
                  />
                ) : null}
                {data
                  ? data?.config?.whiteListParticipants?.length > 0 && (
                      <DetailMiniBox
                        title="member"
                        className="!col-span-1 justify-center"
                        value={data?.config?.whiteListParticipants?.length}
                        icon={Members}
                      />
                    )
                  : null}
              </ul>
              <ul className="flex max-md:hidden items-center flex-wrap gap-1.5">
                {data?.config?.ui?.tags?.map((tag: string) => (
                  <Tag tag={tag} key={tag} />
                ))}
              </ul>
            </section>
          </div>
          <Link href={`https://space.im3.live/${data?.slug}`}>
            {data?.slug && (
              <MainButton
                pro
                className="py-3 max-md:hidden w-auto px-4 rounded-xl"
                value={"Join Room"}
              />
            )}
          </Link>
        </div>

        <section className="flex gap-4 md:mt-10 items-center flex-wrap justify-between">
          <p className=" z-10 font-Nunito text-xl md:text-2xl text-white">
            {data?.config?.ui?.desc}
          </p>
          <ul className="flex z-10 flex-wrap max-md:hidden items-center gap-4">
            {data?.config?.ui?.socials.x && (
              <SocialInfo
                width={24}
                height={24}
                icon={X}
                value={`${data?.config?.ui?.socials.x}`}
                link={`${data?.config?.ui?.socials.x}`}
                title={"X"}
              />
            )}

            {data?.config?.ui?.socials.github && (
              <SocialInfo
                width={24}
                height={24}
                icon={Github}
                value={`${data?.config?.ui?.socials.github}`}
                link={`${data?.config?.ui?.socials.github}`}
                title={"Github"}
              />
            )}
            {data?.config?.ui?.socials.website && data?.slug == "muon" && (
              <SocialInfo
                className="bg-[#F4F4F4]  rounded-full py-1.5 p-1"
                width={16}
                height={16}
                icon={data?.config?.ui?.logo}
                value={`${data?.config?.ui?.socials.website}`}
                link={`${data?.config?.ui?.socials.website}`}
                title={"Website"}
              />
            )}
            {data?.config?.ui?.socials.discord && (
              <SocialInfo
                width={24}
                height={24}
                icon={Discord}
                value={`${data?.config?.ui?.socials.discord}`}
                link={`${data?.config?.ui?.socials.discord}`}
                title={"Discord"}
              />
            )}
          </ul>
        </section>
        <ul className="flex md:hidden items-center flex-wrap gap-1.5">
          {data?.config?.ui?.tags?.map((tag: string) => (
            <Tag tag={tag} key={tag} />
          ))}
        </ul>
        <ul className="flex z-10 md:hidden self-center flex-wrap items-center gap-4">
          {data?.config?.ui?.socials.x && (
            <SocialInfo
              width={24}
              height={24}
              icon={X}
              value={`${data?.config?.ui?.socials.x}`}
              link={`${data?.config?.ui?.socials.x}`}
              title={"X"}
            />
          )}

          {data?.config?.ui?.socials.github && (
            <SocialInfo
              width={24}
              height={24}
              icon={Github}
              value={`${data?.config?.ui?.socials.github}`}
              link={`${data?.config?.ui?.socials.github}`}
              title={"Github"}
            />
          )}
          {data?.config?.ui?.socials.website && data?.slug == "muon" && (
            <SocialInfo
              className="bg-[#F4F4F4]  rounded-full py-1.5 p-1"
              width={16}
              height={16}
              icon={data?.config?.ui?.logo}
              value={`${data?.config?.ui?.socials.website}`}
              link={`${data?.config?.ui?.socials.website}`}
              title={"Website"}
            />
          )}
          {data?.config?.ui?.socials.discord && (
            <SocialInfo
              width={24}
              height={24}
              icon={Discord}
              value={`${data?.config?.ui?.socials.discord}`}
              link={`${data?.config?.ui?.socials.discord}`}
              title={"Discord"}
            />
          )}
        </ul>
        <Link
          className="self-center z-10"
          href={`https://space.im3.live/${data?.slug}`}
        >
          {data?.slug && (
            <MainButton
              pro
              className="py-3 md:hidden w-auto px-4 rounded-xl"
              value={"Join Room"}
            />
          )}
        </Link>
      </div>
    )
  );
};

export default ExploreSpace;
