import SubpageLayout from "../commons/SubpageLayout";
import Image from "../commons/Image";

function About() {

  return (
    <SubpageLayout heading="About Charlie X">
      <div className="flex w-full h-32 justify-center text-3xl items-center bg-green-500">
        -Insert Image-
      </div>
      <div className="flex w-full h-32 justify-center text-3xl items-center bg-red-500">
        -Insert Text-
      </div>
    </SubpageLayout>
  )
}

export default About;