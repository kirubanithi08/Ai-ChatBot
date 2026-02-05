const Input = ({ label, ...props }) => (
  <div className="mb-4">
    <label className="block mb-1 text-sm font-medium">{label}</label>
    <input
      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
      {...props}
    />
  </div>
);

export default Input;
