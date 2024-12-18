const Header = () => {
  const handleLoginClick = () => {
    console.log("Login clicked")
  }
  return (
    <header className=" h-10 w-full flex justify-between bg-primary p-8 items-center">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <a href="/" className="flex items-center">
            <img src="/images/logo-kruger-white.svg" alt="Kruger logo" />
            <span className="text-white text-lg ml-2">PowerMap</span>
          </a>
        </div>
        <div>
          <button className="py-2 px-4 border-2 border-white rounded-lg text-white hover:bg-white hover:text-primary transition duration-300" onClick={handleLoginClick}>Log In</button>
        </div>
      </div>
    </header>
  )
}

export default Header