import { Link } from "react-router-dom";
import Image from "../commons/Image";

function Root() {

  return (
    <div className="flex flex-row left-0 top-0 h-screen w-screen bg-slate-600 justify-center items-center">
      <div className="flex flex-col h-full w-0 lg:w-1/2 items-center justify-center">
        <div className="h-3/4 w-3/4">
          <Image />
        </div>
      </div>
      <div className="flex flex-col h-full w-full p-4 text-white lg:w-1/2 justify-center" data-testid="rootWelcomeDisplay">
        <h1 className="text-4xl mb-1">A Chest Radiography Library</h1>
        <h1 className="text-2xl mb-6">View X-Ray images grouped in over 10 categories</h1>
        <Link to={`/gallery`}>
          <button id="" className="bg-[#499D89] rounded-md px-5 py-2 text-xl text-white font-light shadow-xl hover:bg-[#1f6446] active:bg-[#143f2c]">
            Start Learning!
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Root;