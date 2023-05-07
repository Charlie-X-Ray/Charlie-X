import { Link } from "react-router-dom";
import Image from "../commons/Image";
import { FaPen, FaRocketchat } from "react-icons/fa"
import { RiFileUserLine, RiStethoscopeFill } from"react-icons/ri"
import { TbInfoCircleFilled, TbReportSearch } from "react-icons/tb"

function NavBarButton({ children }) {

  return (
    <>

    </>
  )

}

function NavBar() {

  const buttons = [
    {
      msg: "About Charlie X",
      icon: <RiFileUserLine />
    },
    {
      msg: "Browse",
      icon: <TbInfoCircleFilled />,
    },
    {
      msg: "Learn & Study",
      icon: <TbReportSearch />,
    },
    {
      msg: "Expert Insights",
      icon: <RiStethoscopeFill />,

    },
    {
      msg: "Connect",
      icon: <FaRocketchat />,
    },
  ]

  return (
    <div className="flex flex-row w-screen gap-2">
      {
        buttons.map(({ msg, icon = <></> }, i) => 
          <div className={`bg-[#BAE5E3] grow flex flex-row justify-center items-center text-center rounded-b-xl text-2xl lg:text-xl lg:gap-2 py-1`} key={i}>
            {icon}
            <h2 className="text-[0px] lg:visible lg:w-auto lg:h-auto lg:text-base"> 
              {msg}
            </h2>
          </div>)
      }
    </div>
  )
}

function Root() {

  return (
    <div className="flex flex-col w-screen h-screen bg-gradient-to-tr from-white to-[#AFDAF2] bg-green-500 ">
      <div className="flex flex-col w-full shrink-0 h-2/6 lg:h-2/3">
        <div className="h-0 lg:h-1/6" />
        <div className="flex flex-col grow opacity-90 bg-white" style={{
          backgroundImage: `url("/background1.svg")`
        }}>
          <div className="h-2/6 lg:h-2/6 text-center">
            <h1 className="font-mono font-bold text-2xl my-1 lg:text-5xl lg:my-3">Charlie X</h1>
            <h2 className="font-mono font-bold text-lg lg:text-4xl text-white">
              Unravel the enigma of Radiology with Charlie X:
              <br/>
              Decoding Diseases with Precision
            </h2>
          </div>
          <div className="grow flex justify-center items-center">
            <div className="flex w-5/6 text-md lg:text-2xl max-w-screen-md rounded-full bg-[#D2FCF9]/50 pl-6 py-4 items-center hover:bg-[#D2FCF9]/80">
              <FaPen />
              <input className="text-black bg-transparent ml-4 grow mr-5 focus:bg-none focus:outline-none focus:bg-opacity-100 placeholder:text-slate-700" placeholder="Explore">
              </input>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col h-full w-full ">
        <NavBar />

        <div className="flex flex-row grow w-screen">
          <div className="h-full w-0 lg:w-1/2 lg:grow">
          </div>
          <div className="h-full w-1/2 pl-8 grow">
            <h1 className="text-3xl lg:text-6xl font-semibold mb-4 mt-6">
              Revolutionise how You Learn Radiology
            </h1>
            <h2 className="text-md lg:text-xl font-medium" data-testid="root-subtitle">
              <b className="text-orange-500">Never</b> spend hours pouring over videos or webistes with conflicting information again!
            </h2>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Root;