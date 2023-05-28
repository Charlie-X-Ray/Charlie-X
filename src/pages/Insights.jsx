import SubpageLayout from "../commons/SubpageLayout";

function Insights() {
  return (
    <SubpageLayout heading="Insights">
      <div className="flex flex-col w-full items-center text-center m-3">
        <img src="/placeholder_moon.jpg" />
        <div className="text-lg text-black">
          No insights yet.
        </div>
      </div>
    </SubpageLayout>
  )
}

export default Insights;