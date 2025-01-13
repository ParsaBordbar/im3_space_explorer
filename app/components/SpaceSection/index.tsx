"use client";
import GetConfigData from "@/hooks/useGetConfig";
import React, { useCallback, useEffect, useState } from "react";
import SpaceCard from "../SpaceCard";
import { dataType, SpaceSectionType } from "@/app/types";
import Loading from "../Loading";

function SpaceSection({ search }: SpaceSectionType) {
  const [data, setData] = useState<dataType[] | null>(null); // Start with `null` to differentiate between loading and empty data

  // Fetch data on component mount
  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const result = await GetConfigData(
          `/rooms/get-all-room-configs/sort?sort=all`
        );
        setData(result);
      } catch (err) {
        console.error("Failed to fetch spaces:", err);
        setData([]); // Handle errors gracefully by setting to an empty array
      }
    };
    fetchSpaces();
  }, []);

  // Filter and render spaces based on the search query
  const filteredSpaces = useCallback(() => {
    if (!data) return <Loading />; // Show loading while data is being fetched

    const regex = new RegExp(search, "i");
    const filteredData = data.filter(
      (space) => regex.test(space.slug) || search === ""
    );

    if (filteredData.length === 0) {
      return <p className="text-center text-gray-500">No spaces found.</p>;
    }

    return filteredData.map((space) => (
      <SpaceCard
        logo_URL={space?.config?.ui?.logo}
        name_space={space?.slug || "IM3"}
        members={
          space?.config?.ui?.privateRoom
            ? space?.config?.whiteListParticipants.length
            : space?.config?.maxParticipants
        }
        privateSpace={space?.config?.ui?.privateRoom}
        className={"md:col-span-1 col-span-full"}
        key={space.slug}
        slug={space?.slug}
        roomUrl={space?.slug}
        tags={space?.config?.ui?.tags}
        verified={space?.config?.verified}
      />
    ));
  }, [data, search]);

  return (
    <section className="grid mb-10 w-full col-span-full grid-cols-2 gap-4">
      {filteredSpaces()}
    </section>
  );
}

export default SpaceSection;
