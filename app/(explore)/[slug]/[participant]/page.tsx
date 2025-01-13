"use client";
import Loading from "@/app/components/Loading";
import RankBox from "@/app/components/RankBox";
import { RoomStructure } from "@/app/types";
import GetConfigData from "@/hooks/useGetConfig";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const ParticipantsMeetsSpace = ({
  params,
}: {
  params: {
    participant: string;
    slug: string;
  };
}) => {
  const [loading, setLoading] = useState(true);
  const [meets, setMeets] = useState<RoomStructure[]>([]);

  console.log(params.participant);

  useEffect(() => {
    const handleFetchDataMeet = async () => {
      setLoading(true); // Start loading
      try {
        const result = await GetConfigData(
          `/rooms/get-collected-data/participant?name=${params.participant}`
        );
        setMeets(result);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false); // End loading
      }
    };
    handleFetchDataMeet();
  }, [params]);

  const showMeets = useMemo(() => {
    if (loading) return <Loading />;
    return meets?.map((meet, index) => {
      console.log(meet.sessions[0].startedAt);
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
  }, [loading, meets, params.slug]);
  return (
    <div className="flex flex-col items-start gap-20">
      <h1 className="font-SpaceGrotesk w-2/3 whitespace-nowrap overflow-clip text-ellipsis capitalize text-white text-base sm:text-4xl lg:text-6xl font-bold">
        the meets of {params.participant}
      </h1>
      <main className="bg-[#5b5b5d3e] p-2 flex flex-col rounded-xl gap-2 w-full mx-auto ">
        {showMeets ?? (
          <section className="[&>span]:opacity-55 flex items-center font-SpaceGrotesk gap-1">
            <span>There is nothing here</span>
            <Link href={`/${params.slug}`}>go to space</Link>
          </section>
        )}
      </main>
    </div>
  );
};

export default ParticipantsMeetsSpace;
