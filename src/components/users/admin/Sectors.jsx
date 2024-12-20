import { useEffect, useState } from "react";
import MapComponent from "../../map/Map";
import CreateSector from "./operations/CreateSector";

const Users = () => {

  const [polygon, setPolygon] = useState([]);
  const [view, setView] = useState("list");
  const [userToEdit, setUserToEdit] = useState(null);
  
  useEffect(() => {
    // Cargar usuarios desde localStorage
    if (localStorage.getItem("polygons") === null) {
      localStorage.setItem("polygons", JSON.stringify([]));
    } else {
      const polygons = JSON.parse(localStorage.getItem("polygons"));
      setPolygon(polygons);
    }
  }, []);

  useEffect(() => {
    if (!polygon) {
      setPolygon([]);
    }
  }, [polygon, setPolygon]);
  

  const handleCreatePolygons = () => {
    setView("create");
  };

  const handleEditPolygons = (polygon) => {
    // setPolygonToEdit(polygon); // Establecer el usuario a editar
    // setView("edit");
    console.log("Editando")
  };

  const handleDeletePolygons = (id) => {
    const updatedPolygons = polygon.filter((pol) => pol.id !== id);
    localStorage.setItem("polygons", JSON.stringify(updatedPolygons));
    setPolygon(updatedPolygons); // Actualizar el estado de los poligonos
  };

  const handlePolygonUpdated = (updatedPolygons) => {
    setPolygon([updatedPolygons]); // Actualizar la lista de usuarios
    setView("list"); // Volver a la vista de lista
  };

  return (
    <div className="flex flex-col gap-4">
      {view === "list" && (
        <>
          <button
            className="p-3 border-2 border-primary w-[180px] bg-primary text-white rounded hover:bg-white hover:text-primary transition duration-300"
            onClick={handleCreatePolygons}
          >
            Create a New Sector
          </button>
          <MapComponent polygon={polygon}/>
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
              {Array.isArray(polygon) && polygon.length > 0 ? (
                polygon.map((data) => (
                  <tr key={data.id}>
                    <td className="border-2 border-primary text-center">{data.id}</td>
                    <td className="border-2 border-primary text-center">{data.name}</td>
                    <td className="border-2 border-primary text-center">
                      {data.coords.map((coord, index) => (
                        <span key={index}>
                          [{coord[0]}, {coord[1]}]
                          {index < data.coords.length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </td>
                    <td className="border-2 border-primary text-center">{data.powerOutageSchedule.startTime}</td>
                    <td className="border-2 border-primary text-center">{data.powerOutageSchedule.endTime}</td>
                    <td className="flex gap-2 justify-center my-auto border-2 border-primary">
                      <button
                        onClick={handleEditPolygons}
                        className="p-2 bg-primary text-white rounded hover:bg-white hover:text-primary transition duration-300"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeletePolygons(data.id)}
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
        onSectorCreated={(newSector) => {
          const updatedSector = [...polygon, newSector]; // Combina el sector existente con el nuevo
          localStorage.setItem("polygons", JSON.stringify(updatedSector));
          setPolygon(updatedSector); // Actualiza el estado
        }}
        onBack={() => setView("list")}
      />
      )}

      {/* {view === "edit" && (
        <EditUser
          user={userToEdit}
          onUserUpdated={(updatedUser) => {
            const updatedUsers = users.map((user) =>
              user.id === updatedUser.id ? updatedUser : user
            );
            localStorage.setItem("users", JSON.stringify(updatedUsers));
            handleUserUpdated(updatedUsers);
          }}
          onBack={() => setView("list")}
        />
      )}  */}
      
    </div>
  );
};

export default Users;
