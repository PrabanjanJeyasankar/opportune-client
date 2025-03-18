import { createContext, useState } from "react";
export const HomeFeedResetContext = createContext();

const HomeFeedResetContextProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");

  return (
    <HomeFeedResetContext.Provider
      value={{ searchTerm, setSearchTerm, selectedTag, setSelectedTag }}
    >
      {children}
    </HomeFeedResetContext.Provider>
  );
};

export default HomeFeedResetContextProvider;
