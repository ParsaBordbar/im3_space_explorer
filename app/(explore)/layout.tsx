import { ReactNode } from "react";
import NavBar from "../components/Navbar";
import NoiseEffect from "/public/noiseEffect.svg";
import Image from "next/image";
const LayoutOfExploreSpace = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col gap-[50px]">
      <NoiseEffect className='w-fit max-md:hidden mx-auto absolute left-[12.2%] -z-10 top-0' />
      <NavBar />
      <main className="relative my-40 top-[35%] w-11/12 lg:w-[1040px] gap-10 mx-auto">
        {children}
      </main>
    </div>
  );
};

export default LayoutOfExploreSpace;
