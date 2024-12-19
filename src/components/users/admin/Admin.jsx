import { useEffect, useState } from "react";
import Header from "../../../components/header/Header";
import Users from "./Users";
import Sectors from "./Sectors";

const Default = () => <div><h2>Bienvenido</h2><p>Selecciona una opción del menú.</p></div>;

const Admin = () => {
  const [activeComponent, setActiveComponent] = useState('users')
  const [users, setUsers] = useState([]);
  const [polygon, setPolygon] = useState([]);

  useEffect(() => {
    // Cargar usuarios desde localStorage
    if (localStorage.getItem("users") === null) {
      localStorage.setItem("users", JSON.stringify([]));
    } else {
      const users = JSON.parse(localStorage.getItem("users"));
      setUsers(users);
    }
  }, []);

  useEffect(() => {
    // Cargar usuarios desde localStorage
    if (localStorage.getItem("polygons") === null) {
      localStorage.setItem("polygons", JSON.stringify([]));
    } else {
      const polygons = JSON.parse(localStorage.getItem("polygons"));
      setPolygon(polygons);
    }
  }, []);

  const renderComponent = () => {
    switch (activeComponent) {
      case "users":
        return <Users users={users} setUsers={setUsers}/>;
      case "sectors":
        return <Sectors polygon={polygon} setPolygon={setPolygon}/>;
      default:
        return <Default />;
    }
  };
  return (
    <>
    <Header/>
    <main className="flex">
      
      <aside className="sticky top-0 h-dvh w-[200px] left-0 p-4 border-r-2 border-r-primary">
        <div className="flex flex-col p-6 gap-6">
        <button 
          className="px-4 py-2 bg-primary text-white rounded border-2 border-primary hover:bg-white hover:text-primary transition duration-300"
          onClick={() => setActiveComponent("users")}
        >Users</button>
        <button 
          className="px-4 py-2 bg-primary text-white rounded border-2 border-primary hover:bg-white hover:text-primary transition duration-300" 
          onClick={() => setActiveComponent("sectors")}
        >Sectores</button>
        </div>
      </aside>
      <section className=" flex-1 p-4">
        {renderComponent()}
      </section>
    </main>
    </>
  )
}

export default Admin