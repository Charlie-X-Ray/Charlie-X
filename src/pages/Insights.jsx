import { useEffect, useState } from "react";
import SubpageLayout from "../commons/SubpageLayout";

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
  <div className="flex flex-col h-full">

  </div>)
}

function InputXray() {

}

function Insights() {

  const [prediction, setPrediction] = useState(0.0);
  const [heart, setHeart] = useState("");
  const [xRayInput, setXRayInput] = useState()
  useEffect(test_api, []);

  const handleXRayInput = (selectedFile) => {
    console.log("Recieved!")
    console.log(selectedFile)

    postHeart(selectedFile)
      .then(src => setHeart(src));
    
    postDiagnose(selectedFile)
      .then(conditions => setPrediction(parseFloat(conditions.Cardiomegaly)))
  }

  return (
    <SubpageLayout heading="Insights">
      <div className="flex flex-col w-full items-center text-center m-3">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload XRay!</label>
        <input
          className="block w-full max-w-sm text-sm text-gray-900 border border-gray-300
          rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none
          dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          id="file_input"
          data-test="xrayinput"
          type="file"
          onChange={e => setXRayInput(e.target.files[0])}
        />
        <button className="px-2 py-0.5 mt-2 bg-green-400 hover:bg-green-700 rounded-lg" onClick={() => handleXRayInput(xRayInput)}>Get Insights!</button>
        <div className="flex flex-row w-full justify-center space-x-4 bg-gray-300 h-[500px] max-h-full">
          {
            xRayInput
              ? (
                <div data-test="ogxray">
                  <h4>Original XRay</h4>
                  <img src={URL.createObjectURL(xRayInput)} className="max-h-96" />
                </div>
              )
              : <></>
          }
          {
            heart
              ? (
                <div data-test="mlxray">
                  <h4><span className="text-yellow-600">Heart Segment</span> Chance of Cardiomegaly: <span className={`text-red-${prediction > 0.50 ? '600' : '0'}`}>{(prediction * 100).toFixed(2)}%</span></h4>
                  <img src={heart} className="max-h-96" />
                </div>
              )
              : <></>
          }
        </div>
      </div>
    </SubpageLayout>
  );
}

export default Insights;