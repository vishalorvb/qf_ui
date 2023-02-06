import React, { useEffect } from "react";
import TestCases from "../Components/TestCases/TestCases";
import useHead from "../hooks/useHead";

function Testcase() {
  const { setHeader } = useHead();
  useEffect(() => {
    setHeader((ps) => {
      return {
        ...ps,
        name: "TestCases",
      };
    });
  }, []);
  return <TestCases />;
}

export default Testcase;
