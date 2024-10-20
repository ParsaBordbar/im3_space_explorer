import { ReactNode } from "react";
import Header from "../components/Header";

const LayoutOfExploreSpace = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col gap-[50px]">
      <Header mode="justNavbar" />
      <main className="relative my-0 top-[35%] w-11/12 lg:w-[1040px] gap-10 mx-auto">
        {children}
      </main>
    </div>
  );
};

export default LayoutOfExploreSpace;
