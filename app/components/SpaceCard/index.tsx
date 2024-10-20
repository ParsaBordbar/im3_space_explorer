import Image from "next/image";
import UnLock from "/public/unlock.svg?url";
import Lock from "/public/lock.svg?url";
import Members from "/public/profile-2user.svg?url";
import { SpaceCardProps } from "@/app/types";
import DetailMiniBox from "../DetailMiniBox";
import Link from "next/link";
import Tag from "../Tag";
import Verify from "/public/verify.svg?url";

const SpaceCard = ({
  className,
  logo_URL,
  name_space,
  members,
  privateSpace,
  roomUrl,
  tags,
  verified,
}: SpaceCardProps) => {
  const handelRoomURL = (url: string) => {
    console.log(roomUrl);
    return url?.replace(/ /g, "_");
  };
  return (
    <Link
      href={!roomUrl ? "/im3" : `/${handelRoomURL(roomUrl)}`}
      className={`${className} relative cursor-pointer bg-box-space rounded-2xl flex flex-col gap-7 p-4 md:p-8`}
    >
      <div className="flex items-center gap-4">
        <div className="bg-[#131313] bg-opacity-70 w-[95px] h-[80px] flex items-center justify-center rounded-2xl ">
          <Image src={logo_URL} width={44} height={40} alt="logo" />
        </div>
        <div className="flex flex-col w-full justify-between gap-3">
          <section className="flex items-center gap-2 ">
            <section className="flex items-center gap-2">
              <h1 className="text-white font-SpaceGrotesk overflow-clip whitespace-nowrap w-fit font-bold text-xl ">
                {name_space}
              </h1>
              {verified && (
                <Image
                  title="verify"
                  className=""
                  src={Verify}
                  width={20}
                  height={20}
                  alt="verify"
                />
              )}
            </section>
            <Image
              title={`${!privateSpace ? "Public" : "Private"}`}
              src={!privateSpace ? Lock : UnLock}
              width={14}
              className=""
              height={14}
              alt={!privateSpace ? "public" : "Private"}
            />
          </section>
          <ul className="grid grid-cols-3 gap-4">
            <DetailMiniBox
              className=" col-span-2 sm:col-span-1"
              value={members}
              icon={Members}
              title={"max_member"}
            />
          </ul>
        </div>
      </div>
      <ul className="items-center flex flex-wrap gap-2">
        {tags?.map((tag: string) => (
          <Tag tag={tag} key={tag} />
        ))}
      </ul>
    </Link>
  );
};

export default SpaceCard;
