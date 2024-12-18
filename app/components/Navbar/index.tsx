import Logo from "/public/logo.svg";
import Link from "next/link";

const NavBar = () => {
  return (
    <section className="absolute top-0 gap-20 px-4 z-10 bg-transparent w-11/12 md:w-full py-12 md:px-28 mx-auto flex items-center">
      <Link href={"/"}>
        <Logo />
      </Link>
      <ul>
        <Link
          href={"/create/space"}
          className="text-white transition-all duration-200 ease-in-out hover:bg-[#5b5b5d3e] rounded-[11px] p-2 font-SpaceGrotesk "
        >
          Create Space
        </Link>
      </ul>
      {/* <ul className="flex items-center gap-4">
        <Link href={"https://x.com/IM3_live"}>
          <X />
        </Link>
        
        <Link href={"https://github.com/Im3-protocol"}>
          <Github />
        </Link>
      </ul> */}
    </section>
  );
};
export default NavBar;
