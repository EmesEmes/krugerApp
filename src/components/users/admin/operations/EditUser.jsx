import React, { useState } from "react";

const EditUser = ({ onBack, user, onUserUpdated }) => {
  console.log(user)
  // Estado local para manejar los datos del usuario
  const [formData, setFormData] = useState({
    id: user.id,
    coordinates: [...user.coordinates],
    names: user.names,
    lastnames: user.lastnames,
    email: user.email,
  });

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "latitude" || name === "longitude") {
      // Actualizar las coordenadas
      const updatedCoordinates = [...formData.coordinates];
      const index = name === "latitude" ? 0 : 1;
      updatedCoordinates[index] = parseFloat(value) || 0; // Asegurarse de que sea un número
      setFormData({ ...formData, coordinates: updatedCoordinates });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    onUserUpdated(formData); // Enviar los datos actualizados al componente padre
  };

  return (
    <div>
      <h2>Edit User</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="number"
          name="id"
          placeholder="Id"
          value={formData.id}
          onChange={handleChange}
          className="p-2 border"
          disabled // Id no editable
        />
        <div className="flex gap-2">
          <input
            type="number"
            name="latitude"
            placeholder="Latitude"
            value={formData.coordinates[0]}
            onChange={handleChange}
            className="p-2 border"
          />
          <input
            type="number"
            name="longitude"
            placeholder="Longitude"
            value={formData.coordinates[1]}
            onChange={handleChange}
            className="p-2 border"
          />
        </div>
        <input
          type="text"
          name="names"
          placeholder="Names"
          value={formData.names}
          onChange={handleChange}
          className="p-2 border"
        />
        <input
          type="text"
          name="lastnames"
          placeholder="Last Names"
          value={formData.lastnames}
          onChange={handleChange}
          className="p-2 border"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="p-2 border"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">
          Save User
        </button>
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

export default EditUser;
