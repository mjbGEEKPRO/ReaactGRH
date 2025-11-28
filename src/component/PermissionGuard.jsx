import React from "react";
import { usePermissions } from "../contexte/contextPermissions/PermissionContext";

// COMPOSANT CAN - Affiche du contenu si permission accordée

export const Can = ({
  permission,
  permissions,
  requireAll = false,
  fallback = null,
  children,
}) => {
  const { hasPermission, hasAllPermissions, hasAnyPermission, loading } =
    usePermissions();

  if (loading) {
    return fallback;
  }

  let hasAccess = false;

  if (permission) {
    // Une seule permission
    hasAccess = hasPermission(permission);
  } else if (permissions) {
    // Plusieurs permissions
    hasAccess = requireAll
      ? hasAllPermissions(permissions)
      : hasAnyPermission(permissions);
  }

  return hasAccess ? <>{children}</> : fallback;
};

// ============================================
// COMPOSANT CANNOT - Cache du contenu si permission accordée
// ============================================
export const Cannot = ({
  permission,
  permissions,
  requireAll = false,
  children,
}) => {
  const { hasPermission, hasAllPermissions, hasAnyPermission, loading } =
    usePermissions();

  if (loading) {
    return null;
  }

  let hasAccess = false;

  if (permission) {
    hasAccess = hasPermission(permission);
  } else if (permissions) {
    hasAccess = requireAll
      ? hasAllPermissions(permissions)
      : hasAnyPermission(permissions);
  }

  return !hasAccess ? <>{children}</> : null;
};

// HOC - Protège des composants entiers

export const withPermission = (
  WrappedComponent,
  requiredPermission,
  FallbackComponent = null
) => {
  return (props) => {
    const { hasPermission, loading } = usePermissions();

    if (loading) {
      return FallbackComponent ? (
        <FallbackComponent />
      ) : (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Vérification des permissions...</p>
          </div>
        </div>
      );
    }

    if (!hasPermission(requiredPermission)) {
      return FallbackComponent ? (
        <FallbackComponent />
      ) : (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center max-w-md mx-4">
            <div className="text-6xl mb-4">🔒</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Accès Refusé
            </h2>
            <p className="text-gray-600 mb-4">
              Vous n'avez pas les permissions nécessaires pour accéder à cette
              page.
            </p>
            <button
              onClick={() => window.history.back()}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Retour
            </button>
          </div>
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };
};

// ============================================
// COMPOSANT ACCESS DENIED - Message d'accès refusé personnalisable
// ============================================
export const AccessDenied = ({
  section = "cette section",
  showBackButton = true,
  className = "",
}) => (
  <div
    className={`text-center py-16 bg-white rounded-3xl shadow-lg border border-red-100 ${className}`}
  >
    <div className="text-6xl mb-4">🔒</div>
    <h2 className="text-2xl font-bold text-gray-800 mb-2">
      💔Cher amie ce n'est pas de ta faute mais l'accès t'est refusé
    </h2>
    <p className="text-gray-600 mb-4">
      Vous n'avez pas les permissions nécessaires pour accéder à {section}.
    </p>
    <div className="text-sm text-gray-500 bg-gray-50 inline-block px-4 py-2 rounded-lg mb-4">
      Contactez un administrateur pour obtenir l'accès
    </div>
    {showBackButton && (
      <div>
        <button
          onClick={() => window.history.back()}
          // onClick={() => authUtils.logout()}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors mt-2"
        >
          Retour
        </button>
      </div>
    )}
  </div>
);
