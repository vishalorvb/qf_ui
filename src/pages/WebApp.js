import { useEffect } from "react";
import useHead from "../hooks/useHead";
import Table from "../CustomComponent/Table";

export default function WebApp() {
  const { setHeader } = useHead();

  useEffect(() => {
    setHeader((ps) => {
      return { ...ps, name: "Web" };
    });
  }, []);

  return <Table rows={[]} columns={[]} />;
}
