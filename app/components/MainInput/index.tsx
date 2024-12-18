"use client";
import {
  ChangeEvent,
  FunctionComponent,
  InputHTMLAttributes,
  forwardRef,
  useCallback,
  useState,
} from "react";
import MainButton from "../MainButton";
import { TInput } from "@/app/types";
import Dropdown from "../DropDown";

const MainInput = forwardRef<
  HTMLInputElement,
  TInput & { onChange?: (event: ChangeEvent<HTMLInputElement>) => void }
>((props, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  const FirstIcon = useCallback(() => {
    if (props.type === "password") {
      return (
        <div onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? (
            <img
              src="/svg/eye-slash.svg"
              alt="Close Eye"
              className="opacity-50"
            />
          ) : (
            <img src="/svg/eye.svg" alt="Open Eye" className="opacity-50" />
          )}
        </div>
      );
    } else {
      return props.iconFirst && <props.iconFirst />;
    }
  }, [showPassword]);

  const EndIcon = useCallback(() => {
    if (props.type === "password") {
      return (
        <div onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? (
            <img
              src="/svg/eye-slash.svg"
              alt="Close Eye"
              className="opacity-50"
            />
          ) : (
            <img src="/svg/eye.svg" alt="Open Eye" className="opacity-50" />
          )}
        </div>
      );
    } else {
      return props.iconEnd && <props.iconEnd />;
    }
  }, [showPassword]);

  const InputMode = useCallback(() => {
    if (props.mode == "input") {
      return (
        <input
          {...props.register}
          className={`${props.inputClassName} placeholder:text-base w-full text-white font-Nunito border-none outline-none bg-transparent`}
          {...props}
          ref={ref}
          autoComplete="off"
          type={showPassword ? "text" : props.type}
        />
      );
    }
  }, []);

  return (
    <>
      <div className={`flex w-full flex-col gap-1 ${props.parentClassName}`}>
        <label htmlFor="" className={`text-white font-SpaceGrotesk text-base`}>
          {props.label}
        </label>
        <section
          className={` rounded-lg  justify-between ${
            props.mode == "input" && "py-3 px-2"
          }  flex gap-2  bg-box-space `}
        >
          <div className="flex [&>svg]:w-[1.8rem] [&>svg>path]:stroke-neutral-800 flex-grow items-center gap-2">
            {props.iconFirst && FirstIcon()}
            {InputMode()}
            {EndIcon()}
          </div>
        </section>
      </div>
    </>
  );
});

MainInput.displayName = "MainInput";

export default MainInput;
