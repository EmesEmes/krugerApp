import React, { useState } from "react";

const EditUser = ({ onBack, user, onUserUpdated }) => {
  const [formData, setFormData] = useState({
    id: user.id,
    coordinates: [...user.coordinates],
    names: user.names,
    lastnames: user.lastnames,
    email: user.email,
    user: user.user,
    password: user.password,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "latitude" || name === "longitude") {
      // Try to convert the value to a float number
      const updatedCoordinates = [...formData.coordinates];
      const index = name === "latitude" ? 0 : 1;

      updatedCoordinates[index] = parseFloat(value);

      setFormData({ ...formData, coordinates: updatedCoordinates });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserInLocalStorage(formData); // Update user in localStorage
    onUserUpdated(formData); // Send updated data to parent component
  };

  // Function to update user in localStorage
  const updateUserInLocalStorage = (updatedUser) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((user) =>
      user.id === updatedUser.id ? updatedUser : user
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
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
          disabled
        />
        <div className="flex gap-2">
          <input
            type="text"
            name="latitude"
            placeholder="Latitude"
            value={formData.coordinates[0]}
            onChange={handleChange}
            className="p-2 border"
            required
          />
          <input
            type="text"
            name="longitude"
            placeholder="Longitude"
            value={formData.coordinates[1]}
            onChange={handleChange}
            className="p-2 border"
            required
          />
        </div>
        <input
          type="text"
          name="names"
          placeholder="Names"
          value={formData.names}
          onChange={handleChange}
          className="p-2 border"
          required
        />
        <input
          type="text"
          name="lastnames"
          placeholder="Last Names"
          value={formData.lastnames}
          onChange={handleChange}
          className="p-2 border"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="p-2 border"
          required
        />
        <button
          type="submit"
          className="mx-auto w-[100px] bg-primary text-white border-2 border-primary p-2 rounded-lg hover:bg-white hover:text-primary transition duration-300"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onBack}
          className="mx-auto w-[100px] p-2 border-2 border-primary text-primary hover:bg-primary hover:text-white transition duration-300 rounded-lg"
        >
          Back
        </button>
      </form>
    </div>
  );
};

export default EditUser;
