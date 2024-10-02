'use client'
import useGetConfigData from '@/hooks/useGetConfig'
import React from 'react'
import SpaceCard from '../SpaceCard'

function SpaceSection() {
  const uiData = useGetConfigData('/rooms/get-all-room-configs/sort?sort=all')

  return (
    <section className="grid col-span-full grid-cols-2 gap-4">
      {
        uiData?.map((data: any) => (
          <SpaceCard
                logo_URL={data?.config?.ui?.logo}
                name_space={data?.slug || 'IM3'}
                members={data?.config?.ui?.privateRoom ? data?.config?.whiteListParticipants.length : data?.config?.maxParticipants}
                privateSpace={data?.config?.ui?.privateRoom}
                className={"md:col-span-1 col-span-full"}
                key={data.slug} slug={data?.slug}
                />
        ))
      }
    </section>
  )
}

export default SpaceSection
