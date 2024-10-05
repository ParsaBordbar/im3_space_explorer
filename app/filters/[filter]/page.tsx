"use client";
import SpaceCard from '@/app/components/SpaceCard';
import useGetConfigData from '@/hooks/useGetConfig';
import React from 'react'

function Filter({ params }: { params: string }) {
    const u = `/rooms/get-all-room-configs/sort?sort=${params.filter}`
    console.log(u);
    const uiData = useGetConfigData(u);
  return (
    <>
        {uiData &&
          uiData.map((data: any) => {
            return (
              <SpaceCard
                className={""}
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
              />
            );
          })}
    </>
  )
}

export default Filter