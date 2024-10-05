import { ReactNode } from "react";
import NavBar from "../components/Navbar";
import React from "react";

const LayoutOfTagsPage = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
};

export default LayoutOfTagsPage;
