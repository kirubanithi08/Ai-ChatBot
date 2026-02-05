import { useState } from "react";
import { signupUser } from "../api/auth";
import Input from "../components/Input";

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signupUser(form);
    alert("Account created");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form className="bg-white p-8 rounded-xl shadow-md w-96" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <Input label="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
        <Input label="Email" type="email" onChange={e => setForm({ ...form, email: e.target.value })} />
        <Input label="Password" type="password" onChange={e => setForm({ ...form, password: e.target.value })} />
        <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
          Create Account
        </button>
      </form>
    </div>
  );
};

export default Signup;
