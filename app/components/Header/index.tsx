import Image from "next/image";
import Graph from "/public/graph.svg?url";
import NavBar from "../Navbar";

const Header = () => {
    return(
        <header className="relative  w-full  flex-col justify-center">
        <NavBar/>
        <h1 className="text-white absolute left-[10%] md:left-[13%] md:top-[30%] text-2xl md:text-5xl font-bold">
          Spacehall
        </h1>
        <Image src={Graph} width={5000} height={1000} className="object-cover" alt="graph" />
      </header>
    )
}

export default Header