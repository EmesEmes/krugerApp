import { MapContainer, TileLayer, Polygon, Popup, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = ({
  polygon = [],
  center = [-0.13683501442410362, -78.47360416741938],
  zoom = 12,
  marker
}) => {
  // Aplanar el array si es necesario
  const flatPolygon = Array.isArray(polygon[0]) ? polygon.flat() : polygon;
  
  const validatePowerOutage = (sector) => {
    const currentTime = new Date().getHours();
    const { powerOutageSchedule = {} } = sector;
    const { startTime, endTime } = powerOutageSchedule;

    if (
      typeof startTime === "number" &&
      typeof endTime === "number" &&
      currentTime >= startTime &&
      currentTime <= endTime
    ) {
      return "red"; // Sin luz
    }
    return "green"; // Con luz
  };

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height: "500px", width: "90%" }}
      className="mt-10 mx-auto"
      key={center}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {flatPolygon.map((sector, index) => {
        if (!sector || !sector.powerOutageSchedule) {
          console.warn(`Sector en posición ${index} no es válido:`, sector);
          return null; // No renderiza sectores inválidos
        }
  
        const { name = "Unknown", coords = [], powerOutageSchedule = {} } = sector;
        const { startTime = "N/A", endTime = "N/A" } = powerOutageSchedule;
  
        return (
          <div key={`sector-${index}`}> {/* Aquí se asegura un key único */}
            {marker && (
              <Marker position={marker} key={`marker-${index}`}>
                <Popup>
                  <p>Your current location</p>
                </Popup>
              </Marker>
            )}
            <Polygon
              positions={coords}
              color={validatePowerOutage(sector)}
              key={`polygon-${index}`} // Clave única para el polígono
            >
              <Popup>
                <p>Sector: {name}</p>
                <p>{`From: ${startTime}:00 to ${endTime}:00`}</p>
                <p>{validatePowerOutage(sector) === "green" ? 'Sector has Electricity' : 'Sector has no electricity'}</p>
              </Popup>
            </Polygon>
          </div>
        );
      })}
    </MapContainer>
  );
  
};

export default MapComponent;
