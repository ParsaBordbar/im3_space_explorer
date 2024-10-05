import { ReactNode } from "react";
import React from "react";
import Navbar from "../components/Navbar";

const LayoutOfTagsPage = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      
      <main className="grid my-10 w-11/12 md:w-[75%] gap-10 mx-auto grid-cols-2">
          <h1 className="text-white text-lg font-bold col-span-full">
            Explore Spaces
          </h1>
        {children}
      </main>
    </>
  );
};

export default LayoutOfTagsPage;
