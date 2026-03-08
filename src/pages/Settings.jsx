import React from "react";

function Settings() {
  const sections = [
    { title: "Profile", icon: "fa-user", color: "bg-blue-50 text-blue-600" },
    { title: "Notifications", icon: "fa-bell", color: "bg-orange-50 text-orange-600" },
    { title: "Privacy & Security", icon: "fa-shield-halved", color: "bg-green-50 text-green-600" },
    { title: "Appearance", icon: "fa-palette", color: "bg-purple-50 text-purple-600" },
    { title: "Language", icon: "fa-globe", color: "bg-indigo-50 text-indigo-600" },
    { title: "Help & Support", icon: "fa-circle-question", color: "bg-gray-50 text-gray-600" },
  ];

  return (
    <div className="min-h-screen bg-gray-50/30 p-8">
      <div className="max-w-2xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Settings</h1>
          <p className="text-gray-500 mt-2">Manage your account preferences and application settings.</p>
        </header>

        <div className="grid gap-4">
          {sections.map((section, idx) => (
            <button
              key={idx}
              className="w-full flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 ${section.color} rounded-xl flex items-center justify-center text-lg`}>
                  <i className={`fa-solid ${section.icon}`}></i>
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-800">{section.title}</h3>
                  <p className="text-xs text-gray-400">Configure your {section.title.toLowerCase()} preferences</p>
                </div>
              </div>
              <i className="fa-solid fa-chevron-right text-gray-300 group-hover:text-indigo-400 transition-colors"></i>
            </button>
          ))}
        </div>

        <div className="mt-12 p-6 bg-red-50 rounded-2xl border border-red-100 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-red-800">Danger Zone</h3>
            <p className="text-xs text-red-600 mt-1">Permanently delete your account and all data.</p>
          </div>
          <button className="px-4 py-2 bg-red-600 text-white rounded-xl text-sm font-bold hover:bg-red-700 transition-colors">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
