import { Toast } from "primereact/toast";
import { useRef } from "react";

const CreateUser = ({ onBack, onUserCreated }) => {
  const toast = useRef(null);
  const form = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Validar la cédula antes de continuar
    const id = validateId(e.target["id"].value);
    if (!id) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Invalid ID",
        life: 3000,
      });
      return; // Detener flujo si la cédula es inválida
    }

     // Verificar si el ID ya existe
     if (checkIfIdExists(id)) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "ID already exists",
        life: 3000,
      });
      return; // Detener flujo si el ID ya existe
    }

    const email = e.target["email"].value.trim();
    if (!validateEmail(email)) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Invalid Email Format",
        life: 3000,
      });
      return; // Detener flujo si el correo es inválido
    }

    // Validar nombres y apellidos
    const names = e.target["names"].value.trim();
    const lastnames = e.target["lastanames"].value.trim();
    if (!validateText(names)) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Names should contain only letters and spaces",
        life: 3000,
      });
      return;
    }

    if (!validateText(lastnames)) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Last Names should contain only letters and spaces",
        life: 3000,
      });
      return;
    }
  
    // Crear el objeto del usuario con datos válidos
    const dataUser = {
      id, // cédula validada
      coordinates: [
        parseFloat(e.target["latitude"].value),
        parseFloat(e.target["longitude"].value),
      ],
      names,
      lastnames,
      email,
      user: names.toLowerCase().replace(/\s/g, "") + id,
      password: new Date().getTime().toString(),
    };
  
    // Agregar usuario a localStorage y notificar al padre
    onUserCreated(dataUser);
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "User Created Successfully",
      life: 3000,
    });
  
    // Reiniciar el formulario
    form.current.reset();
  };
  const checkIfIdExists = (id) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    return users.some(user => user.id === id);
  };
  
  const validateId = (id) => {
    const cedula = String(id);
  
    if (cedula.length !== 10) {
      return false; // La cédula debe tener 10 dígitos
    }
  
    const digito_region = parseInt(cedula.substring(0, 2), 10);
    if (digito_region < 1 || digito_region > 24) {
      return false; // Región inválida
    }
  
    const pares = parseInt(cedula[1]) + parseInt(cedula[3]) + parseInt(cedula[5]) + parseInt(cedula[7]);
    const impares = [0, 2, 4, 6, 8].reduce((sum, i) => {
      let val = parseInt(cedula[i]) * 2;
      return sum + (val > 9 ? val - 9 : val);
    }, 0);
  
    const suma_total = pares + impares;
    const digito_validador = (Math.ceil(suma_total / 10) * 10 - suma_total) % 10;
  
    return digito_validador === parseInt(cedula[9], 10) ? cedula : false;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validateText = (text) => {
    const textRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    return textRegex.test(text);
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
          <input type="text" name="latitude" placeholder="Latitude" className="p-2 border" required />
          <input type="text" name="longitude" placeholder="Longitude" className="p-2 border" required />
        </div>
        <input type="text" name="names" placeholder="Names" className="p-2 border" required />
        <input type="text" name="lastanames" placeholder="Last Names" className="p-2 border" required />
        <input type="text" name="email" placeholder="Email" className="p-2 border"  />
        <button type="submit" className="bg-primary text-white border-2 border-primary p-2 rounded-lg hover:bg-white hover:text-primary transition duration-300">Save User</button>
        <button
          type="button"
          onClick={onBack}
          className="p-2 border-2 border-primary text-primary hover:bg-primary hover:text-white transition duration-300 rounded-lg"
        >
          Back
        </button>
      </form>
      {/* <button onClick={(() => validateId(1708781991))}>validar</button> */}
    </div>
  );
};

export default CreateUser;
