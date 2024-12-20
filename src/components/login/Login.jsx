import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";

const Login = () => {
  const toast = useRef(null);
  const [users, setUsers] = useState([]);
  const [admin, setAdmin] = useState({});
  const form = useRef(null);
  useEffect(() => {
    // Cargar usuarios desde localStorage
    if (localStorage.getItem("users") === null) {
      localStorage.setItem("users", JSON.stringify([]));
    } else {
      const users = JSON.parse(localStorage.getItem("users"));
      setUsers(users);
    }

    const admin = localStorage.getItem("admin");
    if (!admin) {
      localStorage.setItem(
        "admin",
        JSON.stringify({ user: "admin", password: "admin" })
      );
    } else {
      setAdmin(JSON.parse(admin));
    }
  }, []);
  console.log(users);
  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target["username"].value.trim();
    const password = e.target["password"].value.trim();

    const user = users.find(
      (user) => user.user === username && user.password === password
    );
    const adminUser = admin.username;
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      window.location.href = "/user";
    } else if (username === adminUser && password === admin.password) {
      localStorage.setItem("user", JSON.stringify({ names: "Admin" }));
      window.location.href = "/admin";
    } else {
      form.current.reset();
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Invalid credentials",
        life: 3000,
      });
    }
  };
  return (
    <>
      <div
        className="bg-primary h-screen w-screen flex justify-center items-center"
        onSubmit={handleSubmit}
      >
        <Toast ref={toast} className="boder-2 border-white" />
        <div>
          <form ref={form}>
            <div className="flex flex-col items-center">
              <img
                src="/images/logo-kruger-white.svg"
                alt="Kruger logo"
                className="w-32"
              />
              <h1 className="text-white text-3xl font-bold mt-8">
                Welcome to PowerMap
              </h1>
              <input
                type="text"
                name="username"
                placeholder="Username"
                className="bg-white w-80 h-10 mt-4 p-2 rounded-lg"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="bg-white w-80 h-10 mt-4 p-2 rounded-lg"
              />
              <button
                type="submit"
                className="bg-white w-80 h-10 mt-4 p-2 border-2 border-white rounded-lg text-primary font-bold hover:bg-primary hover:text-white transition duration-300"
              >
                Log In
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
