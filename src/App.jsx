import { useEffect, useState } from "react"
import Header from "./components/header/Header"
import Map from "./components/map/Map"

const App = () => {
  const [coordenade, setCoordenade] = useState([])
  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser')
  if (!currentUser) {
    localStorage.setItem('currentUser', '')
  }
  }, [])

  const handleSubmiteCoordinate = (e) => {
    e.preventDefault()
    const inputLatitude = document.getElementById('latitude')
    const inputLongitude = document.getElementById('longitude')
    const valueLatitude = inputLatitude.value
    const valueLongitude = inputLongitude.value
    setCoordenade(coordenade => [...coordenade, [valueLatitude, valueLongitude]])
    console.log(coordenade)
  }
  return (
    <>
      <Header />
      <Map />
      <form onSubmit={e => handleSubmiteCoordinate(e)}>
        <input type="text" className="my-10 border-2 ml-10" id="latitude"/>
        <input type="text" className="ml-10 border-2" id="longitude"/>
        <button className="ml-2" type="submit">Enviar</button>
      </form>
      <div>
      [-2.287352, -79.852948],
    [-2.288724, -80.045895],
    [-1.842009, -80.09602],
    [-1.833774, -79.571423],
    [-2.263338, -79.560437],
    [-2.287352, -79.852948],
      </div>
    </>
  )
}

export default App