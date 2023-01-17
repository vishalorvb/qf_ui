import { useEffect } from "react";
import useHead from "../hooks/useHead";

export default function Admin() {
  const { setHeader } = useHead();

  useEffect(() => {
    setHeader((ps) => {
      return { ...ps, name: "Admin" };
    });
  }, []);
  return <>Admin</>;
}
