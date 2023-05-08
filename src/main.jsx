import React from "react";
import ReactDOM from "react-dom/client";

import Root from "./pages/Root.jsx";

import "./index.css";

import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Link
} from "react-router-dom";
import ErrorPage from "./commons/ErrorPage.jsx";

const router = createBrowserRouter(createRoutesFromElements(
  <Route
    path="/"
    element={<Root />}
    errorElement={<ErrorPage />}
  >
  </Route>
));

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
