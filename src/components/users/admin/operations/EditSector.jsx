import React, { useState } from "react";

const EditSector = ({ sector, onSectorUpdated, onBack }) => {
  const [formData, setFormData] = useState({ ...sector });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("coord")) {
      const index = parseInt(name.split("-")[1], 10);
      const updatedCoords = [...formData.coords];
      updatedCoords[index] = value.split(",").map(Number);
      setFormData({ ...formData, coords: updatedCoords });
    } else if (["startTime", "endTime"].includes(name)) {
      setFormData({
        ...formData,
        powerOutageSchedule: {
          ...formData.powerOutageSchedule,
          [name]: value,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSectorUpdated(formData);
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
          type="time"
          name="startTime"
          value={formData.powerOutageSchedule.startTime}
          onChange={handleChange}
          placeholder="Start Time"
          className="p-2 border"
        />
        <input
          type="time"
          name="endTime"
          value={formData.powerOutageSchedule.endTime}
          onChange={handleChange}
          placeholder="End Time"
          className="p-2 border"
        />
        <div className="flex flex-col gap-2">
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
        </div>
      </form>
    </div>
  );
};

export default EditSector;
