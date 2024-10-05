"use client";
import SpaceCard from "@/app/components/SpaceCard";
import useGetConfigData from "@/hooks/useGetConfig";
import { useCallback, useState } from "react";

const TagsPage = ({ params }: { params: string }) => {
  const [data, setData] = useState();
  const uiData = useGetConfigData(
    `/rooms/get-all-room-configs/sort?sort=${params.tags}`
  );
  //   setData(uiData);

  //   const SpaceCardCato = useCallback(() => {
  //     uiData.map((data) => {
  //       return (
  //         <SpaceCard
  //           className={""}
  //           logo_URL={data?.config?.ui?.logo}
  //           slug={data?.slug}
  //           key={data.slug}
  //           name_space={data?.slug || "IM3"}
  //           members={
  //             data?.config?.ui?.privateRoom
  //               ? data?.config?.whiteListParticipants.length
  //               : data?.config?.maxParticipants
  //           }
  //           privateSpace={data?.config?.ui?.privateRoom}
  //           roomUrl={data?.slug}
  //           tags={data?.config?.ui?.tags}
  //         />
  //       );
  //     });
  //   }, [uiData, data]);

  return (
    <>
      {/* <h1 className="text-white">{uiData[0].slug}</h1> */}
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
  );
};

export default TagsPage;
