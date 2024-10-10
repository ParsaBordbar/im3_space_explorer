"use client";
import Image from "next/image";
import MuonLogo from "/public/muon_logo.svg";
import MainButton from "@/app/components/MainButton";
import UnLock from "/public/unlock.svg";
import Lock from "/public/lock.svg";
import Members from "/public/profile-2user.svg";
import DetailMiniBox from "@/app/components/DetailMiniBox";
import X from "/public/x.svg";
import Discord from "/public/discord.png";
import Github from "/public/github.svg";
import SocialInfo from "@/app/components/SocialInfo";
import Link from "next/link";
import useGetConfigData from "@/hooks/useGetConfig";
import Verify from "/public/verify.png";

import {
  useCallback,
  useEffect,
  useState,
} from "react";
import Tag from "@/app/components/Tag";
const ExploreSpace = ({ params }: { params: string }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const handelParamsSlug = (url: string) => {
    return url.replace(/_/g, " ");
  };
  const validParamsSlug = handelParamsSlug(params?.slug)
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
        <MainButton
          className="rounded-2xl bg-[#2a2a2a] md:flex hidden py-3 px-4"
          iconSrc={!!data?.config?.ui?.privateRoom ? Lock : UnLock}
          freez
          value={data?.config?.ui?.privateRoom ? "Private" : "Public"}
        />
      </>
    );
  }, [data]);

  return (
    !isLoading && (
      <div className="flex flex-col bg-[#1E1E1E] p-4 rounded-2xl">
        <div className="flex justify-between items-start">
          <div className="flex md:flex-row flex-col w-full  items-center gap-9 md:w-fit">
            <Image
              className="md:inline-block hidden"
              src={data?.config?.ui?.logo}
              width={96}
              height={96}
              alt="logo"
            />
            <Image
              className="md:hidden"
              src={data?.config?.ui?.logo}
              width={250}
              height={96}
              alt="logo"
            />
            <section className="flex flex-col gap-2 self-start">
              <div className="flex flex-wrap items-center gap-2">
                {data?.config?.ui?.privateRoom ? (
                  <Image
                    className="md:hidden"
                    src={Lock}
                    width={16}
                    height={16}
                    alt=""
                    title="private"
                  />
                ) : (
                  <Image
                    className="md:hidden"
                    src={UnLock}
                    width={16}
                    height={16}
                    alt=""
                    title="public"
                  />
                )}
                <section className="flex items-center gap-2">
                  <span className="text-white font-bold text-2xl md:text-4xl">
                    {data?.slug ?? "IM3"}
                  </span>
                  {data?.config?.verified && (
                    <Image
                      title="verify"
                      className=""
                      src={Verify}
                      width={24}
                      height={24}
                      alt="verify"
                    />
                  )}
                </section>
                {showsPrivateRoom()}
              </div>
              <ul className="flex items-center gap-2">
                <DetailMiniBox
                  title="max_member"
                  className="w-fit"
                  value={data?.config?.maxParticipants}
                  icon={Members}
                />
                {data?.config?.whiteListParticipants?.length > 0 && (
                  <DetailMiniBox
                    title="member"
                    className="w-fit"
                    value={data?.config?.whiteListParticipants?.length}
                    icon={Members}
                  />
                )}
              </ul>
              <ul className="flex items-center flex-wrap gap-2">
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
                className="py-3 md:static fixed z-20 md:bottom-auto md:left-auto md:w-auto w-full left-0 bottom-0  px-4 md:rounded-2xl"
                value={"Join Room"}
              />
            )}
          </Link>
        </div>

        <p className="mt-6 text-white">{data?.config?.ui?.desc}</p>
        <ul className="flex flex-wrap items-center gap-3 mt-3">
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
          {data?.config?.ui?.socials.website && (
            <SocialInfo
              width={24}
              height={24}
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
      </div>
    )
  );
};

export default ExploreSpace;
