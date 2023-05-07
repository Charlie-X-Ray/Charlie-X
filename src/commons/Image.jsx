
const Image = () => {

  return (
    <div className="h-full w-full bg-gray-700">
      <svg className="stroke-slate-800" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
        <rect className=" fill-slate-200" width="100%" height="100%"/>
        <path className="fill-none stroke-[0.5px]" d="M 0 0 L 100 100 M 0 100 L 100 0"/>
      </svg>
    </div>
  )
}

export default Image