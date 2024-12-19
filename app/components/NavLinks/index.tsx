import { TNavLinks } from "@/app/types";
import Link from "next/link";

const NavLinks = ({ value, link, onClick }: TNavLinks) => {
  return (
    <Link
      {...onClick}
      href={`${link}`}
      className="text-white capitalize transition-all duration-200 ease-in-out hover:bg-[#5b5b5d3e] rounded-[11px] p-2 font-SpaceGrotesk "
    >
      {value}
    </Link>
  );
};

export default NavLinks;
