import Image from "../commons/Image"
import { Link, useNavigate } from "react-router-dom"
import SubpageLayout, { SearchBar } from "../commons/SubpageLayout"
import { useEffect, useState } from "react"
import { getDownloadURL, ref, list, getMetadata } from "firebase/storage"
import { fbstorage } from "../commons/Firebase"
import { Outlet, useLocation } from "react-router-dom"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react"

const GalleryHero = ({ image, src, desc, id, ...props }) => {

  const state = { id:id, desc: desc, src:src}
  const { isOpen, onOpen, onClose } = useDisclosure()


  return (
    <div
      data-test="xrayhero"
      className="my-4 w-11/12 flex flex-col items-center font-medium border-0
        bg-[#BAE5E3] hover:bg-blue-500 hover:text-white text-black rounded-t-2xl" {...props}>
      <button className="w-full shrink-0 pt-1 pl-3 text-sm md:text-md whitespace-nowrap font-cutive overflow-hidden text-left" onClick={onOpen}>
        {desc}
      </button>
      <button className="flex h-3/4 w-full justify-center items-center text-6xl " onClick={onOpen}>
        {image}
      </button>

      <Modal isOpen={isOpen} onClose={onClose} size='2xl'>
        <ModalOverlay/>
        <ModalContent>
          <ModalHeader bg="#BAE5E3">{desc}</ModalHeader>
          {image}
        </ModalContent>
      </Modal>
    </div>

  )
}
// heroProps is an array of objects each with the properties
// category property for the pathology it represents
// thumbnail component
function Gallery({ heroProps }) {

  return (
    <div id="galleryComponent" className="overflow-auto grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6 justify-items-center items-center mx-4">
      {heroProps.map((heroProp) => <GalleryHero image={heroProp?.thumbnail?? <Image />} src={heroProp.src} desc={`${heroProp.category}`} key={heroProp.id} id = {heroProp.id}/>)}
    </div>
  )
}

// Returns an array of X Rays' metadata
const getXRays = async ( fbstorage ) => {
  console.log("getting XRays")
  
  let xRays = []

  const dirRef = ref(fbstorage, 'browse')
  const ogRef = ref(fbstorage, 'original')
  // Read api here https://firebase.google.com/docs/reference/js/storage.md#list
  const xRaysRaw = await list(dirRef, { maxResults:50, }).then( xs => xs.items ).then(xs => xs.filter( x => !x.name.includes("chestxray")))
  xRays = xRaysRaw.map(async (xRayRef, i) => {
    // Interface can be found https://firebase.google.com/docs/reference/js/storage.storagereference
    return {
      disease:(await getMetadata(xRayRef)).customMetadata.condition,
      // srcPromise: await getDownloadURL(xRayRef),
      img: <img src={await getDownloadURL(xRayRef)}/>,
      id: i,
    }
  })
  xRays = await Promise.all(xRays)

  if (xRays.length < 21) {
    xRays = [1,2,3,4,5,6,7].flatMap( _ => xRays).map( (x,i) => { return {...x, id:i}})
    xRays = xRays.slice(0, 21)
  }


  return xRays;
}

const BrowseDefault = ({ images }) => {

  const [ searchStr, setSearchStr ] = useState(new RegExp("", "g"))

  return (
      <>
        <div className="flex w-full justify-center p-2 mt-4">
          <SearchBar state={ searchStr } setState={ setSearchStr } />
        </div>
        <Gallery heroProps={images.filter(x => searchStr.test(x.disease.toString())).map(x => {
          return {
            category: x.disease,
            thumbnail: x.img,
            src: x.srcPromise,
            id: x.id,
          }
        })} />
      </>
  )
}

const Browse = () => {
  const [ imageDatas, setImageData ] = useState([])
  const [ imageCount, setImageCount ] = useState(0)

  let imgs = []

  useEffect( () => {
    getXRays(fbstorage).then(setImageData).catch(console.erro)
  }, [])

  return (
    <SubpageLayout heading="Browse">
      <BrowseDefault images={imageDatas}/>
    </SubpageLayout>
  )
}

export default Browse;