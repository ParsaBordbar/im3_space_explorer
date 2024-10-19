import { ReactNode } from "react";
import NavBar from "../components/Navbar";
import NoiseEffect from "/public/noiseEffect.svg";
import Image from "next/image";
const LayoutOfExploreSpace = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <NoiseEffect className='w-fit mx-auto absolute left-[12.2%] -z-10 top-0' />
      <NavBar />
      <main className="relative top-[35%] w-11/12 lg:w-[1040px] gap-10 mx-auto">
        {children}
      </main>
    </>
  );
};

export default LayoutOfExploreSpace;
