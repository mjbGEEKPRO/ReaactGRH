import React, { useState, useEffect } from "react";

// ============================================
// MOCK API ET AUTH UTILS (Simulés pour la démo)
// ============================================
const mockAuthUtils = {
  getUserData: () => ({
    prenom: "Admin",
    nom: "Demo",
    departement: "Administration",
    permissions: [
      { name: "admin.access", slug: "admin-access" },
      { name: "admin.settings", slug: "admin-settings" },
      { name: "users.view", slug: "users-view" },
      { name: "projects.view", slug: "projects-view" },
      { name: "tasks.view", slug: "tasks-view" },
      { name: "permissions.view", slug: "permissions-view" },
      { name: "connexion.history", slug: "connexion-history" },
      { name: "reports.view", slug: "reports-view" },
    ]
  }),
  verifyAndRedirect: async () => true,
};

// ============================================
// PERMISSION CONTEXT
// ============================================
const PermissionContext = React.createContext();

const usePermissions = () => {
  const context = React.useContext(PermissionContext);
  if (!context) {
    throw new Error('usePermissions must be used within PermissionProvider');
  }
  return context;
};

const PermissionProvider = ({ children }) => {
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Charger les permissions depuis userData
    const userData = mockAuthUtils.getUserData();
    if (userData?.permissions) {
      setPermissions(userData.permissions);
    }
    setLoading(false);
  }, []);

  const hasPermission = (permissionName) => {
    return permissions.some(
      (perm) => perm.name === permissionName || perm.slug === permissionName
    );
  };

  const hasAllPermissions = (permissionNames) => {
    if (!Array.isArray(permissionNames)) return false;
    return permissionNames.every((name) => hasPermission(name));
  };

  const hasAnyPermission = (permissionNames) => {
    if (!Array.isArray(permissionNames)) return false;
    return permissionNames.some((name) => hasPermission(name));
  };

  const value = {
    permissions,
    loading,
    hasPermission,
    hasAllPermissions,
    hasAnyPermission,
  };

  return (
    <PermissionContext.Provider value={value}>
      {children}
    </PermissionContext.Provider>
  );
};

// ============================================
// PERMISSION GUARD COMPONENTS
// ============================================
const Can = ({ permission, permissions, requireAll = false, fallback = null, children }) => {
  const { hasPermission, hasAllPermissions, hasAnyPermission, loading } = usePermissions();

  if (loading) return fallback;

  let hasAccess = false;

  if (permission) {
    hasAccess = hasPermission(permission);
  } else if (permissions) {
    hasAccess = requireAll 
      ? hasAllPermissions(permissions) 
      : hasAnyPermission(permissions);
  }

  return hasAccess ? <>{children}</> : fallback;
};

const AccessDenied = ({ section }) => (
  <div className="text-center py-16 bg-white rounded-3xl shadow-lg border border-red-100">
    <div className="text-6xl mb-4">🔒</div>
    <h2 className="text-2xl font-bold text-gray-800 mb-2">
      Accès Refusé
    </h2>
    <p className="text-gray-600 mb-4">
      Vous n'avez pas les permissions nécessaires pour accéder à {section}.
    </p>
    <div className="text-sm text-gray-500 bg-gray-50 inline-block px-4 py-2 rounded-lg">
      Contactez un administrateur pour obtenir l'accès
    </div>
  </div>
);

// ============================================
// MOCK COMPONENTS
// ============================================
const UserManagement = ({ onNavigateToPermissions }) => (
  <div className="bg-white rounded-3xl shadow-lg border border-indigo-100 p-6">
    <h2 className="text-2xl font-bold text-gray-800 mb-4">👥 Gestion des Utilisateurs</h2>
    <p className="text-gray-600">Module de gestion des utilisateurs accessible.</p>
  </div>
);

const ProjectManagement = () => (
  <div className="bg-white rounded-3xl shadow-lg border border-indigo-100 p-6">
    <h2 className="text-2xl font-bold text-gray-800 mb-4">📁 Gestion des Projets</h2>
    <p className="text-gray-600">Module de gestion des projets accessible.</p>
  </div>
);

const TaskManagement = ({ onNavigateToPermissions }) => (
  <div className="bg-white rounded-3xl shadow-lg border border-indigo-100 p-6">
    <h2 className="text-2xl font-bold text-gray-800 mb-4">✅ Gestion des Tâches</h2>
    <p className="text-gray-600">Module de gestion des tâches accessible.</p>
  </div>
);

const Permissions = () => (
  <div className="bg-white rounded-3xl shadow-lg border border-indigo-100 p-6">
    <h2 className="text-2xl font-bold text-gray-800 mb-4">🔐 Gestion des Permissions</h2>
    <p className="text-gray-600">Module de gestion des permissions accessible.</p>
  </div>
);

const ConnectionHistory = () => (
  <div className="bg-white rounded-3xl shadow-lg border border-indigo-100 p-6">
    <h2 className="text-2xl font-bold text-gray-800 mb-4">🕒 Historique de Connexion</h2>
    <p className="text-gray-600">Historique des connexions accessible.</p>
  </div>
);

const Settings = ({ user, onClose }) => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full mx-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">⚙️ Paramètres</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="text-gray-600">
        <p className="mb-4">Utilisateur: {user.prenom} {user.nom}</p>
        <p>Accès aux paramètres accordé ✅</p>
      </div>
    </div>
  </div>
);

// ============================================
// ADMIN COMPONENT AVEC PERMISSIONS
// ============================================
function Admin() {
  const [user, setUser] = useState(null);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [showSettings, setShowSettings] = useState(false);
  const { hasPermission } = usePermissions();

  useEffect(() => {
    const initializeData = async () => {
      try {
        const isAuthenticated = await mockAuthUtils.verifyAndRedirect();
        if (isAuthenticated) {
          const userData = mockAuthUtils.getUserData();
          if (userData?.departement !== "Administration") {
            alert("Accès non autorisé");
            return;
          }
          setUser(userData);
        }
      } catch (error) {
        console.error("Erreur vérification auth:", error);
      }
    };

    initializeData();
  }, []);

  // Navigation items avec permissions requises
  const navigationItems = [
    { 
      id: "dashboard", 
      label: "Dashboard", 
      icon: "📊",
      permission: "admin.dashboard"
    },
    { 
      id: "users", 
      label: "Utilisateurs", 
      icon: "👥",
      permission: "users.view"
    },
    { 
      id: "projects", 
      label: "Projets", 
      icon: "📁",
      permission: "projects.view"
    },
    { 
      id: "tasks", 
      label: "Tâches", 
      icon: "✅",
      permission: "tasks.view"
    },
    { 
      id: "permissions", 
      label: "Permissions", 
      icon: "🔐",
      permission: "permissions.view"
    },
    { 
      id: "connexion", 
      label: "Connexion", 
      icon: "🕒",
      permission: "connexion.history"
    },
    { 
      id: "reports", 
      label: "Rapports", 
      icon: "📈",
      permission: "reports.view"
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
            <div className="text-center py-12 bg-white rounded-3xl shadow-lg border border-indigo-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Section Rapports
              </h2>
              <p className="text-gray-600">
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
            <div className="text-center py-12 bg-white rounded-3xl shadow-lg border border-indigo-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                📊 Tableau de Bord
              </h2>
              <p className="text-gray-600">
                Bienvenue sur votre espace d'administration.
              </p>
            </div>
          </Can>
        );
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-800 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Vérification des autorisations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-800 flex">
      {/* Sidebar */}
      <div className="w-72 bg-white/10 backdrop-blur-xl border-r border-white/20 p-6">
        {/* User Info */}
        <div className="flex items-center space-x-3 mb-10">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">
              {user.prenom?.charAt(0)}
              {user.nom?.charAt(0)}
            </span>
          </div>
          <div>
            <h2 className="text-white font-semibold text-lg">
              {user.prenom} {user.nom}
            </h2>
            <p className="text-white/70 text-sm">Administrateur</p>
          </div>
        </div>

        {/* Navigation avec permissions */}
        <nav className="grid grid-cols-2 gap-4">
          {navigationItems.map((item) => {
            const hasAccess = hasPermission(item.permission);
            
            return (
              <button
                key={item.id}
                onClick={() => hasAccess && setActiveSection(item.id)}
                disabled={!hasAccess}
                className={`flex flex-col items-center justify-center p-4 rounded-2xl transition-all shadow-md relative ${
                  activeSection === item.id
                    ? "bg-white text-gray-800 shadow-lg scale-105"
                    : hasAccess
                    ? "bg-white/20 text-white hover:bg-white/30 hover:scale-105"
                    : "bg-white/10 text-white/40 cursor-not-allowed opacity-50"
                }`}
              >
                <span className="text-3xl mb-2">{item.icon}</span>
                <span className="text-xs font-medium text-center">
                  {item.label}
                </span>
                {!hasAccess && (
                  <div className="absolute top-1 right-1 text-xs">🔒</div>
                )}
              </button>
            );
          })}
        </nav>

        {/* Légende des permissions */}
        <div className="mt-6 p-3 bg-white/10 rounded-xl text-xs text-white/70">
          <p className="font-semibold mb-1">🔒 = Accès restreint</p>
          <p>Contactez l'admin pour plus de permissions</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-white/20 backdrop-blur-xl border-b border-white/30 px-8 py-5">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-white">
                Bonjour, {user.prenom}
              </h1>
              <p className="text-white/80 text-sm mt-1">
                Administration -{" "}
                {
                  navigationItems.find((item) => item.id === activeSection)
                    ?.label
                }
              </p>
            </div>
            {/* Buttons */}
            <div className="flex items-center gap-3">
              <Can 
                permission="admin.settings" 
                fallback={
                  <button
                    onClick={() => alert("❌ Vous n'avez pas accès aux paramètres")}
                    className="bg-white/10 backdrop-blur-sm border border-white/30 p-3 rounded-2xl text-white/40 cursor-not-allowed relative group"
                    title="Accès refusé aux paramètres"
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
                    <div className="absolute bottom-full mb-2 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      Accès refusé
                    </div>
                  </button>
                }
              >
                <button
                  onClick={() => setShowSettings(true)}
                  className="bg-white/20 backdrop-blur-sm border border-white/30 p-3 rounded-2xl text-white hover:bg-white/30 transition-all duration-300 shadow-md hover:shadow-lg"
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
                onClick={() => alert("Déconnexion")}
                className="bg-white/20 backdrop-blur-sm border border-white/30 py-2 px-5 rounded-2xl text-white hover:bg-white/30 transition-all duration-300 shadow-md hover:shadow-lg font-medium"
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
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full mx-4 text-center">
                <div className="text-6xl mb-4">🔒</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Accès Refusé
                </h2>
                <p className="text-gray-600 mb-6">
                  Vous n'avez pas la permission d'accéder aux paramètres.
                </p>
                <button
                  onClick={() => setShowSettings(false)}
                  className="bg-indigo-600 text-white px-6 py-2 rounded-xl hover:bg-indigo-700 transition-colors"
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

// ============================================
// APP WRAPPER WITH PERMISSION PROVIDER
// ============================================
export default function App() {
  return (
    <PermissionProvider>
      <Admin />
    </PermissionProvider>
  );
}