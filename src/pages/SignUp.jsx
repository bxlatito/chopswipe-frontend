import { useState } from "react";
import Button from "../components/Button";
import Display from "../components/Display";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

function SignUp() {
  const formStyle = "border-2 border-black mt-5 w-full p-2 text-center rounded-xl";
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/register", formData);
      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("user_id", res.data.user_id);

      if (res.data.role === "vendor") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      alert(err.response?.data?.detail || "Registration failed");
    }
  };

  return (
    <>
      <Display text="Sign Up" />

      <div className="flex flex-col items-center justify-center w-3/6 mx-auto mt-5 text-center">
        <form
          onSubmit={handleSubmit}
          className="border-2 border-black w-full p-5 rounded-xl mb-5"
        >
          <input
            className={formStyle}
            type="text"
            name="full_name"
            placeholder="Full Name"
            value={formData.full_name}
            onChange={handleChange}
          /><br />
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
          <select
            className={formStyle}
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="">Select Role</option>
            <option value="student">Student</option>
            <option value="vendor">Vendor</option>
          </select><br />

          <Button text="Sign Up" type="submit" />
        </form>
      </div>

      <div className="mx-auto mt-4 text-center">
        <p>
          <span className="font-bold">Already have an account?</span>{" "}
          <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
        </p>
      </div>
    </>
  );
}

export default SignUp;