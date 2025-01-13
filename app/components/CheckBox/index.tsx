// components/CheckboxWithIcon.tsx
"use client";
import { useEffect, useState } from "react";

const CheckboxWithIcon = ({
  value,
  sendDataToParent,
}: {
  value: string;
  sendDataToParent: (data: string, isChecked: boolean) => void;
}) => {
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    sendDataToParent(value, isChecked);
  }, [isChecked]);
  return (
    <div
      onClick={toggleCheckbox}
      className={`flex items-center bg-box-space gap-1 w-fit p-2 cursor-pointer rounded-lg `}
    >
      {isChecked && (
        <svg
          className="w-4 h-4 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
      )}
      <span className="text-white select-none font-Nunito text-sm">
        {value}
      </span>
    </div>
  );
};

export default CheckboxWithIcon;
