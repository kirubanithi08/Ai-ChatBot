import { useState } from "react";
import { loginUser } from "../api/auth";
import { useAuth } from "../auth/AuthContext";
import Input from "../components/Input";

const Login = () => {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await loginUser(form);
    login(res.data.token);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <Input label="Email" type="email" onChange={e => setForm({ ...form, email: e.target.value })} />
        <Input label="Password" type="password" onChange={e => setForm({ ...form, password: e.target.value })} />
        <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
