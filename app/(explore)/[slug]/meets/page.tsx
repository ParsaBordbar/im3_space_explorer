"use client";

import Loading from "@/app/components/Loading";
import RankBox from "@/app/components/RankBox";
import { RoomStructure } from "@/app/types";
import GetConfigData from "@/hooks/useGetConfig";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const MeetsSpace = ({ params }: { params: { slug: string } }) => {
  const [loading, setLoading] = useState(true);
  const [owners, setOwners] = useState<RoomStructure>();

  useEffect(() => {
    const handleFetchDataMeet = async () => {
      setLoading(true); // Start loading
      try {
        const result = await GetConfigData(
          `/rooms/get-collected-data/room?name=${params.slug}`
        );
        console.log(result);
        setOwners(result);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false); // End loading
      }
    };
    handleFetchDataMeet();
  }, [params]);
  const showOwners = useMemo(() => {
    if (loading) return <Loading />;
    return owners?.sessions.map((owner, index) => {
      const findName = owner.userName.split("-")[0];
      return (
        <RankBox
          key={index}
          meet={{ slug: params.slug }}
          options={{
            isRank: true,
            infoBox: false,
          }}
          user={{
            rank: index,
            name: findName,
            joinedAt: owner.startedAt,
            identity: owner.startedBy,
            leaveAt: undefined,
          }}
        />
      );
    });
  }, [loading, params.slug, owners?.sessions]);
  return (
    <div className="flex flex-col items-start gap-20">
      <h1 className="font-SpaceGrotesk capitalize text-white text-2xl sm:text-4xl lg:text-6xl font-bold">
        {params.slug} Meets Owners
      </h1>
      <main className="bg-[#5b5b5d3e] p-2 text-white  rounded-xl gap-6 w-full mx-auto ">
        {showOwners ?? (
          <section className="[&>span]:opacity-55 flex items-center font-SpaceGrotesk gap-1">
            <span>There is nothing here</span>
            <Link href={`/${params.slug}`}>go to space</Link>
          </section>
        )}
      </main>
    </div>
  );
};

export default MeetsSpace;
