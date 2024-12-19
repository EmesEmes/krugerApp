import { Toast } from "primereact/toast";
import { useRef } from "react";

const CreateUser = ({ onBack, onUserCreated }) => {
  const toast = useRef(null);
  const form = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataUser = {
      id: e.target["id"].value,
      coordinates: [
        parseFloat(e.target["latitude"].value),
        parseFloat(e.target["longitude"].value),
      ],
      names: e.target["names"].value.trim(),
      lastnames: e.target["lastanames"].value.trim(),
      email: e.target["email"].value.trim(),
    };

    // Agregar usuario a localStorage y notificar al padre
    onUserCreated(dataUser);
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
        <div className="w-full flex gap-2">
          <input type="number" name="latitude" placeholder="Latitude" className="p-2 border" required />
          <input type="number" name="longitude" placeholder="Longitude" className="p-2 border" required />
        </div>
        <input type="text" name="names" placeholder="Names" className="p-2 border" required />
        <input type="text" name="lastanames" placeholder="Last Names" className="p-2 border" required />
        <input type="email" name="email" placeholder="Email" className="p-2 border" required />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">Save User</button>
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

export default CreateUser;
