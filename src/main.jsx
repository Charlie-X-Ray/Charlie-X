import React from "react";
import ReactDOM from "react-dom/client";

import Root from "./pages/Root.jsx";
import ErrorPage from "./commons/ErrorPage.jsx";
import About from "./pages/About.jsx";
import Browse from "./pages/Browse.jsx";
import Insights from "./pages/Insights.jsx";

import "./index.css";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/browse",
    element: <Browse />,
  },
  {
    path: "/insights",
    element: <Insights />,
  },
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
