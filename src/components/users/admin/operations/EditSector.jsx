import React, { useState } from "react";

const EditSector = ({ sector, onSectorUpdated, onBack }) => {
  const [formData, setFormData] = useState({ ...sector });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("coord")) {
      const index = parseInt(name.split("-")[1], 10);
      const updatedCoords = [...formData.coords];
      updatedCoords[index] = value.split(",").map(Number); // Convertir valores a números
      setFormData({ ...formData, coords: updatedCoords });
    } else if (["startTime", "endTime"].includes(name)) {
      setFormData({
        ...formData,
        powerOutageSchedule: {
          ...formData.powerOutageSchedule,
          [name]: parseInt(value, 10), // Convertir horarios a números
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSectorUpdated(formData); // Enviar datos actualizados
  };

  return (
    <div>
      <h2>Edit Sector</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Sector Name"
          className="p-2 border"
        />
        {formData.coords.map((coord, index) => (
          <input
            key={index}
            type="text"
            name={`coord-${index}`}
            value={coord.join(", ")}
            onChange={handleChange}
            placeholder={`Coordinate ${index + 1}`}
            className="p-2 border"
          />
        ))}
        <input
          type="number"
          name="startTime"
          value={formData.powerOutageSchedule.startTime}
          onChange={handleChange}
          placeholder="Start Time (0-23)"
          className="p-2 border"
        />
        <input
          type="number"
          name="endTime"
          value={formData.powerOutageSchedule.endTime}
          onChange={handleChange}
          placeholder="End Time (0-23)"
          className="p-2 border"
        />
        <div className="flex gap-2">
          <button type="submit" className="p-2 bg-blue-500 text-white rounded">
            Save
          </button>
          <button type="button" onClick={onBack} className="p-2 bg-gray-300 rounded">
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditSector;
