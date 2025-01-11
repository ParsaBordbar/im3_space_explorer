import { useState } from "react";
import SpaceSection from "../SpaceSection";
import SearchBar from "../SearchBar";

const ExploreSpaces = () => {
  const [search, setSearch] = useState<string>("");

  const handleDataFromChild = (data: string) => {
    setSearch(data);
  };
  return (
    <div className="flex flex-col mt-14 gap-4">
      <SearchBar filters sendDataToParent={handleDataFromChild} />
      <SpaceSection search={search ?? " "} />
    </div>
  );
};

export default ExploreSpaces;
