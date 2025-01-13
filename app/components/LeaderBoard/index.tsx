"use client";
import GetConfigData from "@/hooks/useGetConfig";
import { useCallback, useEffect, useMemo, useState } from "react";
import Loading from "../Loading";
import TopThreeRank from "../TopThreeRank";
import RankBox from "../RankBox";
import { LeadreBoardMeetData, Participant } from "@/app/types";

type Config = {
  admins: string[]; // Array of admin addresses (strings)
  apiVersion: string; // Version of the API
  emptyTimeout: number; // Timeout duration in seconds
  maxParticipants: number; // Maximum number of participants
  mintPoaps: boolean; // Whether POAPs are minted
  owner: string; // Owner address
  record: {
    recordRoom: boolean; // Whether recording is enabled for the room
    outputName: string; // Output name for the recording
    recordTypes: string[]; // Array of recording types
  };
  ui: {
    slug: string; // Slug for the room
    privateRoom: boolean; // Whether the room is private
    logo: string; // URL of the logo
    title: string; // Title of the room
    desc: string; // Description of the room
  };
  url: string; // URL for the room
  verified: boolean; // Whether the room is verified
  whiteListParticipants: string[]; // Array of whitelisted participant addresses
  slug: string; // Slug (same as ui.slug, appears redundant)
};

const LeaderBoard = ({
  onSendData,
}: {
  onSendData: (value1: number, value2: number) => void;
}) => {
  const [slugs, setSlugs] = useState<string[]>([]);
  const [maxParticipant, setMaxParticipant] = useState<number>(0);
  const [participants, setParticipants] = useState<LeadreBoardMeetData[]>([]);
  const [finalData, setFinalData] = useState<
    {
      roomName: string;
      count: number;
      formula: number;
    }[]
  >([
    {
      roomName: "",
      count: 0,
      formula: 0,
    },
  ]);
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch the slugs for the rooms
  const getAllSlugs = async () => {
    const result: Config[] = await GetConfigData(
      `/rooms/get-all-room-configs/sort?sort=all`
    );
    console.log("result : ", result);
    const uniqueSlugs = Array.from(
      new Set(result.map((space: Config) => space.slug ?? "im3"))
    );
    console.log(uniqueSlugs);
    setSlugs(uniqueSlugs);
    if (uniqueSlugs.length > 0) {
      getAllSlugsCount(uniqueSlugs);
    }
  };

  // Fetch the room count data
  const getAllSlugsCount = useCallback((uniqueSlugs: string[]) => {
    console.log("get all slugs count", uniqueSlugs);
    const fetchCounts = async () => {
      const dataPromises = uniqueSlugs.map(async (roomSlug) => {
        console.log("roomSlug", roomSlug);
        const result = await GetConfigData(
          `/rooms/get-collected-data/room?name=${roomSlug}`
        );
        console.log("result", result);

        return { roomName: result.name, count: result.count, formula: 0 };
      });
      const data = await Promise.all(dataPromises);
      console.log("dataPromises", data);
      setFinalData(data);
    };

    fetchCounts();
  }, []);

  // Fetch participants data
  const getParticipants = async (uniqueSlugs: string[]) => {
    const participantsData = await Promise.all(
      uniqueSlugs.map(async (slug) => {
        console.log("uniqueSlugs in get participiants", uniqueSlugs);
        const result = await GetConfigData(
          `/participants/stored-participants/${slug}`
        );
        const validParticipants: Participant[] = result.participants
          ?.flat()
          .filter(
            (participant: Participant[]) =>
              participant !== undefined && participant !== null
          );

        return {
          roomName: slug,
          count: 0,
          participants: validParticipants,
          formula: 0,
        };
      })
    );
    console.log("finalData : ", finalData);

    const updatedData = finalData.map((data) => {
      const participantInfo = participantsData.find(
        (parti) => parti.roomName === data.roomName
      );

      return participantInfo
        ? { ...data, participant: participantInfo.participants, formula: 0 }
        : data;
    });
    console.log("update data : ", updatedData);
    setParticipants(updatedData);
  };

  // Fetch all slugs and participants data on component mount
  useEffect(() => {
    getAllSlugs();
  }, []);

  useEffect(() => {
    console.log("this is slugs", slugs);
    console.log("final data in effect ", finalData);
    if (finalData[0].roomName !== "") {
      getParticipants(slugs);
    }
  }, [finalData]);


  const topThree = useMemo(() => {
    console.log(participants);
    if (!participants[0]?.roomName) return;

    setLoading(true);

    const updatedParticipants = participants?.map((item) => {
      if (
        item.formula &&
        item.formula >= 0 &&
        item.count &&
        item.count >= 0 &&
        item.participant?.length !== undefined
      ) {
        item.formula = item.count * item.participant.length;
      }
      return item;
    });
    console.log("updatedParticipants", updatedParticipants);

    const sortedParticipants = updatedParticipants?.sort((a, b) => {
      if (a?.formula && b?.formula) {
        return b?.formula - a?.formula;
      }

      return 0;
    });
    console.log("sortedParticipants", sortedParticipants);
    const totalParticipants =
      sortedParticipants?.reduce(
        (accumulator, currentValue) =>
          Array.isArray(currentValue?.participant)
            ? accumulator + currentValue?.participant.length
            : accumulator,
        0
      ) ?? 0;

    setMaxParticipant(totalParticipants);
    setLoading(false);

    return sortedParticipants.map((spaces, index) => {
      if (index == 9) return;
      return index <= 2 ? (
        <TopThreeRank
          count={spaces?.count}
          countParticipants={spaces?.participant?.length}
          key={spaces?.roomName}
          name={spaces?.roomName ?? ""}
          meet={{ slug: spaces?.roomName ?? "" }}
          medal={index === 0 ? "gold" : index === 1 ? "silver" : "bronze"}
          className={`${
            index === 0
              ? "col-span-full xl:col-span-3"
              : "col-span-full md:col-span-2"
          }  [&>h1]:!text-2xl`}
        />
      ) : (
        <li
          key={spaces?.roomName ?? index}
          className="bg-[#5b5b5d3e] col-span-full rounded-xl p-2"
        >
          <RankBox
            meet={{
              count: spaces?.count && +spaces?.count,
              slug: spaces?.roomName ?? "",
              countParticipants:
                spaces?.participant?.length && +spaces?.participant?.length,
            }}
            options={{
              isRank: true,
              infoBox: false,
            }}
            user={{
              rank: index,
              name: spaces?.roomName ?? "",
              joinedAt: "",
              points:
                spaces?.participant?.length && spaces?.count
                  ? +spaces.participant.length * +spaces.count
                  : 0,
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
