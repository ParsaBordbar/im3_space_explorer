import { useMemo, useState } from "react";
import ConvertTimestamp from "../ConvertTimesTamp";
import { RankBoxType } from "@/app/types";
import Link from "next/link";

const RankBox = ({ user, permission, options, meet }: RankBoxType) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  //calling the this hook to find out is admin or not
  const toggleInfoBox = () => {
    setIsOpen(!isOpen);
  };

  //show the informations of permissions
  const showInfo = useMemo(() => {
    return (
      isOpen &&
      permission && (
        <section className="flex bg-box-space p-2 rounded-lg max-md:flex-col [&>*]:max-sm:text-sm md:items-center gap-2">
          {permission.canPublish == true && (
            <p className="text-white font-SpaceGrotesk select-none capitalize">
              Can subscribe
            </p>
          )}
          {permission.canPublish == true && (
            <p className="text-white font-SpaceGrotesk select-none capitalize">
              Can Publish
            </p>
          )}
          {permission.canPublishData == true && (
            <p className="text-white font-SpaceGrotesk select-none capitalize">
              Can Publish Data
            </p>
          )}
          {permission.recorder == true && (
            <p className="text-white font-SpaceGrotesk select-none capitalize">
              recorder
            </p>
          )}
          <ConvertTimestamp time={user.joinedAt} />
        </section>
      )
    );
  }, [isOpen]);

  // Update value of the button (more / less)
  const valueButton = useMemo(() => {
    return isOpen ? "Less" : "More";
  }, [isOpen]);

  return (
    <Link
      href={`/${meet?.slug}/${user.identity}`}
      className="flex flex-col hover:bg-[#5b5b5d3e]  transition-all ease-in-out duration-200 p-2 rounded-lg justify-center gap-4 "
    >
      <div className="flex items-center justify-evenly w-full">
        <div
          className={`flex justify-between flex-wrap gap-2 ${
            options.infoBox ? "w-[80%]" : "w-full"
          } items-center`}
        >
          <section className="flex w-fit items-center gap-2">
            {options.isRank && (
              <p className="font-SpaceGrotesk text-base text-white bg-box-space px-2 rounded-full">
                {user.rank + 1}
              </p>
            )}
            <h1 className="text-white  max-md:w-[80%] overflow-hidden whitespace-nowrap text-ellipsis text-base font-SpaceGrotesk">
              {user.name}
            </h1>
          </section>
          {meet?.count && <span className="text-white font-SpaceGrotesk">{meet.count} Number Created</span>}
          <ConvertTimestamp time={user.joinedAt} />
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
    </Link>
  );
};

export default RankBox;
