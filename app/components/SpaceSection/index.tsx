"use client";
import useGetConfigData from "@/hooks/useGetConfig";
import React, { useCallback } from "react";
import SpaceCard from "../SpaceCard";
import { dataType, SpaceSectionType } from "@/app/types";
import Loading from "../Loading";

function SpaceSection({ search }: SpaceSectionType) {
  const { configData, isLoading } = useGetConfigData(
    `/rooms/get-all-room-configs/sort?sort=all`
  );
  
  const showSpaces = useCallback(() => {
    console.log("This is search in space Section", search, isLoading, configData);
    return !isLoading && configData?.length > 0
      ? configData.map((data: dataType) => {
          const regex = new RegExp(search, "i");
          const matchesSearch = regex.test(data.slug);
  
          if (matchesSearch || search === "") {
            return (
              <SpaceCard
                logo_URL={data?.config?.ui?.logo}
                name_space={data?.slug || "IM3"}
                members={
                  data?.config?.ui?.privateRoom
                    ? data?.config?.whiteListParticipants.length
                    : data?.config?.maxParticipants
                }
                privateSpace={data?.config?.ui?.privateRoom}
                className={"md:col-span-1 col-span-full"}
                key={data.slug}
                slug={data?.slug}
                roomUrl={data?.slug}
                tags={data?.config?.ui?.tags}
                verified={data?.config?.verified}
              />
            );
          }
          return null;
        })
      : <Loading />;
  }, [configData, isLoading, search]);
  
  return (
    <section className="grid mb-10 w-full col-span-full grid-cols-2 gap-4">
      {showSpaces()}
    </section>
  );
}

export default SpaceSection;
