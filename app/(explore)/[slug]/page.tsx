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

import { memo, useCallback, useEffect, useState } from "react";
import Tag from "@/app/components/Tag";
import { dataType, ParamsType } from "@/app/types";
import LiveMeet from "@/app/components/LiveMeet";
import useParamsSlug from "@/hooks/usePramsSlug";
import MeetContent from "@/app/components/MeetContent";
import Loading from "@/app/components/Loading";

const ExploreSpace = ({ params }: { params: ParamsType }) => {
  const [dataSpace, setDataSpace] = useState<dataType>();
  const [dataSpaceSpecifi, setDataSpaceSpecifi] = useState<dataType>();
  const [isLoading, setIsLoading] = useState(true); // Loading state

  const validParamsSlug = useParamsSlug(params?.slug);

  useEffect(() => {
    const handleFetchData = async () => {
      setIsLoading(true); // Start loading
      try {
        const result = await useGetConfigData(
          `/rooms/get-all-room-configs/sort?sort=${
            validParamsSlug == "im3" ? "default" : "all"
          }`
        );
        setDataSpace(result);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setIsLoading(false); // End loading
      }
    };
    handleFetchData();
  }, []);

  useEffect(() => {
    if (Array.isArray(dataSpace)) {
      const specificData = dataSpace.find(
        (conf) => conf.slug === validParamsSlug
      );
      setDataSpaceSpecifi(specificData);
    }
  }, [dataSpace, validParamsSlug]);

  const showsPrivateRoom = useCallback(() => {
    return (
      <DetailMiniBox
        className="[&>*]:opacity-60 max-sm:hidden [&>p]:md:!text-base [&>img]:w-2"
        icon={!!dataSpace?.config?.ui?.privateRoom ? UnLock : Lock}
        value={dataSpace?.config?.ui?.privateRoom ? "Private" : "Public"}
        title={dataSpace?.config?.ui?.privateRoom ? "Private" : "Public"}
      />
    );
  }, [dataSpace]);

  const showSlug = useCallback(() => {
    return (
      <>
        {isLoading ? ( // Show loading indicator while loading
          <Loading />
        ) : (
          <>
            <div className="flex max-md:flex-col z-20 justify-between items-start">
              <div className="flex flex-row max-md:w-full  items-start gap-2 sm:gap-4 md:gap-9">
                {dataSpaceSpecifi ? (
                  <>
                    <Image
                      className="min-[400px]:inline-block p-4 bg-black  rounded-2xl h-[96px] hidden"
                      src={dataSpaceSpecifi?.config?.ui?.logo}
                      width={96}
                      height={96}
                      alt="logo"
                    />
                    <Image
                      className="min-[400px]:hidden p-4 bg-black  rounded-2xl h-[60px]"
                      src={dataSpaceSpecifi?.config?.ui?.logo}
                      width={60}
                      height={500}
                      alt="logo"
                    />
                  </>
                ) : null}
                <section className="flex flex-col w-full gap-2 md:gap-6 justify-between ">
                  <div className="flex flex-wrap items-center gap-2">
                    <section className="flex items-center gap-2">
                      <h1 className="text-white font-bold md:text-4xl text-xl line-clamp-1 break-all capitalize font-SpaceGrotesk">
                        {dataSpaceSpecifi?.slug ?? "IM3"}
                      </h1>
                      {dataSpaceSpecifi?.config?.verified && <Verify className="md:w-8" />}
                      {!dataSpaceSpecifi?.config.ui?.privateRoom ? (
                        <Image
                          className="sm:hidden"
                          src={Lock}
                          width={16}
                          height={16}
                          alt="public_icon"
                        />
                      ) : (
                        <Image
                          className="sm:hidden"
                          src={UnLock}
                          width={16}
                          height={16}
                          alt="private_icon"
                        />
                      )}
                    </section>
                    {showsPrivateRoom()}
                  </div>
                  <ul className="flex items-center gap-2 flex-wrap">
                    {dataSpaceSpecifi ? (
                      <DetailMiniBox
                        title="max_member"
                        className="!col-span-1 justify-center"
                        value={dataSpaceSpecifi?.config?.maxParticipants}
                        icon={Members}
                      />
                    ) : null}
                    {dataSpaceSpecifi
                      ? dataSpaceSpecifi?.config?.whiteListParticipants?.length > 0 && (
                          <DetailMiniBox
                            title="member"
                            className="!col-span-1 justify-center"
                            value={dataSpaceSpecifi?.config?.whiteListParticipants?.length}
                            icon={Members}
                          />
                        )
                      : null}
                  </ul>
                  <ul className="flex max-md:hidden items-center flex-wrap gap-1.5">
                    {dataSpaceSpecifi?.config?.ui?.tags?.map((tag: string) => (
                      <Tag tag={tag} key={tag} />
                    ))}
                  </ul>
                </section>
              </div>
              <Link href={`https://space.im3.live/${dataSpaceSpecifi?.slug}`}>
                {dataSpaceSpecifi?.slug && (
                  <MainButton
                    mode="pro"
                    className="py-3 max-md:hidden w-max px-4 rounded-xl"
                    value={"Join Room"}
                  />
                )}
              </Link>
            </div>

            <section className="flex gap-4 md:mt-10 items-center flex-wrap justify-between">
              <p className=" z-10 font-Nunito text-xl md:text-2xl text-white">
                {dataSpaceSpecifi?.config?.ui?.desc}
              </p>
              <ul className="flex z-10 flex-wrap max-md:hidden items-center gap-4">
                {dataSpaceSpecifi?.config?.ui?.socials.x && (
                  <SocialInfo
                    width={24}
                    height={24}
                    icon={X}
                    value={`${dataSpaceSpecifi?.config?.ui?.socials.x}`}
                    link={`${dataSpaceSpecifi?.config?.ui?.socials.x}`}
                    title={"X"}
                  />
                )}

                {dataSpaceSpecifi?.config?.ui?.socials.github && (
                  <SocialInfo
                    width={24}
                    height={24}
                    icon={Github}
                    value={`${dataSpaceSpecifi?.config?.ui?.socials.github}`}
                    link={`${dataSpaceSpecifi?.config?.ui?.socials.github}`}
                    title={"Github"}
                  />
                )}
                {dataSpaceSpecifi?.config?.ui?.socials.website && dataSpaceSpecifi?.slug == "muon" && (
                  <SocialInfo
                    className="bg-[#F4F4F4]  rounded-full py-1.5 p-1"
                    width={16}
                    height={16}
                    icon={dataSpaceSpecifi?.config?.ui?.logo}
                    value={`${dataSpaceSpecifi?.config?.ui?.socials.website}`}
                    link={`${dataSpaceSpecifi?.config?.ui?.socials.website}`}
                    title={"Website"}
                  />
                )}
                {dataSpaceSpecifi?.config?.ui?.socials.discord && (
                  <SocialInfo
                    width={24}
                    height={24}
                    icon={Discord}
                    value={`${dataSpaceSpecifi?.config?.ui?.socials.discord}`}
                    link={`${dataSpaceSpecifi?.config?.ui?.socials.discord}`}
                    title={"Discord"}
                  />
                )}
              </ul>
            </section>
            <ul className="flex md:hidden items-center flex-wrap gap-1.5">
              {dataSpaceSpecifi?.config?.ui?.tags?.map((tag: string) => (
                <Tag tag={tag} key={tag} />
              ))}
            </ul>
            <ul className="flex z-10 md:hidden self-center flex-wrap items-center gap-4">
              {dataSpaceSpecifi?.config?.ui?.socials.x && (
                <SocialInfo
                  width={24}
                  height={24}
                  icon={X}
                  value={`${dataSpaceSpecifi?.config?.ui?.socials.x}`}
                  link={`${dataSpaceSpecifi?.config?.ui?.socials.x}`}
                  title={"X"}
                />
              )}

              {dataSpaceSpecifi?.config?.ui?.socials.github && (
                <SocialInfo
                  width={24}
                  height={24}
                  icon={Github}
                  value={`${dataSpaceSpecifi?.config?.ui?.socials.github}`}
                  link={`${dataSpaceSpecifi?.config?.ui?.socials.github}`}
                  title={"Github"}
                />
              )}
              {dataSpaceSpecifi?.config?.ui?.socials.website && dataSpaceSpecifi?.slug == "muon" && (
                <SocialInfo
                  className="bg-[#F4F4F4]  rounded-full py-1.5 p-1"
                  width={16}
                  height={16}
                  icon={dataSpaceSpecifi?.config?.ui?.logo}
                  value={`${dataSpaceSpecifi?.config?.ui?.socials.website}`}
                  link={`${dataSpaceSpecifi?.config?.ui?.socials.website}`}
                  title={"Website"}
                />
              )}
              {dataSpaceSpecifi?.config?.ui?.socials.discord && (
                <SocialInfo
                  width={24}
                  height={24}
                  icon={Discord}
                  value={`${dataSpaceSpecifi?.config?.ui?.socials.discord}`}
                  link={`${dataSpaceSpecifi?.config?.ui?.socials.discord}`}
                  title={"Discord"}
                />
              )}
            </ul>
            <Link
              className="self-center md:hidden z-10"
              href={`https://space.im3.live/${dataSpaceSpecifi?.slug}`}
            >
              {dataSpaceSpecifi?.slug && (
                <MainButton
                  mode="pro"
                  className="py-3  w-auto px-4 rounded-xl"
                  value={"Join Room"}
                />
              )}
            </Link>
          </>
        )}
      </>
    );
  }, [dataSpace, isLoading]);

  return (
    <>
      <div className="flex relative flex-col max-md:gap-10 bg-box-slug p-6 md:p-10 rounded-[40px]">
        <Image
          className="absolute object-cover h-full w-full z-0 bottom-0 top-0 left-0 "
          width={5000}
          height={5000}
          src={NoiseEffect}
          alt=""
        />
        {showSlug()}
      </div>
      {!isLoading ? (
        <>
          <LiveMeet title="Live Meet" params={params.slug} />
          <MeetContent title="Meets" params={params.slug} />
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default memo(ExploreSpace);
