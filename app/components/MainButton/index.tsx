"use client";
import {
  ButtonHTMLAttributes,
  FunctionComponent,
  useCallback,
  useMemo,
} from "react";
type TButton = ButtonHTMLAttributes<HTMLButtonElement> & {
  value?: string;
  className?: string;
  iconSrc?: FunctionComponent;
  submit?: boolean;
  simple?:boolean
};


const MainButton = (props: TButton) => {
  const declearModleOfButton = useMemo(() => {
    if (props.submit) {
      return "bg-black hover:bg-[#121212]";
    } else if(props.simple){
        return "hover:bg-[#2a2a2a] py-4 bg-[#1e1e1e] border border-[#ffffff] border-opacity-10"
    }
  }, []);
  
  const checkIcon = useCallback(() => {
    if (props.iconSrc) return <props.iconSrc />;
  }, []);
  return (
    <button
      {...props}
      className={`${
        props.className
      }  ${declearModleOfButton} ${
        props.iconSrc && "flex items-center gap-2"
      } text-center text-white ` }
    >
      {checkIcon()}
      <span className={``}>
        {props.value}
      </span>
    </button>
  );
};
export default MainButton;