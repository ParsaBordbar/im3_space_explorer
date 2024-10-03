import { ReactNode } from "react";
import NavBar from "../components/Navbar";

const LayoutOfExploreSpace = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <NavBar />
      <main className="my-10 bg-[#373737] p-4 rounded-2xl bg-opacity-10 w-11/12 lg:w-[75%] gap-10 mx-auto">
        {children}
      </main>
    </>
  );
};

export default LayoutOfExploreSpace;
