import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import PagesTable from "../PagesTable";
import useHead from "../../../hooks/useHead";
export default function CreateScreen() {
  const location = useLocation();
  const { setHeader } = useHead();

  useEffect(() => {
    setHeader((ps) => {
      return {
        ...ps,
        name: "Create Screen",
      };
    });
    return () =>
      setHeader((ps) => {
        return {
          ...ps,
          name: "",
        };
      });
  }, []);
  return (
    <>
      <PagesTable location={location} actionType="screen" />
    </>
  );
}
