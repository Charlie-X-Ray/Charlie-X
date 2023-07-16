import Image from "../commons/Image"
import { Link, useNavigate } from "react-router-dom"
import SubpageLayout, { SearchBar } from "../commons/SubpageLayout"
import { useState } from "react"
import { getDownloadURL, ref, list, getMetadata } from "firebase/storage"
import { fbstorage } from "../commons/Firebase"
import { Outlet, useLocation } from "react-router-dom"

const GalleryHero = ({ image, src, desc, id, ...props }) => {

  const state = { id:id, desc: desc, src:src}


  return (
    <div className="my-4 w-11/12 flex flex-col items-center font-medium border-0
    bg-[#BAE5E3] hover:bg-blue-500 hover:text-white text-black rounded-t-2xl" {...props}>
      <div className="w-full shrink-0 pt-1 text-sm md:text-md whitespace-nowrap font-cutive overflow-hidden">
        <Link className="pt-2 pl-3 " to={`focus`} state = {state}>
          {desc}
        </Link>
      </div>
      <div className="flex h-3/4 w-full justify-center items-center text-6xl ">
        <Link className="h-full w-full" to={`focus`} state = {state}>
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
    <div id="galleryComponent" className="overflow-auto grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6 justify-items-center items-center mx-4">
      {heroProps.map((heroProp) => <GalleryHero image={heroProp?.thumbnail?? <Image />} src={heroProp.src} desc={`${heroProp.category}`} key={heroProp.id} id = {heroProp.id}/>)}
    </div>
  )
}

// Returns an array of X Rays' metadata
const getXRays = async ( fbstorage ) => {
  
  let xRays = []

  const dirRef = ref(fbstorage, 'browse')
  const ogRef = ref(fbstorage, 'original')
  // Read api here https://firebase.google.com/docs/reference/js/storage.md#list
  const xRaysRaw = await list(dirRef, { maxResults:50, }).then( xs => xs.items ).then(xs => xs.filter( x => !x.name.includes("chestxray")))
  xRays = xRaysRaw.map(async (xRayRef, i) => {
    // Interface can be found https://firebase.google.com/docs/reference/js/storage.storagereference
    return {
      disease:(await getMetadata(xRayRef)).customMetadata.condition,
      srcPromise: await getDownloadURL(xRayRef),
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

const BrowseDefault = () => {

  const [ searchStr, setSearchStr ] = useState(new RegExp("", "g"))
  const [ imageDatas, setImageData ] = useState([])

  getXRays(fbstorage).then(setImageData)

  return (
      <>
        <div className="flex w-full justify-center p-2 mt-4">
          <SearchBar state={ searchStr } setState={ setSearchStr} />
        </div>
        <Gallery heroProps={imageDatas.filter(x => searchStr.test(x.disease.toString())).map(x => {
          return {
            category: x.disease,
            thumbnail: <img src={ x.srcPromise } />,
            src: x.srcPromise,
            id: x.id,
          }
        })} />
      </>
  )
}

const BrowseFocus = () => {

  const location = useLocation()
  const state = location.state
  const navigate = useNavigate()

  return (
    <div className="flex h-full w-full">
      <img className="p-6" src={state.src} />

      <div className="flex-auto flex flex-col text-justify items-center mx-6" id="xray-annotaions">
        <h1 className="mt-5 text-center text-xl lg:text-4xl font-semibold font-serif">
          {state.desc}
        </h1>
        <p>
          A generic lung disease is an insidious and pernicious affliction that wreaks havoc on the delicate and vital respiratory system,
          inflicting profound suffering and posing grave threats to the overall well-being and quality of life of those unfortunate enough to endure its relentless grip.
          From the moment it infiltrates the lungs, this debilitating malady obliterates the intricate network of bronchial tubes, alveoli, and blood vessels,
          distorting their once harmonious structure and impairing their crucial functions with ruthless efficiency.  With each labored breath,
          the lungs, once a beacon of oxygenation and life-sustaining power, become the battleground for a merciless war, as inflammation, scarring,
          and irreversible damage consume their once vibrant and elastic nature, rendering them feeble and fragile.
        </p>

        <br />

        <p>
          Beyond the immediate and tangible implications,
          this generic lung disease casts a shadow of uncertainty and fear over the lives of those affected and their loved ones.
          The relentless progression of the illness, often accompanied by a sense of helplessness and a lack of definitive cures,
          fosters a profound sense of anxiety and despair, breeding a constant state of emotional distress that permeates every aspect of daily life.
          Dreams are shattered, plans are derailed, and the future becomes a haunting enigma,
          as the specter of chronic debilitation and premature mortality looms ominously.
        </p>

        <br />

        <p>
          In conclusion, the detrimental impact of a generic lung disease cannot be overstated.  It strips individuals of their vitality,
          steals their breath, and condemns them to a perpetual battle against their own faltering respiratory system.
          It ravages the body, erodes the spirit, and instills a pervasive sense of fear and uncertainty.
          Recognizing the severity of this affliction is crucial in driving advancements in medical research, public awareness,
          and compassionate care to alleviate the burden it imposes on countless lives and strive towards a future where the devastating consequences of lung diseases are minimized,
          and every breath is a precious gift of life.
        </p>

        <button onClick={() => navigate(-1)} className="bg-blue-400 rounded-lg px-2 mt-5 text-xl hover:bg-blue-500 font-cabin hover:text-white">
          Back to Browse
        </button>

      </div>

    </div>
  )

}

const Browse = () => {

  return (
    <SubpageLayout heading="Browse">
      <Outlet />
    </SubpageLayout>
  )
}

export default Browse;
export { BrowseDefault, BrowseFocus };