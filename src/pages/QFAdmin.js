import { useEffect } from "react";
import ProgressPage from "../CustomComponent/ProgressPage";
import useHead from "../hooks/useHead";

export default function QFAdmin() {
  const { setHeader } = useHead();

  useEffect(() => {
    setHeader((ps) => {
      return {
        ...ps,
        name: "QFAdmin",
      };
    });
  }, []);
  return <ProgressPage />;
}
