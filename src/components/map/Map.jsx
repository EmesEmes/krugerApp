import { MapContainer, TileLayer, Polygon, Popup, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = ({
  polygon = [],
  center = [-0.13683501442410362, -78.47360416741938],
  zoom = 12,
  marker,
}) => {
  const validatePowerOutage = (sector) => {
    const currentTime = new Date().toTimeString().slice(0, 5); // Get current time in HH:MM format
    const { powerOutageSchedule = {} } = sector;
    const { startTime, endTime } = powerOutageSchedule;

    if (typeof startTime === "string" && typeof endTime === "string") {
      if (startTime <= endTime) {
        return currentTime >= startTime && currentTime < endTime
          ? "red"
          : "green";
      } else {
        return currentTime >= startTime || currentTime < endTime
          ? "red"
          : "green";
      }
    }
    return "green";
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
      {polygon.map((sector, index) => {
        if (!sector || !sector.powerOutageSchedule) {
          console.warn(`Sector en posición ${index} no es válido:`, sector);
          return null;
        }

        const {
          name = "Unknown",
          coords = [],
          powerOutageSchedule = {},
        } = sector;
        const { startTime = "N/A", endTime = "N/A" } = powerOutageSchedule;

        return (
          <Polygon
            positions={coords}
            color={validatePowerOutage(sector)}
            key={`polygon-${index}`}
          >
            <Popup>
              <p>Sector: {name}</p>
              <p>{`From: ${startTime} to ${endTime}`}</p>
              <p>
                {validatePowerOutage(sector) === "green"
                  ? "Sector has Electricity"
                  : "Sector has no electricity"}
              </p>
            </Popup>
          </Polygon>
        );
      })}
      {marker && (
        <Marker position={marker}>
          <Popup>
            <p>Your current location</p>
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default MapComponent;
