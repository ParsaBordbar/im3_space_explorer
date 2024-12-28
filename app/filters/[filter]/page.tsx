"use client";
import Loading from "@/app/components/Loading";
import SpaceCard from "@/app/components/SpaceCard";
import { dataType } from "@/app/types";
import useGetConfigData from "@/hooks/useGetConfig";
import React, { useMemo } from "react";

function Filter({ params }: { params: { filter: string } }) {
  const { configData, isLoading } = useGetConfigData(
    `/rooms/get-all-room-configs/sort?sort=${params.filter}`
  );
  const showData = useMemo(() => {
    if (isLoading) return <Loading />; // loading animations
    if (!configData || (configData.length == 0 && isLoading)) return null; // if there is not any data don't show anything
    return (
      Array.isArray(configData) &&
      configData?.map((data: dataType) => {
        return (
          <SpaceCard
            className={"col-span-full md:col-span-1"}
            logo_URL={data?.config?.ui?.logo}
            slug={data?.slug}
            key={data.slug}
            name_space={data?.slug || "IM3"}
            members={
              data?.config?.ui?.privateRoom
                ? data?.config?.whiteListParticipants.length
                : data?.config?.maxParticipants
            }
            privateSpace={data?.config?.ui?.privateRoom}
            roomUrl={data?.slug}
            tags={data?.config?.ui?.tags}
            verified={data?.config?.verified}
          />
        );
      })
    );
  }, [configData]);
  return (
    <div className="flex flex-col my-40 w-11/12 lg:w-[75%] mx-auto gap-4 items-start">
      <h1 className="text-white text-lg font-bold font-SpaceGrotesk capitalize">
        {params.filter} Spaces
      </h1>
      <main className="grid gap-4 w-full mx-auto grid-cols-2">{showData}</main>
    </div>
  );
}

export default Filter;
