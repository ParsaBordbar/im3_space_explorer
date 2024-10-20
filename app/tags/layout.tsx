import { ReactNode } from "react";
import Header from "../components/Header";

const LayoutOfTagsPage = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header mode="justNavbar" />
      {children}
    </>
  );
};

export default LayoutOfTagsPage;
