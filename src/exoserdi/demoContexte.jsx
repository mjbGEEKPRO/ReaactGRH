import React, { useState } from "react";

function DarkThemeDemo() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // Classes de style pour mode clair et sombre
  const styles = {
    bg: theme === "dark" ? "bg-gray-900" : "bg-gray-50",
    card:
      theme === "dark"
        ? "bg-gray-800 border-gray-700"
        : "bg-white border-gray-200",
    text: theme === "dark" ? "text-white" : "text-gray-800",
    textSecondary: theme === "dark" ? "text-gray-400" : "text-gray-600",
    border: theme === "dark" ? "border-gray-700" : "border-gray-200",
    hover: theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100",
    buttonBg:
      theme === "dark"
        ? "bg-gray-800 border-gray-600"
        : "bg-white border-gray-300",
    buttonText: theme === "dark" ? "text-gray-200" : "text-gray-700",
    progressBg: theme === "dark" ? "bg-gray-700" : "bg-gray-200",
    badgeRed:
      theme === "dark"
        ? "bg-red-900/30 text-red-400 border-red-700"
        : "bg-red-100 text-red-700 border-red-300",
    badgeBlue:
      theme === "dark"
        ? "bg-blue-900/30 text-blue-400 border-blue-700"
        : "bg-blue-100 text-blue-700 border-blue-300",
    badgeGreen:
      theme === "dark"
        ? "bg-green-900/30 text-green-400 border-green-700"
        : "bg-green-100 text-green-700 border-green-300",
    statGreen: theme === "dark" ? "text-green-400" : "text-green-600",
    statBlue: theme === "dark" ? "text-blue-400" : "text-blue-600",
  };

  return (
    <div
      className={`min-h-screen ${styles.bg} transition-colors duration-300 p-8`}
    >
      {/* Bouton de basculement */}
      <div className="max-w-4xl mx-auto mb-8">
        <button
          onClick={toggleTheme}
          className={`${styles.buttonBg} border px-6 py-3 rounded-xl ${styles.buttonText} ${styles.hover} transition-all duration-300 shadow-lg flex items-center gap-3 font-medium`}
        >
          {theme === "light" ? (
            <>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
              Mode Sombre
            </>
          ) : (
            <>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              Mode Clair
            </>
          )}
        </button>
      </div>

      {/* Grille de cartes de démonstration */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Carte 1 : Informations utilisateur */}
        <div
          className={`${styles.card} rounded-2xl shadow-lg border p-6 transition-colors duration-300`}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">JD</span>
            </div>
            <div>
              <h3 className={`text-lg font-bold ${styles.text}`}>John Doe</h3>
              <p className={`text-sm ${styles.textSecondary}`}>
                Développeur Senior
              </p>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <div className={`flex items-center gap-2 ${styles.textSecondary}`}>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span>john.doe@entreprise.com</span>
            </div>
            <div className={`flex items-center gap-2 ${styles.textSecondary}`}>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span>Département IT</span>
            </div>
          </div>
        </div>

        {/* Carte 2 : Statistiques */}
        <div
          className={`${styles.card} rounded-2xl shadow-lg border p-6 transition-colors duration-300`}
        >
          <h3 className={`text-lg font-bold ${styles.text} mb-4`}>
            Statistiques
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className={`text-sm ${styles.textSecondary}`}>
                Tâches terminées
              </span>
              <span className={`text-2xl font-bold ${styles.statGreen}`}>
                24
              </span>
            </div>
            <div className={`w-full ${styles.progressBg} rounded-full h-2`}>
              <div
                className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                style={{ width: "75%" }}
              ></div>
            </div>
            <div className="flex items-center justify-between">
              <span className={`text-sm ${styles.textSecondary}`}>
                En cours
              </span>
              <span className={`text-2xl font-bold ${styles.statBlue}`}>8</span>
            </div>
          </div>
        </div>

        {/* Carte 3 : Tâche prioritaire */}
        <div
          className={`${styles.card} rounded-2xl shadow-lg border p-6 transition-colors duration-300`}
        >
          <div className="flex items-start justify-between mb-3">
            <h3 className={`text-lg font-bold ${styles.text}`}>
              Révision de code
            </h3>
            <span
              className={`px-3 py-1 ${styles.badgeRed} text-xs font-medium rounded-full border`}
            >
              Urgent
            </span>
          </div>
          <p className={`text-sm ${styles.textSecondary} mb-4`}>
            Examiner les pull requests en attente et fournir des commentaires
            détaillés.
          </p>
          <div className="flex items-center justify-between">
            <div
              className={`flex items-center gap-2 text-sm ${styles.textSecondary}`}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>Aujourd'hui</span>
            </div>
            <button className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors">
              Commencer
            </button>
          </div>
        </div>

        {/* Carte 4 : Projet */}
        <div
          className={`${styles.card} rounded-2xl shadow-lg border p-6 transition-colors duration-300`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className={`text-lg font-bold ${styles.text}`}>
                Application Mobile
              </h3>
              <span
                className={`text-xs px-2 py-1 ${styles.badgeBlue} rounded-full border`}
              >
                En cours
              </span>
            </div>
          </div>
          <div className="mb-3">
            <div
              className={`flex justify-between text-xs ${styles.textSecondary} mb-1`}
            >
              <span>Progression</span>
              <span className="font-semibold">65%</span>
            </div>
            <div className={`w-full ${styles.progressBg} rounded-full h-2.5`}>
              <div
                className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2.5 rounded-full"
                style={{ width: "65%" }}
              ></div>
            </div>
          </div>
          <p className={`text-xs ${styles.textSecondary}`}>
            5 tâches restantes • Échéance: 15 Nov 2024
          </p>
        </div>

        {/* Carte 5 : Notification */}
        <div
          className={`md:col-span-2 ${
            theme === "dark"
              ? "from-purple-700 to-indigo-800"
              : "from-purple-500 to-indigo-600"
          } bg-gradient-to-r rounded-2xl shadow-lg p-6 text-white transition-colors duration-300`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">
                  Nouvelle mise à jour disponible
                </h3>
                <p className="text-white/80 text-sm">
                  Version 2.5.0 avec de nouvelles fonctionnalités
                </p>
              </div>
            </div>
            <button className="px-4 py-2 bg-white text-purple-600 font-medium rounded-lg hover:bg-gray-100 transition-colors">
              Mettre à jour
            </button>
          </div>
        </div>
      </div>

      {/* Légende */}
      <div
        className={`max-w-4xl mx-auto mt-8 ${styles.card} rounded-xl shadow-lg border p-6 transition-colors duration-300`}
      >
        <h3 className={`text-lg font-bold ${styles.text} mb-4`}>
          🎨 Palette de couleurs professionnelle
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <div className={`font-semibold ${styles.text} mb-2`}>
              Fond principal
            </div>
            <div className="flex gap-2">
              <div
                className="w-8 h-8 bg-gray-50 border border-gray-300 rounded"
                title="Mode clair"
              ></div>
              <div
                className="w-8 h-8 bg-gray-900 border border-gray-700 rounded"
                title="Mode sombre"
              ></div>
            </div>
            <p className={`text-xs ${styles.textSecondary} mt-1`}>
              gray-50 / gray-900
            </p>
          </div>
          <div>
            <div className={`font-semibold ${styles.text} mb-2`}>Cartes</div>
            <div className="flex gap-2">
              <div
                className="w-8 h-8 bg-white border border-gray-300 rounded"
                title="Mode clair"
              ></div>
              <div
                className="w-8 h-8 bg-gray-800 border border-gray-700 rounded"
                title="Mode sombre"
              ></div>
            </div>
            <p className={`text-xs ${styles.textSecondary} mt-1`}>
              white / gray-800
            </p>
          </div>
          <div>
            <div className={`font-semibold ${styles.text} mb-2`}>Texte</div>
            <div className="flex gap-2">
              <div
                className="w-8 h-8 bg-gray-800 border border-gray-300 rounded"
                title="Mode clair"
              ></div>
              <div
                className="w-8 h-8 bg-white border border-gray-700 rounded"
                title="Mode sombre"
              ></div>
            </div>
            <p className={`text-xs ${styles.textSecondary} mt-1`}>
              gray-800 / white
            </p>
          </div>
          <div>
            <div className={`font-semibold ${styles.text} mb-2`}>Accents</div>
            <div className="flex gap-2">
              <div className="w-8 h-8 bg-purple-600 rounded"></div>
              <div className="w-8 h-8 bg-indigo-600 rounded"></div>
            </div>
            <p className={`text-xs ${styles.textSecondary} mt-1`}>Conservés</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DarkThemeDemo;
