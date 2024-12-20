import { useEffect, useState } from "react";
import CreateUser from "./operations/createUser";
import EditUser from "./operations/EditUser";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [view, setView] = useState("list");
  const [userToEdit, setUserToEdit] = useState(null);

  console.log(users)
  useEffect(() => {
    // Cargar usuarios desde localStorage
    if (localStorage.getItem("users") === null) {
      localStorage.setItem("users", JSON.stringify([]));
    } else {
      const users = JSON.parse(localStorage.getItem("users"));
      setUsers(users);
    }
  }, []);

  const handleCreateUser = () => {
    setView("create");
  };

  const handleEditUser = (user) => {
    setUserToEdit(user); // Establecer el usuario a editar
    setView("edit");
  };

  const handleDeleteUser = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUsers(updatedUsers); // Actualizar el estado de los usuarios
  };

  const handleUserUpdated = (updatedUsers) => {
    setUsers(updatedUsers); // Actualizar la lista de usuarios
    setView("list"); // Volver a la vista de lista
  };

  return (
    <div className="flex flex-col gap-4">
      {view === "list" && (
        <>
          <button
            className="p-3 border-2 border-primary w-[180px] bg-primary text-white rounded hover:bg-white hover:text-primary transition duration-300"
            onClick={handleCreateUser}
          >
            Create a New User
          </button>
          <table className="border-2 border-primary">
            <thead>
              <tr>
                <th>Id</th>
                <th>Latitude</th>
                <th>Longitude</th>
                <th>Names</th>
                <th>Lastnames</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center">
                    No users available
                  </td>
                </tr>
              ):(
                users.map((user, index) => (
                  <tr key={user.id}>
                    <td className="border-2 border-primary text-center">{user.id}</td>
                    <td className="border-2 border-primary text-center">{user.coordinates[0]}</td>
                    <td className="border-2 border-primary text-center">{user.coordinates[1]}</td>
                    <td className="border-2 border-primary text-center">{user.names}</td>
                    <td className="border-2 border-primary text-center">{user.lastnames}</td>
                    <td className="border-2 border-primary text-center">{user.email}</td>
                    <td className="flex gap-2 justify-center border-2 border-primary">
                      <button
                        className="border-2 border-primary rounded p-2 bg-primary text-white hover:bg-white hover:text-primary transition duration-300"
                        onClick={() => handleEditUser(user)}
                      >
                        Edit
                      </button>
                      <button
                        className="border-2 border-primary rounded p-2 bg-primary text-white hover:bg-white hover:text-primary transition duration-300"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) }
                
            </tbody>
          </table>
        </>
      )}

      {view === "create" && (
        <CreateUser
          onUserCreated={(newUser) => {
            const updatedUsers = [...users, newUser];
            localStorage.setItem("users", JSON.stringify(updatedUsers));
            handleUserUpdated(updatedUsers);
          }}
          onBack={() => setView("list")}
        />
      )}

      {view === "edit" && (
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
      )}
    </div>
  );
};

export default Users;
