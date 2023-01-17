import useHead from "../hooks/useHead";
import Breadcrumbs from "./Breadcrumbs";

export default function PageHead() {
  const { header } = useHead();
  return (
    <>
      {header?.name === "notFound" ? (
        ""
      ) : (
        <div className="flex justify-content-between">
          <h2>{header.name}</h2>
          <Breadcrumbs />
        </div>
      )}
    </>
  );
}
