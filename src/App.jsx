import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Root from "../pages/Root"
import DefaultLayout from "./DefaultLayout"
import Gallery from "../pages/Gallery"
import LearnStudy from "../pages/LearnStudy"
import FlashcardFrontPage from "../pages/FlashcardFrontPage"

const router = createBrowserRouter([
  {
    path: "/home",
    element: <Root />,
  },
  {
    path: "/",
    element: <DefaultLayout />,
    children:[
      {
        index: true,
        element:
        <div className='flex flex-col h-full justify-center items-center bg-inherit font-mono'>
          <h1 className="text-8xl">Hi</h1>
          <p className="text-2xl">Welcome to the overview</p>
        </div>
      },
      {
        path:"gallery",
        element: <Gallery />,
      },
    ]
  }
])

export default function App() {
  return (
    <RouterProvider router={router}></RouterProvider>
  )
}