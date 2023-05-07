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

const router = createBrowserRouter(createRoutesFromElements(
  <Route
    path="/"
    element={<Root />}
    errorElement={<div className="flex h-screen justify-center items-center"><Link to={`/`}><button className="rd-sm p-1 bg-green-500 hover:bg-green-700">Go home</button></Link></div>}
  >
  </Route>
));

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
