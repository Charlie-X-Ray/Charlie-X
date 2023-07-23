import { useEffect, useState } from "react";
import { Input } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import SubpageLayout from "../commons/SubpageLayout";
import { useBoolean } from "@chakra-ui/hooks";

const VISON_HOSTNAME = import.meta.env.VITE_VISION_HOSTNAME; // ex: http://localhost:8000/

function test_api() {
  console.log("Fetching Test");

  fetch(VISON_HOSTNAME + 'test')
    .then(res => res.json())
    .then(console.log)
    .catch(e => console.log(e));
}

async function postDiagnose(file) {
  console.log("Fetching Diagnose");

  const formData = new FormData();
  formData.append(
    "file", file, file.name
  );

  // https://stackoverflow.com/questions/66592114/react-frontend-sending-image-to-fastapi-backend for how to send images

  const request = {
    method: 'POST',
    body: formData,
    // headers: { 'Accept': 'application/json', 'Content-type': file.type, }
  };

  return await fetch(VISON_HOSTNAME + 'diagnose', request)
    .then(res => res.json())
    .then(json => json.conditions);
}

async function postHeart(file) {
  console.log("Fetching Heart");

  const formData = new FormData();
  formData.append(
    "file", file, file.name
  );

  // https://stackoverflow.com/questions/73678855/fetch-and-display-image-from-api-react 

  const request = {
    method: 'POST',
    body: formData,
    // headers: { 'Accept': 'application/json', 'Content-type': file.type, }
  };

  const response = await fetch(VISON_HOSTNAME + 'heart', request)
  const imageObjectURL = URL.createObjectURL(await response.blob())
  console.log(imageObjectURL)
  return imageObjectURL
}

function BaseXray({children = <></>}) {
  return (
  <div className="flex flex-col h-full w-full bg-gray-300 rounded-2xl border-8 border-blue-400 justify-center align-middle items-center pb-2">
    {children}
  </div>)
}

function Insights() {

  const [prediction, setPrediction] = useState(0.0);
  const [heart, setHeart] = useState("");
  const [isFetchingError, setFetchingError] = useBoolean();
  const [xRayInput, setXRayInput] = useState();
  const [isFetchingXRay, setFetchingXRay] = useBoolean();
  useEffect(test_api, []);

  const defaultXrayInput = (
    <>
      <h4 className="text-xl font-semibold mb-1">
        {xRayInput ? "Orignal X-Ray" : "Upload your X-Ray here!"}
      </h4>
      {
        xRayInput
          ? (
            <div data-test="ogxray" className="border-2 mt-1 mb-2 border-black shadow-lg">
              <img src={URL.createObjectURL(xRayInput)} className="max-h-96" />
            </div>
          )
          : <></>
      }
      <Button as="label" background="blue.400" isDisabled={isFetchingXRay}>
        {xRayInput ? "Change Image" : "Upload Image"}
        <input
          className="hidden w-full max-w-sm text-sm text-gray-900
          cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none
          dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          id="file_input"
          data-test="xrayinput"
          type="file"
          accept="image/*"
          onChange={e => {
            setFetchingError.off()
            setHeart("")
            setXRayInput(e.target.files[0])
          }}
        />
      </Button>
    </>
  )

  const cardiomegalyXrayOutput = (
    <>
      {heart ? (
        <>
          <h4 className="font-semibold text-xl">
            <p>
              <span className="text-yellow-600">Heart Segment</span> is in yellow
            </p>
            <p>
              Cardiomegaly Predicted Confidence&nbsp;
              {
                prediction > 0.50
                  ? <span className={`text-red-600`}>{(prediction * 100).toFixed(2)}%</span>
                  : <span >{(prediction * 100).toFixed(2)}%</span>
              }
            </p>
          </h4>
          <div className="border-2 border-red-600 shadow-lg my-2">
            <img src={heart} className="max-h-96" />
          </div></>)
          : (
        <>
          <h4 className="font-semibold text-xl">
              {xRayInput
                ? "Click on Get Insights to see results!"
                : "Upload an X-Ray to get started"}
          </h4>
        </>
      )}
    </>
  )

  const cardiomegalyXrayError = (
    <>
      <h4 className="text-2xl font-bold text-red-700">
        Something went wrong.
      </h4>
    </>
  )

  const handleXRayInput = (selectedFile) => {
    setFetchingXRay.on()
    console.log("Recieved!")
    console.log(selectedFile)

    const heartPromise = postHeart(selectedFile)
      .then(src => setHeart(src));
    
    const diagnosisPromise = postDiagnose(selectedFile)
      .then(conditions => setPrediction(parseFloat(conditions.Cardiomegaly)))
    
    Promise.all([heartPromise, diagnosisPromise]).catch(setFetchingError.on).finally(setFetchingXRay.off)
  }

  return (
    <SubpageLayout heading="Insights">
      <div className="flex flex-col items-center text-center m-3">
        <p className="font-bold max-w-7xl">
          Charlie-X makes use of a classification model to detect Cardiomegaly, and a segmentation model to identify the heart in an X-Ray.
        </p>
        <div className="flex flex-col md:flex-row mt-1 w-full justify-center space-x-4 h-[550px] max-h-full">
          <BaseXray>
            {defaultXrayInput}
          </BaseXray>
          <div className="flex flex-col items-center align-middle justify-center">
            <Button
              background="green.400"
              isLoading={isFetchingXRay}
              onClick={() => handleXRayInput(xRayInput)}
            >
              Get Insights!
            </Button>
          </div>
          <BaseXray>
          {
            isFetchingError 
              ? cardiomegalyXrayError
              : cardiomegalyXrayOutput
          }
          </BaseXray>
        </div>
      </div>
    </SubpageLayout>
  );
}

export default Insights;