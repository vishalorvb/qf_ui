import { Divider } from "primereact/divider";
import useHead from "../hooks/useHead";

export default function PageHead() {
  const { header } = useHead();
  return (
    <>
      <div className="flex justify-content-between">
        <h2>{header.name}</h2>
        <h2>bread</h2>
      </div>
      <Divider type="solid" />
    </>
  );
}
