import { useEffect } from "react";
import useHead from "../hooks/useHead";
import Api from "../Components/ApiComponents/Api";
export default function ApiCreateEdit() {
  const { setHeader } = useHead();

  useEffect(() => {
    setHeader((ps) => {
      return { ...ps, name: "API create edit" };
    });
  }, []);

  return (<div>
    <Api></Api>
  </div>);
}
