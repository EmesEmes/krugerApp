import { Toast } from "primereact/toast";
import { useRef, useState } from "react";

const CreateSector = ({ onBack, onSectorCreated }) => {
  const toast = useRef(null);
  const form = useRef(null);
  const [coordinates, setCoordinates] = useState([
    { latitude: "", longitude: "" }, // Coordenada inicial
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataSector = {
      id: new Date().getTime(),
      powerOutageSchedule: {
        startTime: (e.target["startTime"].value),
        endTime: (e.target["endTime"].value),
      },
      coords: coordinates.map(coord => [
        parseFloat(coord.latitude),
        parseFloat(coord.longitude),
      ]),
      name: e.target["names"].value.trim(),
    };

    // Agregar sector a localStorage y notificar al padre
    onSectorCreated(dataSector);
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Sector Created Successfully",
      life: 3000,
    });
    form.current.reset();
    setCoordinates([{ latitude: "", longitude: "" }]); // Reiniciar coordenadas
  };

  const handleAddCoordinate = () => {
    setCoordinates([...coordinates, { latitude: "", longitude: "" }]);
  };

  const handleRemoveCoordinate = (index) => {
    const updatedCoordinates = coordinates.filter((_, i) => i !== index);
    setCoordinates(updatedCoordinates);
  };

  const handleCoordinateChange = (index, field, value) => {
    const updatedCoordinates = [...coordinates];
    updatedCoordinates[index][field] = value;
    setCoordinates(updatedCoordinates);
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      <Toast ref={toast} />
      <h2>Create A New Sector</h2>
      <form
        className="flex flex-col gap-4 w-[500px]"
        onSubmit={handleSubmit}
        ref={form}
      >
        <input
          type="text"
          name="names"
          placeholder="Sector Name"
          className="p-2 border"
          required
        />
        <input
          type="time"
          name="startTime"
          placeholder="Start Time"
          className="p-2 border"
          required
        />
        <input
          type="time"
          name="endTime"
          placeholder="End Time"
          className="p-2 border"
          required
        />

        <div className="flex flex-col gap-2">
          <h3>Coordinates</h3>
          {coordinates.map((coord, index) => (
            <div key={index} className="flex gap-2 items-center">
              <input
                type="text"
                placeholder="Latitude"
                value={coord.latitude}
                onChange={(e) =>
                  handleCoordinateChange(index, "latitude", e.target.value)
                }
                className="p-2 border"
                required
              />
              <input
                type="text"
                placeholder="Longitude"
                value={coord.longitude}
                onChange={(e) =>
                  handleCoordinateChange(index, "longitude", e.target.value)
                }
                className="p-2 border"
                required
              />
              {coordinates.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveCoordinate(index)}
                  className="p-2 bg-red-500 text-white rounded"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddCoordinate}
            className="p-2 border-2 border-primary text-primary hover:bg-primary hover:text-white transition duration-300 rounded-lg"
          >
            Add Coordinate
          </button>
        </div>

        <button
          type="submit"
          className="bg-primary text-white border-2 border-primary p-2 rounded-lg hover:bg-white hover:text-primary transition duration-300"
        >
          Save Sector
        </button>
        <button
          type="button"
          onClick={onBack}
          className="p-2 border-2 border-primary text-primary hover:bg-primary hover:text-white transition duration-300 rounded-lg"
        >
          Back
        </button>
      </form>
    </div>
  );
};

export default CreateSector;
