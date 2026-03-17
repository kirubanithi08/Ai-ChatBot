const Input = ({ label, type = "text", ...props }) => (
  <div className="mb-4">
    <label className="block mb-1.5 text-sm font-medium text-gray-300">
      {label}
    </label>
    <input
      type={type}
      className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
      {...props}
    />
  </div>
);

export default Input;