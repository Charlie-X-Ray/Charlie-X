import React from 'react'
import ReactDOM from 'react-dom/client'
import DefaultLayout from './commons/DefaultLayout.jsx'
import Root from './pages/Root.jsx'
import Gallery from './pages/Gallery.jsx'
import App from './commons/App.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'

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

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
