import { useContext } from "react";
import { HomeFeedResetContext } from "@/context/HomeFeedResetContext";

const useHomeFeedResetContext = () => {
  return useContext(HomeFeedResetContext);
};

export default useHomeFeedResetContext;
