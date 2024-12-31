import { useMemo, useState } from "react";
import ConvertTimestamp from "../ConvertTimesTamp";
import { RankBoxType } from "@/app/types";

const RankBox = ({ user, permission, meet }: RankBoxType) => {
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
        <section className="flex bg-box-space p-2 rounded-lg max-md:flex-col md:items-center gap-2">
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
    <li className="flex flex-col mr-3 justify-center gap-4 ">
      <div className="flex items-center justify-between w-full">
        <div className="flex gap-2 w-[80%] items-center">
          <section className="flex w-full items-center gap-2">
            <p className="font-SpaceGrotesk text-base text-white bg-box-space px-2 rounded-full">
              {user.rank + 1}
            </p>
            <h1 className="text-white  max-md:w-[80%] overflow-hidden whitespace-nowrap text-ellipsis text-base font-SpaceGrotesk">
              {user.name}
            </h1>
          </section>
        </div>
        <section className="flex items-center justify-between gap-2 [&>p]:text-base">
          <button
            className="text-white text-sm font-SpaceGrotesk bg-box-space px-2 rounded-md"
            onClick={toggleInfoBox}
          >
            {valueButton}
          </button>
        </section>
      </div>
      {showInfo}
    </li>
  );
};

export default RankBox;
