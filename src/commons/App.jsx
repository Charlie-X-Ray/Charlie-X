import { useState } from "react"
import { Link, Outlet } from "react-router-dom"
import { FaHome } from "react-icons/fa"

function NavBarButton({ link, children }) {
  return (
    <Link to={link}>
      <button className="flex text-center h-full bg-slate-600 px-2 pb-1 text-xl
       text-white hover:bg-white hover:text-slate-600 rounded-lg">
        {children}
      </button>
    </Link>
  )
}

function NavBar() {

  const buttons = [
    {
      link: `/`,
      children: <>/</>,
    },
    {
      link: `/gallery`,
      children: <>Gallery</>,
    },
    // ...([...Array(100).keys()].map(x => ({link: `/`, children:(x).toString()})))
  ]

  return (
    <div className="flex flex-row shrink-0 w-screen overflow-hidden hover:overflow-x-auto items-center gap-2 py-1 pl-2 bg-emerald-500">
      <div>
        <Link to={`/home`}>
          <button className="flex text-center text-white hover:text-slate-600 text-2xl">
            <FaHome />
          </button>
        </Link>
      </div>
      {buttons.map((button, i) =>
        <div key={i}>
          <NavBarButton {...button} />
        </div>
      )}
    </div>
  )
}

function App() {

  return (
    <div className="flex flex-col h-screen w-screen left-0 top-0 bg-slate-600 text-white">
      <NavBar />
      <Outlet />
    </div>
  )
}

export default App
