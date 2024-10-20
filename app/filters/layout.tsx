import { ReactNode } from "react";
import Header from "../components/Header";

const LayoutOfFiltersPage = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header mode="justNavbar"/>
      {children}
    </>
  );
};

export default LayoutOfFiltersPage;
