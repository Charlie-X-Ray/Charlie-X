import SubpageLayout from "../commons/SubpageLayout";
import Image from "../commons/Image";

function About() {

  return (
    <SubpageLayout heading="About Charlie X">
      {/* <div className="flex w-full justify-center gap-10 text-3xl items-center p-10">
        <div className="flex flex-col text-center text-xs">
          <img className="h-92" src="/placeholder_lava.jpg" alt="stable diffusion lava mountains" title="lava mountains by stable diffusion" />
          Placeholder by stable diffusion
        </div>
        <div className="flex flex-col text-center text-xs">
          <img className="h-92" src="/placeholder_grandalien.jpg" alt="stable diffusion grand alien" title="grand alien by stable diffusion" />
          Placeholder by stable diffusion
        </div>
      </div> */}
      <div className="flex flex-col w-full h-32 mt-8 justify-center text-3xl items-center">
        <h1>
          Charlie X was born out of a pressing need to democratize access to medical technology. 
        </h1>
        <p className="w-3/4 text-lg text-justify">
          As students focused on our studies, it can be easy to forget that others are constantly making new knowledge out of the things we have yet to even learn.
          It be even easier to forget how powerful advances in one field can affect another. The use of AI for Medical Imaging is an active field of research.
          In the quest for ever better ways to treat and help patients, there are fragments of information left behind that could greatly benefit Medical students.

          We used this research in two ways. The first was to create a study bank using datasets originally intended for training AI models for Radiology.
          The second was to showcase the models that already exist, even if they may not yet be sufficiently accurate.

          It is our hope that this project highlights the potential for multi-discplinary research, and inspires others to contribute in new unexpected domains.
        </p>
      </div>
    </SubpageLayout>
  )
}
export default About;