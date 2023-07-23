import { Link } from "react-router-dom";
import Image from "../commons/Image";
import { FaPen, FaRocketchat } from "react-icons/fa"
import { RiFileUserLine, RiStethoscopeFill } from"react-icons/ri"
import { TbInfoCircleFilled, TbReportSearch } from "react-icons/tb"
import { useState } from "react";

function NavBar() {

  const buttons = [
    // {
    //   msg: "About Charlie X",
    //   icon: <RiFileUserLine />,
    //   linkto: "/about",
    // },
    {
      msg: "Browse",
      icon: <TbInfoCircleFilled />,
      linkto: "/browse",
    },
    {
      msg: "Learn & Study",
      icon: <TbReportSearch />,
      linkto: "/learn",
    },
    {
      msg: "Expert Insights",
      icon: <RiStethoscopeFill />,
      linkto: "/insights",
    },
    {
      msg: "Connect",
      icon: <FaRocketchat />,
      linkto: "/connect",
    },
  ]

  return (
    <div className="flex flex-row w-screen gap-2">
      {
        buttons.map(({ msg, icon = <></>, linkto }, i) =>
          <Link className="grow flex" to={linkto} key={i}>
            <button
              className={`bg-[#BAE5E3] grow flex flex-row justify-center items-center text-center rounded-b-xl text-2xl lg:text-xl lg:gap-2 py-1 hover:bg-[#88a8a7]`}
              key={i}
              data-test="rootbutton"
            >
              {icon}
              <h2 className="text-[0px] lg:visible lg:w-auto lg:h-auto lg:text-base">
                {msg}
              </h2>
            </button>
          </Link>
        ) 
      }
    </div>
  )
}

function ExploreBar( { value, onChange }) {

  return (
    <div className="flex w-full text-md lg:text-2xl max-w-screen-md rounded-full bg-[#D2FCF9]/50 pl-6 py-4 items-center hover:bg-[#D2FCF9]/80">
      <FaPen />
      <input
        className="text-black bg-transparent ml-4 grow mr-5 focus:bg-none focus:outline-none focus:bg-opacity-100 placeholder:text-slate-400"
        placeholder="Explore (Nothing to explore for now)"
        value = { value }
        onChange = { onChange }>
      </input>
    </div>
  )
}

function Root() {

  return (
    <div className="flex flex-col w-screen h-screen bg-gradient-to-tr from-white to-[#AFDAF2] bg-green-500 ">
      <div className="flex flex-col w-full shrink-0 h-2/6 lg:h-2/3">
        <div className="h-0 lg:h-16" />
        <div className="flex flex-col grow bg-opacity-10 bg-cover bg-no-repeat" style={{
          backgroundImage: `url("/bg_combined.png")`
        }}>
          <div className="font-iceland h-2/6 lg:h-2/6 text-center">
            <h1 className="font-bold text-2xl my-1 lg:text-6xl lg:my-3">Charlie X</h1>
            <h2 className="font-medium text-lg lg:text-5xl text-white">
              Unravel the enigma of Radiology with Charlie X:
              <br/>
              Decoding Diseases with Precision
            </h2>
          </div>
          {/* <div className="grow flex flex-col justify-center items-center w-full">
            <ExploreBar />
          </div> */}
        </div>
      </div>

      <div className="flex flex-col h-full w-full ">
        <NavBar />

        <div className="flex flex-row grow w-screen">
          <div className="h-full w-0 lg:w-1/2 lg:grow">
          </div>
          <div className="font-cabin h-full w-1/2 pl-8 grow">
            <h1 className="text-3xl lg:text-6xl font-semibold mb-4 mt-6">
              Revolutionise how You Learn Radiology
            </h1>
            <h2 className="text-md lg:text-xl font-normal" data-test="root-subtitle">
              <b className="text-orange-500">Never</b> spend hours pouring over videos or webistes with conflicting information again!
            </h2>
          </div>
        </div>
      </div>

    </div>
  )
}

export { NavBar, ExploreBar };
export default Root;