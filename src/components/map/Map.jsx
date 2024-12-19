import { MapContainer, TileLayer, Polygon, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = ({
  polygon = [],
  center = [-0.13683501442410362, -78.47360416741938],
  zoom = 14,
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

        const { name = "Unknown", coords = [], powerOutageSchedule = {} } =
          sector;
        const { startTime = "N/A", endTime = "N/A" } = powerOutageSchedule;

        return (
          <Polygon
            positions={coords}
            color={validatePowerOutage(sector)}
            key={index}
          >
            <Popup>
              <p>{name}</p>
              <p>{`From: ${startTime} to ${endTime}`}</p>
            </Popup>
          </Polygon>
        );
      })}
    </MapContainer>
  );
};

export default MapComponent;
