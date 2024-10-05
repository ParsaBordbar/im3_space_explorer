import Image from "next/image";
import UnLock from "/public/unlock.svg";
import Lock from "/public/lock.svg";
import Members from "/public/profile-2user.svg";
import { SpaceCardProps } from "@/app/types";
import DetailMiniBox from "../DetailMiniBox";
import Link from "next/link";
import Tag from "../Tag";
import Verify from "/public/verify.png";
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
  return (
    <Link
      href={!roomUrl ? "/im3" : `/${roomUrl}`}
      className={`${className} hover:bg-[#2a2a2a] cursor-pointer bg-[#1E1E1E] rounded-2xl flex flex-col gap-4 p-4`}
    >
      <div className="flex items-center gap-4">
        <Image
          src={logo_URL}
          width={80}
          height={80}
          alt="logo_space"
          className="contain-size"
        />
        <div className="flex flex-col w-full justify-between gap-2">
          <section className="flex items-center gap-2 ">
            <Image
              title={`${privateSpace ? "Public" : "Private"}`}
              src={privateSpace ? Lock : UnLock}
              width={16}
              className=""
              height={16}
              alt={privateSpace ? "public" : "Private"}
            />
            <section className="flex items-center gap-1">
              <h1 className="text-white overflow-clip whitespace-nowrap w-fit font-bold text-xl ">
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
          </section>
          <ul className="grid grid-cols-3 gap-4">
            <DetailMiniBox
              className="col-span-1"
              value={members}
              icon={Members}
              title={"max_member"}
            />
          </ul>
          <ul className="xl:flex hidden flex-wrap gap-2">
            {tags?.map((tag: string) => (
              <Tag tag={tag} key={tag} />
            ))}
          </ul>
        </div>
      </div>
        <ul className="xl:hidden flex flex-wrap gap-2">
          {tags?.map((tag: string) => (
            <Tag tag={tag} key={tag} />
          ))}
        </ul>
    </Link>
  );
};

export default SpaceCard;
