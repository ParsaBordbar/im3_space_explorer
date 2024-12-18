"use client";
import { useEffect, useState } from "react";
import Add from "/public/add.svg";
import Minus from "/public/minus.svg";
import More from "/public/more-circle.svg";

const ItemInput = (props: {
  label: string;
  mode?: "disable" | null;
  register?: any;
  registerValue: string;
  className?: string;
  onData: (data: string[]) => void;
}) => {
  const [items, setItems] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setOpen] = useState(false);

  const handleAddItem = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (inputValue.trim() !== "") {
      setItems([...items, inputValue]);
      setInputValue("");
    }
  };

  

  const sendDataToParent = (inputValue: string[]) => {
    props.onData(inputValue); // Pass the current state to the parent
  };

  const handleDeleteItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  useEffect(() => {
    console.log("this the items in admins ", items);
    sendDataToParent(items);
  }, [items]);

  return (
    <div
      className={`${props.className} ${
        props.mode == "disable" && "!opacity-30"
      } relative flex group flex-col gap-1`}
    >
      <label htmlFor="" className="text-white font-SpaceGrotesk text-base">
        {props.label + ` ${items.length}`}
      </label>
      <div className="grid grid-cols-4 gap-2  bg-box-space rounded-lg">
        <input
          type="text"
          {...props}
          disabled={props.mode == "disable"}
          value={inputValue}
          placeholder="0xfA...93Fc650eC0"
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-1 px-2 py-3 col-span-3 placeholder:text-sm text-white bg-transparent font-Nunito  focus:outline-none "
        />
        <section className="py-3 px-2  col-span-1 flex items-center max-md:place-self-center md:place-self-end gap-1">
          <button
            title="add"
            onClick={(e) => handleAddItem(e)}
            className="focus:outline-none"
          >
            <Add className="[&>path]:stroke-white [&>path]:hover:stroke-slate-300 transition-all duration-200 ease-in-out " />
          </button>
          <p
            title={props.label}
            onClick={() => items.length != 0 && setOpen(true)}
            className=" cursor-pointer"
          >
            <More className="[&>path]:stroke-white w-8  [&>path]:hover:stroke-slate-300 transition-all duration-200 ease-in-out " />
          </p>
        </section>
      </div>
      {isOpen && (
        <div
          className={`bg-glass flex flex-col !rounded-none items-center justify-start w-full h-screen z-30 fixed top-0 left-0 ${
            items.length == 0 && "hidden"
          }`}
        >
          <ul
            className={`mt-4 bg- drop-shadow-md overflow-y-auto flex flex-col gap-3 p-4 z-20 rounded-lg w-10/12 md:w-2/3 lg:w-8/12 mx-auto ${
              items.length == 0 && "hidden"
            } space-y-2`}
          >
            <nav className="flex gap-4 items-center w-full">
              <Add
                onClick={() => setOpen(false)}
                className="[&>path]:stroke-white [&>path]:hover:stroke-slate-300 transition-all duration-200 ease-in-out cursor-pointer rotate-45"
              />
              <h1 className="font-SpaceGrotesk text-3xl text-white">
                {props.label}
              </h1>
            </nav>
            {items.map((item, index) => (
              <li
                key={index}
                className="flex justify-between text-white items-center px-4 py-3 bg-box-space  rounded-lg"
              >
                <p className="text-sm font-Nunito">{index + 1 + ". " + item}</p>
                <div
                  title="delete"
                  onClick={() => handleDeleteItem(index)}
                  className=" cursor-pointer rounded-full bg-box-space shadow-inner  flex items-center justify-center"
                >
                  <Minus className="[&>path]:stroke-white [&>path]:hover:stroke-slate-300 transition-all duration-200 ease-in-out" />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ItemInput;
