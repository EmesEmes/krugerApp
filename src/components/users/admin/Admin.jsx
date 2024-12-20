import { useEffect, useState } from "react";
import Header from "../../../components/header/Header";
import Users from "./Users";
import Sectors from "./Sectors";

const Default = () => (
  <div>
    <h2>Welcome</h2>
    <p>Select an option from the menu.</p>
  </div>
);

const Admin = () => {
  const [activeComponent, setActiveComponent] = useState("users");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    } else {
      setCurrentUser(null);
    }
  }, []);

  const renderComponent = () => {
    switch (activeComponent) {
      case "users":
        return <Users />;
      case "sectors":
        return <Sectors />;
      default:
        return <Default />;
    }
  };
  return (
    <>
      <Header />
      {currentUser ? (
        <main className="flex">
          <aside className="sticky top-0 h-dvh w-[200px] left-0 p-4 border-r-2 border-r-primary">
            <div className="flex flex-col p-6 gap-6">
              <button
                className="px-4 py-2 bg-primary text-white rounded border-2 border-primary hover:bg-white hover:text-primary transition duration-300"
                onClick={() => setActiveComponent("users")}
              >
                Users
              </button>
              <button
                className="px-4 py-2 bg-primary text-white rounded border-2 border-primary hover:bg-white hover:text-primary transition duration-300"
                onClick={() => setActiveComponent("sectors")}
              >
                Sectors
              </button>
            </div>
          </aside>
          <section className=" flex-1 p-4">{renderComponent()}</section>
        </main>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <h2>
            Please <span className="text-primary">log in.</span>
          </h2>
        </div>
      )}
    </>
  );
};

export default Admin;
