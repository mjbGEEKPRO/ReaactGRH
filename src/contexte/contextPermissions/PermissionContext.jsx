import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import api from "../../utils/api";
import { authUtils } from "../../utils/redirectionForm";

const PermissionContext = createContext();

export const usePermissions = () => {
  const context = useContext(PermissionContext);
  if (!context) {
    throw new Error(
      "usePermissions doit être utilisé dans un PermissionProvider"
    );
  }
  return context;
};

export const PermissionProvider = ({ children }) => {
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadPermissions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const token = authUtils.getToken();
      if (!token || !authUtils.isAuthenticated()) {
        setPermissions([]);
        setLoading(false);
        return;
      }

      const response = await api.get("/api/user/permissions", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.data.success) {
        console.log("permission reçu ", response.data.permissions);
        setPermissions(response.data.permissions || []);
      }
    } catch (err) {
      console.error("❌ Erreur permissions:", err);
      setError(err.message);
      setPermissions([]);
    } finally {
      setLoading(false);
    }
  }, []); // Pas de dépendances

  useEffect(() => {
    console.log("🔄 PermissionContext: Initialisation");
    console.log("authentifier ", authUtils.isAuthenticated());
    if (authUtils.isAuthenticated()) {
      console.log("chargeent des permissions...");
      loadPermissions();
    } else {
      console.log("pas authentifier");
      setPermissions([]);
      setLoading(false);
    }
  }, [loadPermissions]);

  const hasPermission = useCallback(
    (permissionName) => {
      if (!permissionName) return false;
      return permissions.some(
        (perm) => perm.nom === permissionName || perm.slug === permissionName
      );
    },
    [permissions]
  );

  const hasAllPermissions = useCallback(
    (permissionNames) => {
      if (!Array.isArray(permissionNames) || permissionNames.length === 0)
        return false;
      return permissionNames.every((nom) => hasPermission(nom));
    },
    [hasPermission]
  );

  const hasAnyPermission = useCallback(
    (permissionNames) => {
      if (!Array.isArray(permissionNames) || permissionNames.length === 0)
        return false;
      return permissionNames.some((nom) => hasPermission(nom));
    },
    [hasPermission]
  );

  const clearPermissions = useCallback(() => {
    setPermissions([]);
    setLoading(false);
    setError(null);
  }, []);

  const value = {
    permissions,
    loading,
    error,
    hasPermission,
    hasAllPermissions,
    hasAnyPermission,
    refreshPermissions: loadPermissions,
    clearPermissions,
  };

  return (
    <PermissionContext.Provider value={value}>
      {children}
    </PermissionContext.Provider>
  );
};
