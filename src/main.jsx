import React from "react";
import ReactDOM from "react-dom/client";

import Root from "./pages/Root.jsx";
import ErrorPage from "./commons/ErrorPage.jsx";
import Browse from "./pages/Browse.jsx";
import Insights from "./pages/Insights.jsx";
import LearnStudy from "./pages/LearnStudy.jsx";
import Connect from "./pages/Connect.jsx";

import { ChakraProvider } from "@chakra-ui/react";
import { FlashcardApp } from "./pages/LearnStudy.jsx";
import FlashcardFrontPage from "./pages/FlashcardFrontPage.jsx";

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
    path: "/browse",
    element: <Browse />,
  },
  {
    path: "/insights",
    element: <Insights />,
  },
  {
    path: "/Learn",
    element: <LearnStudy />,
    children: [
      {
        path:"Flashcards",
        element: <FlashcardApp/>
      },
      {
        path:"",
        element: <FlashcardFrontPage/>
      }
    ]
  },
  {
    path: "/connect",
    element: <Connect />,
  },
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);

export {router}