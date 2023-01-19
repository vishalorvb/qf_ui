import { useEffect } from "react";
import useHead from "../hooks/useHead";

export default function ApiCreateEdit() {
  const { setHeader } = useHead();

  useEffect(() => {
    setHeader((ps) => {
      return { ...ps, name: "API create edit" };
    });
  }, []);

  return <h1>In development</h1>;
}
