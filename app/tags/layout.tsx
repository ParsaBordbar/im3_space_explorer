import { ReactNode } from "react";
import Header from "../components/Header";
import React from "react";

const LayoutOfTagsPage = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <main className="grid my-10 w-11/12 md:w-[75%] gap-10 mx-auto grid-cols-2">
        {children}
      </main>
    </>
  );
};

export default LayoutOfTagsPage;
