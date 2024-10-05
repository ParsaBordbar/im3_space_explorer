import { ReactNode } from "react";
import NavBar from "../components/Navbar";

const LayoutOfTagsPage = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
};

export default LayoutOfTagsPage;
