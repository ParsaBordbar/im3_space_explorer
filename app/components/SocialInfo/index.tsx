import { SocialInfoType } from "@/app/types";
import Image from "next/image";
import Link from "next/link";

const SocialInfo = ({
  icon,
  width,
  height,
  link,
  title,
  className
}: SocialInfoType) => {
  return (
    <Link href={`${link}`} className={`${className} flex items-center gap-1.5`}>
      <Image
        title={`${title}`}
        src={icon}
        width={width}
        height={height}
        alt=""
      />
      {/* <Link
        href={`${link}`}
        className="text-sm  md:inline-block hidden cursor-pointer hover:underline-offset-4 hover:underline font-semibold text-white"
      >
        {value}
      </Link> */}
    </Link>
  );
};

export default SocialInfo;
