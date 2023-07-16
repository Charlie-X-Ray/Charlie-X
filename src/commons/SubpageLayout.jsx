import { HiOutlineDocumentText } from 'react-icons/hi'
import {BsArrowLeftShort} from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { useState } from 'react'

import { FaPen, FaRegObjectGroup, FaRocketchat } from "react-icons/fa"
import { RiFileUserLine, RiStethoscopeFill } from"react-icons/ri"
import { TbInfoCircleFilled, TbReportSearch } from "react-icons/tb"

function DefaultChild() {

  return (
    <div className="flex h-full items-center justify-center bg-gray-400">
      Hi developer, add a child to change the default page layout!
    </div>
  )
}

function DefaultSideBar() {


  const newSideBar = (
    <div className="shrink-0 grow-0 flex flex-col overflow-hidden flex-nowrap bg-[#BAE5E3] gap-3 items-start h-full">
      <Link className="mx-1 text-clip whitespace-nowrap font-cutive text-2xl hover:text-blue-800" to="/">
        <BsArrowLeftShort />
      </Link>
      {/* <Link className="mx-1 text-clip whitespace-nowrap font-cutive text-2xl hover:text-blue-800" to="/about">
        <RiFileUserLine /> 
      </Link> */}
      <Link className="mx-1 text-clip whitespace-nowrap font-cutive text-2xl hover:text-blue-800" to="/browse">
        <TbInfoCircleFilled /> 
      </Link>
      <Link className="mx-1 text-clip whitespace-nowrap font-cutive text-2xl hover:text-blue-800" to="/learn">
        <TbReportSearch />
      </Link>
      <Link className="mx-1 text-clip whitespace-nowrap font-cutive text-2xl hover:text-blue-800" to="/insights">
        <RiStethoscopeFill /> 
      </Link>
      <Link className="mx-1 text-clip whitespace-nowrap font-cutive text-2xl hover:text-blue-800" to="/connect">
        <FaRocketchat /> 
      </Link>
    </div>
  );

  return newSideBar;

  const oldSideBar = (
    <div className="shrink-0 grow-0 flex flex-col overflow-hidden flex-nowrap bg-[#BAE5E3] gap-3 items-start fixed max-w-[24px] hover:max-w-full h-full">
      <section className="ml-1 mt-2" ><HiOutlineDocumentText /></section>
      <section className="ml-1 mt-[-5px]" ><BsArrowLeftShort /></section>
      <Link className="mx-2 text-clip whitespace-nowrap font-cutive text-xs hover:text-blue-800" to="/">Home</Link>
      <Link className="mx-2 text-clip whitespace-nowrap font-cutive text-xs hover:text-blue-800" to="/about">About Charlie X</Link>
      <Link className="mx-2 text-clip whitespace-nowrap font-cutive text-xs hover:text-blue-800" to="/browse">Browse</Link>
      <Link className="mx-2 text-clip whitespace-nowrap font-cutive text-xs hover:text-blue-800" to="/learn">Learn & Study</Link>
      <Link className="mx-2 text-clip whitespace-nowrap font-cutive text-xs hover:text-blue-800" to="/insights">Expert Insights</Link>
      <div className="mx-2 text-clip whitespace-nowrap font-cutive text-xs hover:text-gray-500">Connect</div>
    </div>
  );
}

function SubpageLayout({ children=<DefaultChild />, heading="Default Subpage" }) {

  return (
    <div className="flex flex-col max-w-screen h-screen bg-gradient-to-tr from-white to-[#AFDAF2]">
      <div className="shrink-0 grow-0 h-0 lg:h-[64px]" />
      <div className="flex grow flex-row overflow-hidden content-stretch">
        <DefaultSideBar />
        <div className="flex flex-col grow h-full max-w-full overflow-y-scroll">
          <div className="flex shrink-0 grow-0 h-[174px] bg-contain opacity-60 w-full items-center justify-center" style={{
            backgroundImage: `url("/chestxray.jpg")`
          }}>
            <h1 className="text-white text-6xl font-crimsontext font-bold">{ heading }</h1>
          </div>
          <div className="h-full">
            { children }
          </div>
        </div>
      </div>

    </div>
  )
}

const SearchBarButton = ({ children, onClick = () => null, onBlur }) => {
  
  const [bold, setBold] = useState(false)

  return (
    <button className={bold ? "font-bold" : "font-normal"} onClick={e => {
      onClick();
      setBold(!bold);
    }}
      onBlur={() => {onBlur(); setBold(false);} }
    >
      {children}
    </button>
  )
}

const SearchBar = ( { state, setState }) => {

  const letters = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
    'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
    'U', 'V', 'W', 'X', 'Y', 'Z',
  ]

  return (
    <div className="md:flex flex-col items-center justify-center w-full h-full hidden ">

      <div className="flex gap-3">
        {letters.map((l, i) => {
          return (
            <SearchBarButton key={i} onClick={() => {
              const re = new RegExp(`^${l}`, "i");
              setState(re);
            }} onBlur={() => {
              // Need to setState without rendering to dom yet.
              setState(new RegExp())
            }}>
              {l}
            </SearchBarButton>
            // <button className='focus:font-bold' key={i} onClick={() => {
            //   const re = new RegExp(`^${l}`, "i")
            //   setState(re);
            // }}>{l}</button>
          )
        })}
      </div>
      <input
        className="max-w-lg w-3/4 bg-slate-600 pl-2 text-white"
        placeholder="Search"
        onChange={ e => {
            const filterString = e.target.value
            const filterReg = new RegExp(filterString, "ig")
            console.log(filterReg)
            setState(filterReg)
          }}
        onClick={ e => { setState(new RegExp(e.target.value))}}
          />

    </div>
  )
}

export { SearchBar };
export default SubpageLayout;
