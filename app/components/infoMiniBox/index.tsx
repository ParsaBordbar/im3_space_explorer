import Image from "next/image";
import NoiseEffect from "/public/noiseEffect2.svg?url";
import Link from "next/link";
const InfoMiniBox = ({
  title,
  desc,
  className,
  link,
}: {
  title: number | string;
  desc: string;
  className: string;
  link?: string;
}) => {
  return (
    <div
      className={`${className} p-4 relative flex z-0 items-end gap-2 bg-[#5b5b5d3e]  rounded-xl`}
    >
      <Image
        className="absolute object-cover h-full w-full  -z-20 bottom-0 top-0 left-0 "
        width={5000}
        height={5000}
        src={NoiseEffect}
        alt=""
      />
      <h1 className="text-white select-none font-SpaceGrotesk text-6xl">
        {title}
      </h1>
      <section className="flex items-center justify-between w-full">
        <p className="capitalize text-base select-none font-SpaceGrotesk text-white">
          {desc}
        </p>
        {link && (
          <Link
            href={`${link}`}
            className="text-white text-sm font-SpaceGrotesk bg-box-space px-2 rounded-md"
          >
            More
          </Link>
        )}
      </section>
    </div>
  );
};

export default InfoMiniBox;
