import MenuHamburger from "../Menu";
import NavLinks from "../NavLinks";
import Logo from "/public/logo.svg";
import Link from "next/link";
const NavBar = () => {
  return (
    <nav className="absolute top-0 gap-20 px-4 z-30 bg-transparent w-full py-12 md:px-28 mx-auto flex items-center">
      <section className="flex items-center gap-2">
        <MenuHamburger />
        <Link href={"/"}>
          <Logo />
        </Link>
      </section>
      <ul className="max-sm:hidden">
        <NavLinks value="create space" link="/create/space"/>
      </ul>
      {/* <ul className="flex items-center gap-4">
        <Link href={"https://x.com/IM3_live"}>
          <X />
        </Link>
        
        <Link href={"https://github.com/Im3-protocol"}>
          <Github />
        </Link>
      </ul> */}
    </nav>
  );
};
export default NavBar;
