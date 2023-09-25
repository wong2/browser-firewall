import { render } from "preact";
import { RouterProvider, createHashRouter } from "react-router-dom";
import "./global.css";
import OptionsPage, { loadAll as loadOptionsData } from "./routes/Options";

const router = createHashRouter([
  {
    path: "/",
    element: <OptionsPage />,
    loader: () => loadOptionsData(),
  },
]);

render(<RouterProvider router={router} />, document.getElementById("app")!);
