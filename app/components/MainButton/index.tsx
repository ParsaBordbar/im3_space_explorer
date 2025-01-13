"use client";
import { TButton } from "@/app/types";
import Image from "next/image";
import { useCallback, useMemo } from "react";

const MainButton = (props: TButton) => {
  const declearModleOfButton = useMemo(() => {
    if (props.mode == "submit") {
      return "bg-black hover:bg-[#121212]";
    } else if (props.mode == "simple") {
      return "py-2  bg-[#1e1e1e] border border-[#ffffff] border-opacity-10";
    } else if (props.mode == "freez") {
      return "bg-[#1E1E1E] cursor-default";
    } else if (props.mode == "pro") {
      return "bg-[#036DE7] hover:bg-sky-700 font-bold";
    }
  }, [props.mode]);

  const checkIcon = useCallback(() => {
    if (props.iconSrc)
      return <Image src={props.iconSrc} height={16} width={16} alt="" />;
  }, [props.iconSrc]);
  return (
    <button
      {...props}
      className={`${props.className}  ${declearModleOfButton} ${
        props.iconSrc && "flex justify-center items-center gap-2"
      } text-center text-white `}
    >
      {checkIcon()}
      <span className={`font-Nunito`}>{props.value}</span>
    </button>
  );
};
export default MainButton;
