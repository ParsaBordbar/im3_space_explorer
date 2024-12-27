import Image from "next/image";
import NoiseEffect from "/public/noiseEffect2.svg?url";
const InfoMiniBox = ({
  title,
  desc,
  className
}: {
  title: number | string;
  desc: string;
  className: string;
}) => {
  return (
    <div className={`${className} p-4 relative flex z-0 items-end gap-2 bg-box-space rounded-xl`}>
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
      <p className="capitalize text-base select-none font-SpaceGrotesk text-white">
        {desc}
      </p>
    </div>
  );
};

export default InfoMiniBox;
