"use client";
import useGetConfigData from "@/hooks/useGetConfig";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import Loading from "../Loading";
import TopThreeRank from "../TopThreeRank";
import InfoMiniBox from "../infoMiniBox";
import RankBox from "../RankBox";

const LeaderBoard = ({
  onSendData,
}: {
  onSendData: (value1: string, value2: number) => void;
}) => {
  const [slugs, setSlugs] = useState<string[]>([]);
  const [maxParticipant, setMaxParticipant] = useState<number>(0);
  const [participants, setParticipants] = useState<any[]>([]);
  const [finalData, setFinalData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch the slugs for the rooms
  const getAllSlugs = async () => {
    const result = await useGetConfigData(
      `/rooms/get-all-room-configs/sort?sort=all`
    );

    const uniqueSlugs = Array.from(
      new Set(
        result.map((space: any) =>
          space.slug === "muon"
            ? "uuro-4tgo"
            : space.slug === "theLead"
            ? "i7l5-18lx"
            : "tauf-s6n1"
        )
      )
    );

    setSlugs(uniqueSlugs);
  };

  // Fetch the room count data
  const getAllSlugsCount = useMemo(() => {
    const fetchCounts = async () => {
      const dataPromises = slugs.map(async (roomSlug) => {
        const result = await useGetConfigData(
          `/rooms/get-collected-data/room?name=${roomSlug}`
        );

        return { roomName: result.name, count: result.count };
      });

      const data = await Promise.all(dataPromises);
      setFinalData(data);
    };

    if (slugs.length > 0) {
      fetchCounts();
    }
  }, [slugs]);

  // Fetch participants data
  const getParticipants = useCallback(async () => {
    const participantsData = await Promise.all(
      slugs.map(async (slug) => {
        const result = await useGetConfigData(
          `/participants/stored-participants/${slug}`
        );

        const validParticipants = result.participants
          .flat()
          .filter(
            (participant: null | undefined) =>
              participant !== undefined && participant !== null
          );

        return { roomName: slug, participants: validParticipants };
      })
    );

    const updatedData = finalData.map((data) => {
      const participantInfo = participantsData.find(
        (parti) => parti.roomName === data.roomName
      );

      return participantInfo
        ? { ...data, participant: participantInfo.participants }
        : data;
    });

    setParticipants(updatedData);
  }, [finalData, slugs]);

  // Fetch all slugs and participants data on component mount
  useLayoutEffect(() => {
    getAllSlugs();
    getAllSlugsCount;
  }, []);

  useEffect(() => {
    if (finalData.length > 0) {
      getParticipants();
    }
  }, [finalData]);

  const topThree = useMemo(() => {
    if (participants.length === 0) return;

    setLoading(true);

    let updatedParticipants = participants.map((item) => {
      item.formula = item.count * item.participant.length;
      return item;
    });

    const sortedParticipants = updatedParticipants.sort(
      (a, b) => b.formula - a.formula
    );

    const totalParticipants = sortedParticipants.reduce(
      (accumulator, currentValue) =>
        accumulator + currentValue.participant.length,
      0
    );

    setMaxParticipant(totalParticipants);
    setLoading(false);

    return sortedParticipants.map((spaces, index) => {
      if (index == 9) return;
      return index <= 2 ? (
        <TopThreeRank
          count={spaces.count}
          countParticipants={spaces.participant.length}
          key={spaces.roomName}
          name={spaces.roomName}
          meet={{ slug: spaces.roomName }}
          medal={index === 0 ? "gold" : index === 1 ? "silver" : "bronze"}
          className={`${
            index === 0
              ? "col-span-full xl:col-span-3"
              : "col-span-full md:col-span-2"
          }  [&>h1]:!text-2xl`}
        />
      ) : (
        <li
          key={spaces.roomName}
          className="bg-[#5b5b5d3e] col-span-full rounded-xl p-2"
        >
          <RankBox
            meet={{
              count: +spaces.count,
              slug: spaces.roomName,
              countParticipants: +spaces.participant.length,
            }}
            options={{
              isRank: true,
              infoBox: false,
            }}
            user={{
              rank: index,
              name: spaces.roomName,
              joinedAt: "",
              points: +spaces.participant.length * +spaces.count,
              leaveAt: undefined,
              identity: undefined,
            }}
          />
        </li>
      );
    });
  }, [participants]);

  useEffect(() => {
    const countOfMeets = finalData.reduce(
      (accumulator, currentValue) => accumulator + currentValue.count,
      0
    );

    onSendData(countOfMeets, maxParticipant);
  }, [finalData, maxParticipant]);

  return (
    <div className="flex mt-14 flex-col gap-14">
      <h1 className="text-white font-SpaceGrotesk text-6xl">Top 10</h1>
      {loading ? (
        <Loading />
      ) : (
        <ul className="grid grid-cols-4 xl:grid-cols-7 gap-4">{topThree}</ul>
      )}
    </div>
  );
};

export default LeaderBoard;
