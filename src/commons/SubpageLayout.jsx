import { HiOutlineDocumentText } from 'react-icons/hi'
import {BsArrowLeftShort} from 'react-icons/bs'
import { Link } from 'react-router-dom'

function DefaultChild() {

  return (
    <div className="flex h-full items-center justify-center bg-gray-400">
      Hi developer, add a child to change the default page layout!
    </div>
  )
}

function DefaultSideBar() {

  return (
    <div className="shrink-0 grow-0 flex flex-col overflow-hidden flex-nowrap bg-[#BAE5E3] gap-3 items-start relative max-w-[24px] hover:max-w-full">
      <section className="ml-1 mt-2" ><HiOutlineDocumentText /></section>
      <section className="ml-1 mt-[-5px]" ><BsArrowLeftShort /></section>
      <Link className="mx-2 text-clip whitespace-nowrap font-cutive text-xs" to="/">Home</Link>
      <Link className="mx-2 text-clip whitespace-nowrap font-cutive text-xs" to="/about">About Charlie X</Link>
      <Link className="mx-2 text-clip whitespace-nowrap font-cutive text-xs" to="/browse">Browse</Link>
      <Link className="mx-2 text-clip whitespace-nowrap font-cutive text-xs" to="/learn">Learn & Study</Link>
      <Link className="mx-2 text-clip whitespace-nowrap font-cutive text-xs" to="/insights">Expert Insights</Link>
      <Link className="mx-2 text-clip whitespace-nowrap font-cutive text-xs" to="/connect">Connect</Link>
    </div>

  )
}

function SubpageLayout({ children=<DefaultChild />, heading="Default Subpage" }) {

  return (
    <div className="flex flex-col max-w-screen h-screen bg-gradient-to-tr from-white to-[#AFDAF2]">
      <div className="shrink-0 grow-0 h-0 lg:h-[64px]">

      </div>
      <div className="flex grow flex-row overflow-hidden content-stretch">
        <DefaultSideBar />
        <div className="flex flex-col grow h-full max-w-full overflow-y-auto">
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

export default SubpageLayout;