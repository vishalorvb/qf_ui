import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import AccordionTemplate from "../../CustomComponent/AccordionTemplate";
import useHead from "../../hooks/useHead";
import Pages from "./PagesComponents/Pages";

export default function PagesnScreens() {
  const { setHeader } = useHead();
  const location = useLocation();
  console.log(location);
  useEffect(() => {
    setHeader((ps) => {
      return {
        ...ps,
        name: location?.state?.module_name,
        buttonName: "Create Application",
      };
    });
  }, []);
  return (
    <>
      <AccordionTemplate name={"Pages"} defaultState={true}>
        <Pages location={location} />
      </AccordionTemplate>
      <AccordionTemplate name={"Screens"} defaultState={false}>
        ....Loading
      </AccordionTemplate>
    </>
  );
}
