import { useEffect, useRef, useState } from "react";
import MapComponent from "../../map/Map";
import CreateSector from "./operations/CreateSector";
import EditSector from "./operations/EditSector";
import { Toast } from "primereact/toast";

const Sectors = () => {
  const [sectors, setSectors] = useState([]);
  const [view, setView] = useState("list");
  const [sectorToEdit, setSectorToEdit] = useState(null);

  const toast = useRef(null);

  useEffect(() => {
    const storedSectors = localStorage.getItem("polygons");
    if (storedSectors) {
      setSectors(JSON.parse(storedSectors));
    }
  }, []);

  const saveSectorsToLocalStorage = (updatedSectors) => {
    localStorage.setItem("polygons", JSON.stringify(updatedSectors));
    setSectors(updatedSectors);
  };

  const handleCreateSector = () => {
    setView("create");
  };

  const handleEditSector = (sector) => {
    setSectorToEdit(sector);
    setView("edit");
  };

  const handleDeleteSector = (id) => {
    const updatedSectors = sectors.filter((sector) => sector.id !== id);
    saveSectorsToLocalStorage(updatedSectors);
    toast.current.show({
      severity: "success",
      sumary: "Success",
      detail: "Sector Deleted Successfully",
      life: 3000,
    });
  };

  const handleSectorCreated = (newSector) => {
    const updatedSectors = [...sectors, newSector];
    saveSectorsToLocalStorage(updatedSectors);
    setView("list");
  };

  const handleSectorUpdated = (updatedSector) => {
    const updatedSectors = sectors.map((sector) =>
      sector.id === updatedSector.id ? updatedSector : sector
    );
    saveSectorsToLocalStorage(updatedSectors);
    setView("list");
  };

  return (
    <div className="flex flex-col gap-4">
      <Toast ref={toast} />
      {view === "list" && (
        <>
          <button
            className="p-3 border-2 border-primary w-[180px] bg-primary text-white rounded hover:bg-white hover:text-primary transition duration-300"
            onClick={handleCreateSector}
          >
            Create a New Sector
          </button>
          <MapComponent polygon={sectors} />
          <table className="border-2 border-primary">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Coordinates</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(sectors) && sectors.length > 0 ? (
                sectors.map((sector) => (
                  <tr key={sector.id}>
                    <td className="border-2 border-primary text-center">
                      {sector.id}
                    </td>
                    <td className="border-2 border-primary text-center">
                      {sector.name}
                    </td>
                    <td className="border-2 border-primary text-center">
                      {sector.coords.map((coord, index) => (
                        <span key={index}>
                          [{coord[0]}, {coord[1]}]
                          {index < sector.coords.length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </td>
                    <td className="border-2 border-primary text-center">
                      {sector.powerOutageSchedule.startTime}
                    </td>
                    <td className="border-2 border-primary text-center">
                      {sector.powerOutageSchedule.endTime}
                    </td>
                    <td className="flex gap-2 justify-center my-auto border-2 border-primary">
                      <button
                        onClick={() => handleEditSector(sector)}
                        className="p-2 bg-primary text-white rounded hover:bg-white hover:text-primary transition duration-300"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteSector(sector.id)}
                        className="p-2 bg-primary text-white rounded hover:bg-white hover:text-primary transition duration-300"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    No sectors available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}

      {view === "create" && (
        <CreateSector
          onSectorCreated={handleSectorCreated}
          onBack={() => setView("list")}
        />
      )}

      {view === "edit" && sectorToEdit && (
        <EditSector
          sector={sectorToEdit}
          onSectorUpdated={handleSectorUpdated}
          onBack={() => setView("list")}
        />
      )}
    </div>
  );
};

export default Sectors;
