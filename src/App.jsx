import { useEffect, useState } from "react"
import Header from "./components/header/Header"
import MapComponent from "./components/map/Map"

const App = () => {
  const [polygon, setPolygon] = useState([])
  useEffect(() => {
    // Cargar polígonos desde localStorage
    const storedPolygons = localStorage.getItem("polygons")
    if (storedPolygons) {
      setPolygon(JSON.parse(storedPolygons))
    }

    localStorage.setItem('admin', JSON.stringify({id: 'admin', username: 'admin', password: 'admin', role: 'admin'}))
  }, [])
  
  return (
    <>
      <Header />
      <MapComponent polygon={polygon}/>
    </>
  )
}

export default App