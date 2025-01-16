"use client";
import { useCallback, useState } from "react";
import Menu from "/public/menu.svg";
import Logo from "/public/logo.svg";
import Add from "/public/add.svg";
import NavLinks from "../NavLinks";

const MenuHamburger = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const menuContent = useCallback(() => {
    return (
      <div
        className={`fixed z-50 ${
          isOpen ? "!opacity-100 !top-0" : "-top-[70rem] opacity-0"
        } transition-all duration-200 flex flex-col gap-20 ease-in-out px-4 py-12 left-0 right-0 h-screen w-full bg-[#010101]`}
      >
        <section className="flex items-center gap-2">
          <Add
            onClick={() => setOpen(false)}
            className="rotate-45 [&>path]:stroke-white"
          />
          <Logo />
        </section>
        <main className="flex flex-col space-y-4">
          <li onClick={() => setOpen(false)}>
            <NavLinks value="create space" link="/create/space" />
          </li>
          <li onClick={() => setOpen(false)}>
            <NavLinks value="Leader board" link="/?tab=leaderBoard" />
          </li>
        </main>
      </div>
    );
  }, [isOpen]);

  return (
    <menu>
      <div onClick={() => setOpen(true)}>
        <Menu className="sm:hidden" />
      </div>
      {menuContent()}
    </menu>
  );
};

export default MenuHamburger;
