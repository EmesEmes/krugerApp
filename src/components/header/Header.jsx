import { Link } from "react-router"

const Header = () => {
  return (
    <header className=" h-10 w-full flex justify-between bg-primary p-8 items-center">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link to="/" className="flex items-center">
            <img src="/images/logo-kruger-white.svg" alt="Kruger logo" />
            <span className="text-white text-lg ml-2">PowerMap</span>
          </Link>
        </div>
        <div>
          <Link to="/login" className="py-3 px-4 border-2 border-white rounded-lg text-white hover:bg-white hover:text-primary transition duration-300">Log In</Link>
        </div>
      </div>
    </header>
  )
}

export default Header