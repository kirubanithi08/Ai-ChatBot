import { useState } from "react";
import { signupUser } from "../api/auth";
import Input from "../components/Input";

const Signup = ({ onSuccess }) => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signupUser(form);
    onSuccess();
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <Input label="Name"
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
        <Input label="Email" type="email"
          onChange={e => setForm({ ...form, email: e.target.value })}
        />
        <Input label="Password" type="password"
          onChange={e => setForm({ ...form, password: e.target.value })}
        />
        <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
          Create Account
        </button>
      </form>
    </>
  );
};

export default Signup;

