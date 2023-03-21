import { useContext } from "react";
import ProjectnApplicationContext from "../context/ProjectnApplicationProvider";

const useProjectnApplication = () => {
  return useContext(ProjectnApplicationContext);
};

export default useProjectnApplication;
