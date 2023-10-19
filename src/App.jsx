import { RouterProvider } from "react-router-dom";
import { router } from "./Layout/RouterTree";
import "./App.scss";
import { AuthProvider } from "./context/AuthProvider";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </div>
  );
}

export default App;
