function Settings() {
  return (
    <div className="h-full flex flex-col items-center justify-center bg-[#111111] text-center p-8">
      <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-5">
        <i className="fa-solid fa-gear text-gray-500 text-xl" />
      </div>
      <h2 className="text-lg font-semibold text-gray-300 mb-2">Settings</h2>
      <p className="text-sm text-gray-600 max-w-xs">
        Settings will be available here soon.
      </p>
    </div>
  );
}

export default Settings;