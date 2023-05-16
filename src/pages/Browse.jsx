import Image from "../commons/Image"
import { Link } from "react-router-dom"
import SubpageLayout from "../commons/SubpageLayout"

const GalleryHero = ({ image, desc, ...props }) => {

  return (
    // Why wont this pass key with props drilling?
    <div className="my-4 h-96 w-11/12 flex flex-col items-center font-mono font-semibold border-2 text-white" {...props}>
      <div className="flex h-1/4 mb-2 items-center shrink-0 text-lg md:text-xl lg:text-2xl whitespace-nowrap">
        <Link to={`/`}>
          {desc}
        </Link>
      </div>
      <div className="flex mb-3 h-3/4 w-3/4 justify-center items-center text-6xl hover:h-5/6 hover:w-5/6">
        <Link to={`/`}>
          {image}
        </Link>
      </div>
    </div>

  )
}

const Browse = () => {

  const testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

  return (
    <SubpageLayout heading="Browse">
      <div className="overflow-auto grid grid-cols-1 bg-blue-200 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 justify-items-center items-center">
        {testArray.map((i, _) => <GalleryHero image={<Image />} desc={`Category ${i}`} key={i} />)}
      </div>
    </SubpageLayout>
  )
}

export default Browse;