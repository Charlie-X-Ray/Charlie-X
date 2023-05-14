import SubpageLayout from "../commons/SubpageLayout";

function About() {

  return (
    <SubpageLayout heading="About Charlie X">
      <div className="flex h-screen items-center justify-center">
        <h1 className="bg-red-300">
          This is the about page!
        </h1>
      </div>
    </SubpageLayout>
  )
}

export default About;