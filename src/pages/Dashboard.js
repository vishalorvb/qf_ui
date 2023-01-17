import { useEffect } from "react";
import useHead from "../hooks/useHead";

export default function Dashboard() {
  const { setHeader } = useHead();

  useEffect(() => {
    setHeader((ps) => {
      return { ...ps, name: "Dashboard" };
    });
  }, []);

  return <>Dashboard</>;
}
