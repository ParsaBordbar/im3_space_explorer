// components/Dropdown.tsx
import { TInput } from "@/app/types";
import { useMemo, useState } from "react";
import { FieldValues, RegisterOptions } from "react-hook-form";
interface TDropDown extends TInput {
  itemsArray: string[];
  className?: string;
  onData: (data: string) => void;
  register?: <TFieldValues extends FieldValues>(
    name: keyof TFieldValues,
    options?: RegisterOptions
  ) => FieldValues;
}
const Dropdown = (props: TDropDown) => {
  const [selected, setSelected] = useState("Public");
  const [isOpen, setIsOpen] = useState(false);

  const renderItems = useMemo(() => {
    const handleSelect = (value: string) => {
      setSelected(value);
      props.onData(value);
      setIsOpen(false);
    };
    return props.itemsArray.map((item: string) => {
      return (
        <li
          key={item}
          onClick={() => handleSelect(item)}
          className="p-2.5 hover:bg-zinc-500 transition-all duration-200 ease-in-out text-base font-Nunito rounded-md w-full cursor-pointer text-white "
        >
          {item}
        </li>
      );
    });
  }, [props]);

  const updateDropDown = useMemo(() => {
    return (
      isOpen && (
        <ul className="absolute z-20 top-10 left-0 mt-4 bg-[#5b5b5d] flex flex-col gap-2 p-1.5 w-full rounded-md shadow-lg">
          {renderItems}
        </ul>
      )
    );
  }, [isOpen, renderItems]);

  const updateSelected = useMemo(() => {
    return <p className="text-white font-Nunito">{selected}</p>;
  }, [selected]);

  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        setIsOpen(!isOpen);
      }}
      className={`${props.className} flex w-full flex-col gap-1 ${props.parentClassName}`}
    >
      <label
        {...props.register}
        htmlFor=""
        className={`text-white font-SpaceGrotesk text-base`}
      >
        {props.label}
      </label>
      <section
        className={` rounded-lg relative justify-between ${
          props.mode == "input" && "py-3 px-2"
        }  flex gap-2  bg-box-space `}
      >
        <div className="flex [&>svg]:w-[1.8rem] [&>svg>path]:stroke-neutral-800 flex-grow items-center gap-2">
          {props.iconFirst && <props.iconFirst />}
          <button className="w-full flex items-center justify-between">
            {updateSelected}
            <svg
              className="w-5 h-5 ml-2 -mr-1 text-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {updateDropDown}
        </div>
      </section>
    </div>
  );
};

export default Dropdown;
