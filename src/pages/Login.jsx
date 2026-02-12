import { useState } from "react";
import { loginUser } from "../api/auth";
import { useAuth } from "../auth/AuthContext";
import Input from "../components/Input";

const Login = ({ onSuccess }) => {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await loginUser(form);
    login(res.data.token);
    onSuccess();
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <form onSubmit={handleSubmit}>
        <Input label="Email" type="email"
          onChange={e => setForm({ ...form, email: e.target.value })}
        />
        <Input label="Password" type="password"
          onChange={e => setForm({ ...form, password: e.target.value })}
        />
        <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
          Login
        </button>
      </form>
    </>
  );
};

export default Login;

