import { useEffect } from "react";
import useHead from "../hooks/useHead";
import Api from "../Components/ApiComponents/Api";
import { useLocation, useNavigate } from "react-router-dom";
export default function ApiCreateEdit() {
  const { setHeader } = useHead();

  useEffect(() => {
    setHeader((ps) => {
      return { ...ps, name: "API create edit" };
    });
  }, []);
  const location = useLocation()
  // const navigate = useNavigate();
  console.log(location.state.id)
  return (<div>
    <h1>Api create Edit</h1>
    <Api></Api>
  </div>);
}
