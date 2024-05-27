import { createBrowserRouter } from "react-router-dom";
import MainPage from "./routes/page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    index: true
  }
])

export default router;