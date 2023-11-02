import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root, { loader as rootLoader } from "./pages/Root";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      loader: rootLoader,
      id: "root",
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
