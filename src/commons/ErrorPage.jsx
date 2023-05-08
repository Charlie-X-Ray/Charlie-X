import { Link } from "react-router-dom"

export default function ErrorPage() {

  return (
    <div className="flex h-screen w-screen justify-center items-center">
      <Link to={`/`}>
        <button data-testid="error-return-button" className="px-2 py-1 bg-green-600 hover:bg-green-800">
          Go home
        </button>
      </Link>
    </div>

  )
}