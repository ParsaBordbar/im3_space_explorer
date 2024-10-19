import Image from "next/image";
import Graph from "/public/graph.svg?url";
import NavBar from "../Navbar";
import NoiseEffect from "/public/noiseEffect.svg";

const Header = () => {
  return (
    <header className="relative top-0  w-full h-[170px]  flex-col justify-center">
      <NoiseEffect className="w-fit max-md:hidden mx-auto absolute left-[12.2%] -z-10 top-0" />
      <NavBar />
      <h1 className="font-SpaceGrotesk text-white absolute left-[4%] md:left-[12%] top-[100%] md:top-[90%] text-4xl md:text-6xl font-bold">
        Spacehall
      </h1>
    </header>
  );
};

export default Header;
