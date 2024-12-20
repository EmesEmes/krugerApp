import { useEffect, useState } from "react";
import MapComponent from "../../map/Map";
import Header from "../../header/Header";

const Home = () => {
  const [polygon, setPolygon] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    // Cargar polígonos desde localStorage
    const storedPolygons = localStorage.getItem("polygons");
    if (storedPolygons) {
      setPolygon(JSON.parse(storedPolygons));
    } else {
      setPolygon([]);
    }
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    } else {
      setCurrentUser({});
    }
  }, []);

  const marker = currentUser.coordinates
  console.log(marker)

  return (
    <div>
      <Header />
      <MapComponent 
        polygon={polygon} 
        zoom={20} 
        center={marker} 
        marker={marker}
      />
      <div className="flex justify-center items-center mt-10">
        {currentUser ? (
          <h2>Welcome, <span className="text-primary">{currentUser.names}!</span></h2>
        ) : (
          <h2>Por favor, inicie sesión.</h2>
        )}
      </div>
    </div>
  )
}

export default Home;
