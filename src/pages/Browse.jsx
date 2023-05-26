import Image from "../commons/Image"
import { Link } from "react-router-dom"
import SubpageLayout, { SearchBar } from "../commons/SubpageLayout"
import { useState } from "react"
import { getDownloadURL, ref, list } from "firebase/storage"
import { fbstorage } from "../commons/Firebase"

const GalleryHero = ({ image, desc, ...props }) => {

  return (
    // Why wont this pass key with props drilling?
    <div className="my-4 w-11/12 flex flex-col items-center font-mono font-semibold border-0
    bg-[#BAE5E3] text-black rounded-t-2xl" {...props}>
      <div className="w-full shrink-0 text-md md:text-md lg:text-md whitespace-nowrap">
        <Link className="pl-3" to={`/`}>
          {desc}
        </Link>
      </div>
      <div className="flex h-3/4 w-full justify-center items-center text-6xl ">
        <Link className="h-full w-full" to={`/`}>
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
    <div id="galleryComponent" className="overflow-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 justify-items-center items-center mx-4">
      {heroProps.map((heroProp, i) => <GalleryHero image={heroProp?.thumbnail?? <Image />} desc={`${heroProp.category}`} key={i} />)}
    </div>
  )
}

// Returns an array of X Rays' metadata
const getXRays = async ( fbstorage ) => {
  
  let xRays = []

  const dirRef = ref(fbstorage, 'xrays')
  // Read api here https://firebase.google.com/docs/reference/js/storage.md#list
  const xRaysRaw = await list(dirRef, { maxResults:10, }).then( xs => xs.items ).then(xs => xs.filter( x => !x.name.includes("chestxray")))
  xRays = xRaysRaw.map(async xRayRef => {
    // Interface can be found https://firebase.google.com/docs/reference/js/storage.storagereference
    return {
      disease:xRayRef.name.replace(".png",""),
      srcPromise: await getDownloadURL(xRayRef),
    }
  })
  xRays = await Promise.all(xRays)

  if (xRays.length < 21) {
    xRays = [1,2,3,4,5,6,7].flatMap( _ => xRays)
    xRays = xRays.slice(0, 21)
  }


  return xRays;
}


const Browse = () => {

  const [ searchStr, setSearchStr ] = useState(new RegExp("", "g"))
  const [ imageDatas, setImageData ] = useState([])

  getXRays(fbstorage).then(setImageData)

  // const testCategories = ["Atelectasis", "Alveolar Nodule", "Asperigillosis",
  //   "Disease", "Diseased", "Sickly", "Super Duper Aick",
  //   "Big Lungs", "Chalky Lungs", "Elephant", "Foxtroy", "Golf",
  //   "Hotel", "Indigo", "Juliet", "Kilo", "Lima"
  // ]

  return (
    <SubpageLayout heading="Browse">
      <div className="flex w-full justify-center p-2 mt-4">
        <SearchBar state={ searchStr } setState={ setSearchStr} />
      </div>
      <Gallery heroProps={imageDatas.filter(x => searchStr.test(x.disease.toString())).map(x => {
        return {
          category: x.disease,
          thumbnail: <img src={ x.srcPromise } />,
        }
      })} />
      {/* <Gallery heroProps={categories.filter(x => searchStr.test(x.toString())).map(x => {
        return {
          category: x,
          thumbnail: <img src={ testImg } />,
        }
      })} /> */}
    </SubpageLayout>
  )
}

export default Browse;