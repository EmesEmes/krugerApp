import { useEffect, useState } from "react";
import MapComponent from "../../map/Map";
import CreateSector from "./operations/CreateSector";

const Users = ({polygon, setPolygon}) => {
  const [view, setView] = useState("list");
  const [userToEdit, setUserToEdit] = useState(null);
  console.log(polygon)

  

  const handleCreatePolygons = () => {
    setView("create");
  };

  const handleEditPolygons = (polygon) => {
    setPolygonToEdit(polygon); // Establecer el usuario a editar
    setView("edit");
  };

  const handleDeletePolygons = (id) => {
    const updatedPolygons = polygons.filter((user) => user.id !== id);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setP(updatedUsers); // Actualizar el estado de los usuarios
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
          
        </>
      )}

      

      {view === "create" && (
        <CreateSector
          onSectorCreated={(newSector) => {
            const updatedSector = [...polygon, newSector];
            localStorage.setItem("polygons", JSON.stringify(updatedSector));
            handlePolygonUpdated(updatedSector);
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
