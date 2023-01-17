import { useEffect } from "react";
import useHead from "../hooks/useHead";

export default function NotFound() {
  const { setHeader } = useHead();

  useEffect(() => {
    setHeader((ps) => {
      return { ...ps, name: "notFound" };
    });
  }, []);

  return <h1>not found</h1>;
}
