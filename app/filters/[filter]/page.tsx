"use client";
import Loading from "@/app/components/Loading";
import SpaceCard from "@/app/components/SpaceCard";
import { dataType } from "@/app/types";
import GetConfigData from "@/hooks/useGetConfig";
import React, { useEffect, useMemo, useState } from "react";

function Filter({ params }: { params: { filter: string } }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getAllSlugs = async () => {
    setIsLoading(true);
    const result = await GetConfigData(
      `/rooms/get-all-room-configs/sort?sort=${params.filter}`
    );
    setData(result);
    setIsLoading(false);
  };

  useEffect(() => {
    getAllSlugs();
  },[params]);

  const showSpaces = useMemo(() => {
    if (isLoading) return <Loading />;
    if (!data || (data.length == 0 && isLoading)) return null;
    return (
      Array.isArray(data) &&
      data?.map((data: dataType) => {
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
  }, [data, isLoading]);
  return (
    <div className="flex flex-col mt-40 w-11/12 lg:w-[75%] mx-auto gap-4 items-start">
      <h1 className="text-white text-lg font-bold font-SpaceGrotesk capitalize">
        {params.filter} Spaces
      </h1>
      <main className="grid mb-40 gap-4 w-full mx-auto grid-cols-2">
        {showSpaces}
      </main>
    </div>
  );
}

export default Filter;
