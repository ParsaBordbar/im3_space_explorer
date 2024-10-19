import { DetailMiniBoxType } from "@/app/types";
import Image from "next/image";

const DetailMiniBox = ({
  icon,
  value,
  className,
  title,
}: DetailMiniBoxType) => {
  return (
    <li
      title={`${title}`}
      className={`flex items-center ${className}  bg-[rgba(19,19,19,0.3)] rounded-md px-3 py-1 gap-2 w-fit `}
    >
      <Image src={icon} width={16} height={16} alt="" />
      <p className="text-white text-xl font-SpaceGrotesk">{value}</p>
    </li>
  );
};

export default DetailMiniBox;
