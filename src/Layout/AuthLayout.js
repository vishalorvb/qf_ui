import AppLayout from "./AppLayout";
import Login from "./Login";

export default function AuthLayout() {
  return <>{false ? <Login /> : <AppLayout />}</>;
}
