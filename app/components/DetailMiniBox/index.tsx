import { DetailMiniBoxType } from "@/app/types";
import Image from "next/image";


const DetailMiniBox = ({ icon, value, className, title }: DetailMiniBoxType) => {
  return (
    <li
      title={`${title}`}
      className={`flex items-center ${className}  bg-[#373737] rounded-lg px-1 py-0.5 gap-1 w-fit `}
    >
      <Image src={icon} width={14} height={14} alt="" />
      <p className="text-white">{value}</p>
    </li>
  );
};

export default DetailMiniBox;
