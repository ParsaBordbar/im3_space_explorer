import Image from "next/image";
import Logo from "/public/logo.svg";
import Github from "/public/github.svg";
import X from "/public/x.svg";
import Link from "next/link";

const NavBar = () => {
  return (
    <section className=" bg-[#121212] w-11/12 md:w-full py-8 md:px-8 mx-auto flex items-center justify-between">
      <Link href={"/"}>
        <Image src={Logo} width={100} height={26} alt="logo" />
      </Link>
      <ul className="flex items-center gap-4">
        <Link href={"https://x.com/IM3_live"}>
          <Image src={X} width={24} height={24} alt="X" />
        </Link>
        {/* <li>
              <Image src={Discord} width={32} height={32} alt="discord" />
            </li> */}
        <Link href={"https://github.com/Im3-protocol"}>
          <Image src={Github} width={24} height={24} alt="Github" />
        </Link>
      </ul>
    </section>
  );
};
export default NavBar;
