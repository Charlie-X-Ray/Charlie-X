import Image from "../commons/Image"
import { Link } from "react-router-dom"
import SubpageLayout from "../commons/SubpageLayout"
import { ExploreBar } from "./Root"
import { useState } from "react"

const GalleryHero = ({ image, desc, ...props }) => {

  return (
    // Why wont this pass key with props drilling?
    <div className="my-4 h-80 w-11/12 flex flex-col items-center font-mono font-semibold border-2 bg-blue-300 text-white" {...props}>
      <div className="flex h-1/4 items-center shrink-0 text-lg md:text-xl lg:text-2xl whitespace-nowrap">
        <Link to={`/`}>
          {desc}
        </Link>
      </div>
      <div className="flex mb-3 h-3/4 w-full justify-center items-center text-6xl ">
        <Link className="h-3/4 w-3/4 hover:h-5/6 hover:w-5/6" to={`/`}>
          {image}
        </Link>
      </div>
    </div>

  )
}
// heroProps is an array of objects each with the properties
// category property for the pathology it represents
// thumbnail component
function Gallery({ heroProps }) {

  return (
    <div id="galleryComponent" className="overflow-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 justify-items-center items-center">
      {heroProps.map((heroProp, i) => <GalleryHero image={heroProp?.thumbnail?? <Image />} desc={`${heroProp.category}`} key={i} />)}
    </div>
  )
}

const Browse = () => {

  const [ explore, setExplore ] = useState("");

  const testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

  return (
    <SubpageLayout heading="Browse">
      <div className="flex w-full justify-center p-2 mt-4">
        <ExploreBar
          value = { explore }
          onChange = { e => setExplore(e.target.value)}
        />
      </div>
      <Gallery heroProps={testArray.filter(x => x.toString().includes(explore)).map(x => {
        return {
          category: x,
          thumbnail: null,
        }
      })} />
    </SubpageLayout>
  )
}

export default Browse;