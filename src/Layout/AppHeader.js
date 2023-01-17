import { Avatar } from "primereact/avatar";
export default function AppHeader() {
  return (
    <div className="flex justify-content-between">
      <span>
        <i className="pi pi-align-left"></i>
      </span>
      <span>
        <Avatar
          icon="pi pi-user"
          className="mr-2"
          size="xlarge"
          shape="circle"
        />
        welcome Ravi
      </span>
    </div>
  );
}
