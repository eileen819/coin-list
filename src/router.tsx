import { createBrowserRouter } from "react-router-dom";
import Home from "./routes/Home";
import Coin from "./routes/Coin";
import App from "./App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: ":coinId",
        element: <Coin />,
      },
    ],
  },
]);

export default router;
