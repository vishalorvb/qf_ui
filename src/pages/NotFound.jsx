import { useEffect } from "react";
import useHead from "../hooks/useHead";

export default function NotFound() {
  const { setHeader } = useHead();

  useEffect(() => {
    setHeader((ps) => {
      return { ...ps, name: "notFound" };
    });
  }, [setHeader]);

  return <>Not Found</>;
}
