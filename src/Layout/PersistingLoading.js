import "../scss/ploading.scss";
export default function PersistingLoading() {
  return (
    <div className="loaderContainer">
      <div className="loader">
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
      </div>
    </div>
  );
}
