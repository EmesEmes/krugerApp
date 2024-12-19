import { Toast } from "primereact/toast";
import { useRef } from "react";

const CreateSector = ({ onBack, onSectorCreated }) => {
  const toast = useRef(null);
  const form = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataSector = {
      id: e.target["id"].value,
      powerOutageSchedule: {
        startTime: parseInt(e.target["startTime"].value),
        endTime: parseInt(e.target["endTime"].value),
      },
      coords: [
        [parseFloat(e.target["latitude"].value),
        parseFloat(e.target["longitude"].value),],
        [parseFloat(e.target["latitude2"].value),
        parseFloat(e.target["longitude2"].value),],
        [parseFloat(e.target["latitude3"].value),
        parseFloat(e.target["longitude3"].value),]
      ],
      name: e.target["names"].value.trim(),

    }

    // Agregar usuario a localStorage y notificar al padre
    onSectorCreated(dataSector);
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "User Created Successfully",
      life: 3000,
    });
    form.current.reset();
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      <Toast ref={toast} />
      <h2>Create A New User</h2>
      <form
        className="flex flex-col gap-4 w-[500px]"
        onSubmit={handleSubmit}
        ref={form}
      >
        <input type="number" name="id" placeholder="Id" className="p-2 border" required />
        <div className="w-full flex gap-2 flex-col">
          <input type="text" name="latitude" placeholder="Latitude" className="p-2 border" required />
          <input type="text" name="longitude" placeholder="Longitude" className="p-2 border" required />
          <input type="text" name="latitude2" placeholder="Latitude" className="p-2 border" required />
          <input type="text" name="longitude2" placeholder="Longitude" className="p-2 border" required />
          <input type="text" name="latitude3" placeholder="Latitude" className="p-2 border" required />
          <input type="text" name="longitude3" placeholder="Longitude" className="p-2 border" required />
        </div>
        <input type="text" name="names" placeholder="Sector Name" className="p-2 border" required />
        <input type="number" name="startTime" placeholder="Start Time" className="p-2 border" required />
        <input type="numer" name="endTime" placeholder="End Time" className="p-2 border" required />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">Save Sector</button>
        <button
          type="button"
          onClick={onBack}
          className="p-2 bg-gray-300 text-black rounded"
        >
          Back
        </button>
      </form>
    </div>
  );
};

export default CreateSector;