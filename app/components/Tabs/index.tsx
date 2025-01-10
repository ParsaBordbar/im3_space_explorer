import React, { useState } from "react";

interface TabsProps {
  children: React.ReactNode[];
  className: string;
}

const Tabs = ({ children, className }: TabsProps) => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div className={`${className}`}>
      <div className="flex max-sm:justify-between gap-2 w-full">
        {React.Children.map(children, (child, index) =>
          React.isValidElement(child) ? (
            <label
              className={`cursor-pointer max-sm:text-base !rounded-[11px] hover:bg-[#5b5b5d3e] transition-all ease-in-out duration-200 text-white font-Nunito text-lg font-bold py-2 px-4 ${
                selectedTab === index ? "bg-box-space" : "bg-[#5b5b5d3e]"
              }`}
            >
              <input
                type="radio"
                name="tab"
                value={index}
                checked={selectedTab === index}
                onChange={() => setSelectedTab(index)}
                className="hidden"
              />
              {child.props.title}
            </label>
          ) : null
        )}
      </div>

      <div className="mt-4">
        {React.Children.toArray(children)[selectedTab]}
      </div>
    </div>
  );
};

export default Tabs;
