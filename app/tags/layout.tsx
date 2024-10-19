import { ReactNode } from "react";
import NavBar from "../components/Navbar";
import React from "react";
import NoiseEffect from "/public/noiseEffect.svg";

const LayoutOfTagsPage = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <NoiseEffect className="w-fit max-md:hidden mx-auto absolute left-[12.2%] -z-10 top-0" />
      <NavBar />
      {children}
    </>
  );
};

export default LayoutOfTagsPage;
