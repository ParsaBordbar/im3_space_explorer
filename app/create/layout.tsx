import { ReactNode } from "react";
import Header from "../components/Header";

const CreateLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header title="Formhall"/>
      {children}
    </>
  );
};

export default CreateLayout;
