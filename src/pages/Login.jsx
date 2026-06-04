import { useState } from "react";
import Button from "../components/Button";
import Display from "../components/Display";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

function Login() {
  const formStyle = "border-2 border-black mt-5 w-full p-2 text-center rounded-xl";
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", new URLSearchParams({
        username: formData.email,
        password: formData.password,
      }));
      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("user_id", res.data.user_id);

      if (res.data.role === "vendor") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      alert(err.response?.data?.detail || "Login failed");
    }
  };

  return (
    <>
      <Display text="Login" />

      <div className="flex flex-col items-center justify-center w-3/6 mx-auto mt-5 text-center">
        <form
          onSubmit={handleSubmit}
          className="border-2 border-black w-full p-5 rounded-xl mb-5"
        >
          <input
            className={formStyle}
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          /><br />
          <input
            className={formStyle}
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          /><br />

          <Button text="Login" type="submit" />
        </form>
      </div>

      <div className="mx-auto mt-4 text-center">
        <p>
          <span className="font-bold">Don't have an account?</span>{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">Sign Up</Link>
        </p>
      </div>
    </>
  );
}

export default Login;