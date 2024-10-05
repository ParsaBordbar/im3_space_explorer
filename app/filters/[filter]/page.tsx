"use client";
import SpaceCard from "@/app/components/SpaceCard";
import useGetConfigData from "@/hooks/useGetConfig";
import React from "react";

function Filter({ params }: { params: string }) {
  const u = `/rooms/get-all-room-configs/sort?sort=${params.filter}`;
  console.log(u);
  const uiData = useGetConfigData(u);
  return (
    <div className="flex flex-col my-10 w-11/12 md:w-[75%] mx-auto gap-4 items-start">
      <h1 className="text-white text-lg font-bold capitalize">{params.filter} Spaces</h1>
      <main className="grid gap-4 w-full mx-auto grid-cols-2">
        {uiData &&
          uiData.map((data: any) => {
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
          })}
      </main>
    </div>
  );
}

export default Filter;
