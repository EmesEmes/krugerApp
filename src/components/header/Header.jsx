import { useEffect, useState } from "react";
import { Link } from "react-router";

const Header = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const currentUser = localStorage.getItem("user");
    if (currentUser) {
      setUser(JSON.parse(currentUser));
    } else {
      setUser(null);
    }
  }, []);

  const handleOnLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };
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
          {user ? (
            <div className="flex items-center">
              <span className="text-white mr-4">Welcome {user.names}</span>
              <Link
                to="/login"
                className="text-white border-2 border-white p-2 rounded-lg hover:bg-white hover:text-primary transition duration-300"
                onClick={handleOnLogout}
              >
                Log Out
              </Link>
            </div>
          ) : (
            <Link
              to="/login"
              className="text-white border-2 border-white p-2 rounded-lg hover:bg-white hover:text-primary transition duration-300"
            >
              Log In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
