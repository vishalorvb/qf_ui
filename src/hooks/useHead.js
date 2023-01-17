import HeadContext from "../context/HeaderProvider";
import { useContext } from "react";

const useHead = () => {
  return useContext(HeadContext);
};

export default useHead;
