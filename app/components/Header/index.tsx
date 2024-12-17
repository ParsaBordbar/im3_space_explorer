import Image from "next/image";
import NavBar from "../Navbar";
import NoiseEffect from "/public/noiseEffect.svg?url";
import NoiseEffect3 from "/public/noiseEffect3.svg?url";

const Header = ({ mode, title }: { mode?: "justNavbar"; title?: string }) => {
  return (
    <header className="relative  w-full h-[170px]  flex-col justify-center">
      {/* <NoiseEffect className=" mx-auto  absolute left-0 right-0 bottom-0 transform translate-x-50  -z-10 top-0" /> */}
      <Image
        className="object-cover max-md:hidden left-0 right-0 top-0 w-full -z-10 absolute"
        src={NoiseEffect}
        width={5000}
        height={1}
        alt=""
      />
      <Image
        className="object-cover md:hidden left-0 right-0 top-0 w-full -z-10 absolute"
        src={NoiseEffect3}
        width={5000}
        height={1}
        alt=""
      />
      <NavBar />
      {mode != "justNavbar" && (
        <h1 className="font-SpaceGrotesk text-white absolute left-[4%] md:left-[12%] top-[100%] md:top-[90%] text-4xl md:text-6xl font-bold">
          {title ?? 'Spacehall'}
        </h1>
      )}
    </header>
  );
};

export default Header;
