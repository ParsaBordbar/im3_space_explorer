import Image from "next/image";
import Logo from "/public/logo.svg";
import Github from "/public/github.svg";
import X from "/public/x.svg";
import Link from "next/link";

const NavBar = () => {
  return (
    <section className="absolute top-0 z-10 bg-transparent w-11/12 md:w-full py-14 md:px-28 mx-auto flex items-center justify-between">
      <Link href={"/"}>
        <Logo />
      </Link>
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
