import { ReactNode } from "react";
import Header from "../components/Header";

const SeachingLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header mode="justNavbar" />
      {children}
    </>
  );
};

export default SeachingLayout;
