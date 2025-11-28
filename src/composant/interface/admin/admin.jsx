import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { authUtils } from "../../../utils/redirectionForm";
import { getGreeting } from "../../../utils/greeting";
import Permissions from "../permission";
import ConnectionHistory from "./connexionHistorique";
import ProjectManagement from "./projectModal";
import TaskManagement from "./taskModal";
import UserManagement from "./userModal";
import SecurityDashboard from "./dashboard";
import Settings from "../setting";
import ThemeToggle from "../../../component/ThemeToggle";

// Import des composants de permission
import { Can, AccessDenied } from "../../../component/PermissionGuard";
import { usePermissions } from "../../../contexte/contextPermissions/PermissionContext";

function Admin() {
  const [user, setUser] = useState(null);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [showSettings, setShowSettings] = useState(false);

  const { hasPermission, refreshPermissions } = usePermissions();

  useEffect(() => {
    const initializeData = async () => {
      try {
        const isAuthenticated = await authUtils.verifyAndRedirect();
        if (isAuthenticated) {
          const userData = authUtils.getUserData();

          if (userData?.departement !== "Administration") {
            toast.error("Accès non autorisé");
            return;
          }

          setUser(userData);
        }
      } catch (error) {
        console.error("Erreur vérification auth:", error);
        window.location.href = "/";
      }
    };

    initializeData();
  }, []);

  const navigationItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: "📊",
      permission: "admin.dashboard",
    },
    {
      id: "users",
      label: "Utilisateurs",
      icon: "👥",
      permission: "users.view",
    },
    {
      id: "projects",
      label: "Projets",
      icon: "📁",
      permission: "projects.view",
    },
    {
      id: "tasks",
      label: "Tâches",
      icon: "✅",
      permission: "tasks.view",
    },
    {
      id: "permissions",
      label: "Permissions",
      icon: "🔐",
      permission: "permissions.view",
    },
    {
      id: "connexion",
      label: "Connexion",
      icon: "🕒",
      permission: "connexion.history",
    },
    {
      id: "reports",
      label: "Rapports",
      icon: "📈",
      permission: "reports.view",
    },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "users":
        return (
          <Can
            permission="users.view"
            fallback={<AccessDenied section="la gestion des utilisateurs" />}
          >
            <UserManagement
              onNavigateToPermissions={() => setActiveSection("permissions")}
            />
          </Can>
        );

      case "projects":
        return (
          <Can
            permission="projects.view"
            fallback={<AccessDenied section="la gestion des projets" />}
          >
            <ProjectManagement />
          </Can>
        );

      case "tasks":
        return (
          <Can
            permission="tasks.view"
            fallback={<AccessDenied section="la gestion des tâches" />}
          >
            <TaskManagement
              onNavigateToPermissions={() => setActiveSection("permissions")}
            />
          </Can>
        );

      case "permissions":
        return (
          <Can
            permission="permissions.view"
            fallback={<AccessDenied section="la gestion des permissions" />}
          >
            <Permissions />
          </Can>
        );

      case "connexion":
        return (
          <Can
            permission="connexion.history"
            fallback={<AccessDenied section="l'historique des connexions" />}
          >
            <ConnectionHistory />
          </Can>
        );

      case "reports":
        return (
          <Can
            permission="reports.view"
            fallback={<AccessDenied section="les rapports" />}
          >
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-indigo-100 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                Section Rapports
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Les rapports et statistiques seront bientôt disponibles.
              </p>
            </div>
          </Can>
        );

      default:
        return (
          <Can
            permission="admin.dashboard"
            fallback={<AccessDenied section="le tableau de bord" />}
          >
            <SecurityDashboard />
          </Can>
        );
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-blue-100 dark:from-indigo-900 dark:via-purple-900 dark:to-blue-800 flex items-center justify-center">
        <div className="text-gray-800 dark:text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 dark:border-white mx-auto mb-4"></div>
          <p>Vérification des autorisations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-blue-100 dark:from-indigo-900 dark:via-purple-900 dark:to-blue-800 flex">
      <ToastContainer />

      {/* Sidebar */}
      <div className="w-72 bg-white/90 dark:bg-white/10 backdrop-blur-xl border-r border-gray-300 dark:border-white/20 p-6">
        {/* User Info */}
        <div className="flex items-center space-x-3 mb-10">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">
              {user.prenom?.charAt(0)}
              {user.nom?.charAt(0)}
            </span>
          </div>
          <div>
            <h2 className="text-gray-800 dark:text-white font-semibold text-lg">
              {user.prenom} {user.nom}
            </h2>
            <p className="text-gray-600 dark:text-white/70 text-sm">
              Administrateur
            </p>
          </div>
        </div>
        {/* Navigation avec permissions */}
        <nav className="grid grid-cols-2 gap-4">
          {navigationItems.map((item) => {
            const canAccess = hasPermission(item.permission);

            return (
              <button
                key={item.id}
                onClick={() => canAccess && setActiveSection(item.id)}
                disabled={!canAccess}
                className={`flex flex-col items-center justify-center p-4 rounded-2xl transition-all shadow-md relative ${
                  activeSection === item.id
                    ? "bg-indigo-600 dark:bg-white text-white dark:text-gray-800 shadow-lg scale-105"
                    : canAccess
                    ? "bg-indigo-100 dark:bg-white/20 text-gray-800 dark:text-white hover:bg-indigo-200 dark:hover:bg-white/30 hover:scale-105"
                    : "bg-gray-100 dark:bg-white/10 text-gray-400 dark:text-white/40 cursor-not-allowed opacity-50"
                }`}
                title={!canAccess ? "Permission requise" : item.label}
              >
                <span className="text-3xl mb-2">{item.icon}</span>
                <span className="text-xs font-medium text-center">
                  {item.label}
                </span>
                {!canAccess && (
                  <div className="absolute top-1 right-1 text-xs">🔒</div>
                )}
              </button>
            );
          })}
        </nav>{" "}
        {/* Légende */}
        <Can
          permission="admin.access"
          fallback={
            <div className="mt-6 p-3 bg-indigo-100 dark:bg-white/10 rounded-xl text-xs text-gray-700 dark:text-white/70">
              <p className="font-semibold mb-1">🔒 = Accès restreint</p>
              <p>Contactez l'admin pour plus de permissions  </p>
              <p>Contacte :   </p>
              <p>adresse :    </p>
            </div>
          }
        ></Can>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-gray-50 dark:bg-transparent">
        {/* Top Header */}
        <header className="bg-white dark:bg-white/20 backdrop-blur-xl border-b border-gray-200 dark:border-white/30 px-8 py-5">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                {getGreeting()}, {user.prenom}
              </h1>
              <p className="text-gray-600 dark:text-white/80 text-sm mt-1">
                Administration -{" "}
                {
                  navigationItems.find((item) => item.id === activeSection)
                    ?.label
                }
              </p>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-3">
              <ThemeToggle />
              {/* Bouton Settings protégé */}
              <Can
                permission="admin.settings"
                fallback={
                  <button
                    onClick={() =>
                      toast.error("❌ Vous n'avez pas accès aux paramètres")
                    }
                    className="bg-gray-100 dark:bg-white/10 backdrop-blur-sm border border-gray-300 dark:border-white/30 p-3 rounded-2xl text-gray-400 dark:text-white/40 cursor-not-allowed relative group"
                    title="Accès refusé"
                  >
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
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span className="absolute -top-1 -right-1 text-xs">🔒</span>
                  </button>
                }
              >
                <button
                  onClick={() => setShowSettings(true)}
                  className="bg-gray-100 dark:bg-white/20 backdrop-blur-sm border border-gray-300 dark:border-white/30 p-3 rounded-2xl text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-white/30 transition-all duration-300 shadow-md hover:shadow-lg"
                  title="Paramètres"
                >
                  <svg
                    className="w-5 h-5 hover:rotate-90 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </button>
              </Can>

              <button
                onClick={() => authUtils.logout()}
                className="bg-gray-100 dark:bg-white/20 backdrop-blur-sm border border-gray-300 dark:border-white/30 py-2 px-5 rounded-2xl text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-white/30 transition-all duration-300 shadow-md hover:shadow-lg font-medium"
              >
                Déconnexion
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-8 overflow-y-auto">{renderContent()}</main>
      </div>

      {/* Settings Modal - Protégé par permission */}
      {showSettings && (
        <Can
          permission="admin.settings"
          fallback={
            <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50">
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 max-w-md w-full mx-4 text-center">
                <div className="text-6xl mb-4">🔒</div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                  Accès Refusé aux Paramètres
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Vous n'avez pas la permission d'accéder aux paramètres
                  système.
                </p>
                <div className="text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 inline-block px-4 py-2 rounded-lg mb-4">
                  Permission requise: <strong>Admin paramètre</strong>
                </div>
                <button
                  onClick={() => setShowSettings(false)}
                  className="bg-indigo-600 dark:bg-indigo-700 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors w-full"
                >
                  Fermer
                </button>
              </div>
            </div>
          }
        >
          <Settings user={user} onClose={() => setShowSettings(false)} />
        </Can>
      )}
    </div>
  );
}

export default Admin;
