
import { MapContainer, TileLayer, Polygon, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = () => {
  const center = [-0.13683501442410362, -78.47360416741938];
  const currentTime = new Date().getHours();
  console.log(currentTime);

  const sector = [{
    name: 'Solca',
    powerOutageSchedule: {
      startTime: 8,
      endTime: 11
    },
    hasElectricity: true,
    coords: [
      [-2.287352, -79.852948],
      [-2.288724, -80.045895],
      [-1.842009, -80.09602],
      [-1.833774, -79.571423],
      [-2.263338, -79.560437],
      [-2.287352, -79.852948],
    ]
  }, {
    name: 'Solca',
    powerOutageSchedule: {
      startTime: 12,
      endTime: 15
    },
    hasElectricity: false,
    coords: [
      [-0.13515726545169077, -78.46767847700272],
      [-0.13610257617417001, -78.47022129674028],
      [-0.1378881226491974, -78.46998728292931],
      [-0.13734752275560838, -78.466895718309]
    ]
  }, {
    name: 'El Edén',
    powerOutageSchedule: {
      startTime: 8,
      endTime: 11
    },
    hasElectricity: true,
    coords: [
      [-0.1351508990330279, -78.4676243204469],
      [-0.13471156456392008, -78.4664283510524],
      [-0.13429663755805737, -78.4661598681271],
      [-0.1354193812046888, -78.46406081980207],
      [-0.1366885696121657, -78.46471982334599],
      [-0.13737197872690513, -78.466892094287],
    ]
  },
  {
    name: 'Camilo Ponce',
    powerOutageSchedule: {
      startTime: 8,
      endTime: 11
    },
    hasElectricity: true,
    coords: [
      [-0.1360249619462523, -78.47016523889926],
      [-0.1337932941218986, -78.47062509900742],
      [-0.13276537432826785, -78.46790651425033],
      [-0.13445603186077737, -78.46754133122326],
      [-0.13456423393889108, -78.46782536246654],
      [-0.13518639587869413, -78.46764953360166],
      [-0.13605201246407594, -78.47009761241276]
    ]
  },
  {
    name: 'Embaja Américana',
    powerOutageSchedule: {
      startTime: 16,
      endTime: 18
    },
    hasElectricity: true,
    coords: [
      [-0.13787427660522722, -78.469917042722],
      [-0.13742794309113596, -78.46690090142432],
      [-0.14075515635733993, -78.4662381618567],
      [-0.14140436864696973, -78.46933545493813],
      [-0.14093098468757145, -78.4700117198031],
      [-0.1406740048198608, -78.47003877039768],
    ]
  }]

  const validatePowerOutage = (sector) => {
    const currentTime = new Date().getHours();
    if (currentTime >= sector.powerOutageSchedule.startTime && currentTime <= sector.powerOutageSchedule.endTime) {
      return "red";
    }
    return "green";
  }

  return (
    <>
    <MapContainer
      center={center}
      zoom={14}
      style={{ height: '500px', width: '90%' }}
      className='mt-10 mx-auto'
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        onClick={(e) => {
          console.log(e)
        }}
      />
      {/* <Polygon positions={polygonCoords} color="red" /> */}
      {sector.map((sector, index) => (
        <Polygon positions={sector.coords} color={validatePowerOutage(sector)} key={index}>
          <Popup>
            <p>{sector.name}</p>
            <p>{`From: ${sector.powerOutageSchedule.startTime} to ${sector.powerOutageSchedule.endTime}`}</p> 
            <p>{validatePowerOutage(sector) === 'green' ? "tiene luz" : "no tiene luz"}</p> 
          </Popup>  
        </Polygon>
      ))}
    </MapContainer>
    </>
  );
};

export default MapComponent;
