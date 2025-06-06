import { useMemo, useState } from "react";
import ConvertTimestamp from "../ConvertTimesTamp";
import { RankBoxType } from "@/app/types";
import Star from "/public/star.svg";
import Link from "next/link";

const RankBox = ({ user, permission, options, meet }: RankBoxType) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // Hook to handle permissions display logic
  const usePermissionsInfo = (
    isOpen: boolean,
    permission:
      | {
          canSubscribe: boolean;
          canPublish: boolean;
          canPublishData: boolean;
          recorder: boolean;
        }
      | undefined,
    joinedAt: string | number | undefined
  ) => {
    console.log("permissionp", permission);
    return useMemo(() => {
      if (!isOpen || !permission) return null;

      return (
        <section className="flex bg-box-space p-2 rounded-lg max-md:flex-col [&>*]:max-sm:text-sm md:items-center gap-2">
          {permission.canSubscribe && (
            <p className="text-white font-SpaceGrotesk select-none capitalize">
              Can Subscribe
            </p>
          )}
          {permission.canPublish && (
            <p className="text-white font-SpaceGrotesk select-none capitalize">
              Can Publish
            </p>
          )}
          {permission.canPublishData && (
            <p className="text-white font-SpaceGrotesk select-none capitalize">
              Can Publish Data
            </p>
          )}
          {permission.recorder && (
            <p className="text-white font-SpaceGrotesk select-none capitalize">
              Recorder
            </p>
          )}
          {joinedAt && <ConvertTimestamp time={joinedAt} />}
        </section>
      );
    }, [isOpen, permission, joinedAt]);
  };

  // Hook to determine the button text
  const useToggleButtonText = (isOpen: boolean) => {
    return useMemo(() => (isOpen ? "Less" : "More"), [isOpen]);
  };
  // Hook for displaying permission info
  const showInfo = usePermissionsInfo(isOpen, permission, user.joinedAt);

  // Hook for toggle button text
  const valueButton = useToggleButtonText(isOpen);

  // Toggle the information box
  const toggleInfoBox = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col hover:bg-[#5b5b5d3e] transition-all ease-in-out duration-200 p-2 rounded-lg justify-center gap-4">
      <div className="flex items-center justify-evenly w-full">
        <div
          className={`flex justify-between flex-wrap gap-2 ${
            options.infoBox ? "w-[80%]" : "w-full"
          } items-center`}
        >
          <section className="flex w-[70%] max-md:w-full items-center gap-2">
            {options.isRank && (
              <p className="font-SpaceGrotesk text-base w-fit text-white bg-box-space px-2 rounded-full">
                {user.rank + 1}
              </p>
            )}
            {options.isLink ? (
              <Link
                href={`${user.link}`}
                className="text-white flex-grow max-md:w-[80%] overflow-hidden whitespace-nowrap text-ellipsis text-base font-SpaceGrotesk"
              >
                {user.name}
              </Link>
            ) : (
              <h1 className="text-white flex-grow max-md:w-[80%] overflow-hidden whitespace-nowrap text-ellipsis text-base font-SpaceGrotesk">
                {user.name}
              </h1>
            )}
          </section>
          {meet?.count && meet?.count >= 0 && (
            <span className="text-white font-SpaceGrotesk">
              {meet.count} Number Created
            </span>
          )}
          {meet?.countParticipants != undefined && meet.countParticipants >= 0 && (
            <span className="text-white font-SpaceGrotesk">
              {meet.countParticipants} Total Participants
            </span>
          )}
          {user.points != undefined && user.points >= 0 && (
            <section
              title="Points"
              className="flex items-center gap-2 [&_p]:text-white font-SpaceGrotesk text-lg w-fit"
            >
              <Star className="size-6" />
              <p>{user.points ?? 0}</p>
            </section>
          )}
          {user.joinedAt && <ConvertTimestamp time={user.joinedAt} />}
        </div>
        {options.infoBox && (
          <section className="flex items-center justify-between gap-2 [&>p]:text-base">
            <button
              className="text-white text-sm font-SpaceGrotesk bg-box-space px-2 rounded-md"
              onClick={toggleInfoBox}
            >
              {valueButton}
            </button>
          </section>
        )}
      </div>
      {options.infoBox && showInfo}
    </div>
  );
};

export default RankBox;
