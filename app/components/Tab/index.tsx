import React from "react";

interface TabProps {
  title: string;
  className?: string;
  children: React.ReactNode;
}

const Tab = ({ title, children, className }: TabProps) => {
  return <div className={`${className}`}>{children}</div>;
};

export default Tab;
