"use client";

import Loading from "@/app/components/Loading";
import RankBox from "@/app/components/RankBox";
import { RoomStructure } from "@/app/types";
import useGetConfigData from "@/hooks/useGetConfig";
import { count } from "console";
import { useEffect, useMemo, useState } from "react";

const ParticipantsMeetsSpace = ({ params }: any) => {
  const [loading, setLoading] = useState(true);
  const [meets, setMeets] = useState<RoomStructure[]>([]);

  console.log(params.participant);
  const handleFetchDataMeet = async () => {
    setLoading(true); // Start loading
    try {
      const result = await useGetConfigData(
        `/rooms/get-collected-data/participant?name=${params.participant}`
      );
      setMeets(result);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false); // End loading
    }
  };

  const useDebouncedEffect = (
    callback: () => void,
    delay: number,
    deps: any[]
  ) => {
    useEffect(() => {
      const handler = setTimeout(callback, delay);
      return () => clearTimeout(handler);
    }, [...deps]);
  };

  useDebouncedEffect(
    () => {
      handleFetchDataMeet();
    },
    300,
    [params]
  );

  const showMeets = useMemo(() => {
    if (loading) return <Loading />;
    return meets?.map((meet, index) => {
      return (
        <>
          <RankBox
            meet={{ count: meet.count, slug: params.slug }}
            options={{
              isRank: true,
              infoBox: false,
            }}
            user={{
              rank: index,
              name: meet.name,
              joinedAt: meet.sessions[0].startedAt,
              identity: meet.sessions[0].startedBy,
              leaveAt: undefined,
            }}
          />
        </>
      );
    });
  }, [loading]);
  return (
    <div className="flex flex-col items-start gap-20">
      <h1 className="font-SpaceGrotesk w-2/3 whitespace-nowrap overflow-clip text-ellipsis capitalize text-white text-5xl md:text-6xl font-bold">
        the meets of {params.participant}
      </h1>
      <main className="bg-[#5b5b5d3e] p-2 flex flex-col rounded-xl gap-2 w-full mx-auto ">
        {showMeets}
      </main>
    </div>
  );
};

export default ParticipantsMeetsSpace;
