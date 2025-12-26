import { usePermissions } from '../contexts/PermissionContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

// HOOK - Vérification avec redirection automatique

export const usePermissionCheck = (
  requiredPermission, 
  redirectTo = '/unauthorized'
) => {
  const { hasPermission, loading } = usePermissions();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && requiredPermission && !hasPermission(requiredPermission)) {
      console.warn(`Permission refusée: ${requiredPermission}. Redirection...`);
      navigate(redirectTo);
    }
  }, [hasPermission, requiredPermission, loading, navigate, redirectTo]);

  return { 
    hasAccess: hasPermission(requiredPermission), 
    loading 
  };
};

// ============================================
// HOOK - Vérifications multiples sans redirection
// ============================================
export const usePermissionChecks = () => {
  const permissions = usePermissions();
  
  return {
    ...permissions,
    // Helpers pour opérations CRUD
    canCreate: (resource) => permissions.hasPermission(`${resource}.create`),
    canRead: (resource) => permissions.hasPermission(`${resource}.read`),
    canView: (resource) => permissions.hasPermission(`${resource}.view`),
    canUpdate: (resource) => permissions.hasPermission(`${resource}.update`),
    canDelete: (resource) => permissions.hasPermission(`${resource}.delete`),
    canManage: (resource) => permissions.hasPermission(`${resource}.manage`),
    
    // Helpers pour opérations avancées
    canApprove: (resource) => permissions.hasPermission(`${resource}.approve`),
    canReject: (resource) => permissions.hasPermission(`${resource}.reject`),
    canExport: (resource) => permissions.hasPermission(`${resource}.export`),
    canAssign: (resource) => permissions.hasPermission(`${resource}.assign`),
    
    // Vérifications spécifiques GRH
    canAccessAdmin: () => permissions.hasPermission('admin.access'),
    canAccessSettings: () => permissions.hasPermission('admin.settings'),
    canManageUsers: () => permissions.hasPermission('users.manage'),
    canManageEmployees: () => permissions.hasPermission('employees.manage'),
    canApproveLeaves: () => permissions.hasPermission('leaves.approve'),
    canManagePermissions: () => permissions.hasPermission('permissions.manage'),
    canViewConnectionHistory: () => permissions.hasPermission('connexion.history'),
  };
};

// ============================================
// HOOK - Vérification de permissions multiples
// ============================================
export const useRequirePermissions = (
  requiredPermissions = [], 
  requireAll = true,
  redirectTo = '/unauthorized'
) => {
  const { hasAllPermissions, hasAnyPermission, loading } = usePermissions();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && requiredPermissions.length > 0) {
      const hasAccess = requireAll 
        ? hasAllPermissions(requiredPermissions)
        : hasAnyPermission(requiredPermissions);
      
      if (!hasAccess) {
        console.warn(`Permissions requises: ${requiredPermissions.join(', ')}. Redirection...`);
        navigate(redirectTo);
      }
    }
  }, [hasAllPermissions, hasAnyPermission, requiredPermissions, requireAll, loading, navigate, redirectTo]);

  return { 
    hasAccess: requireAll 
      ? hasAllPermissions(requiredPermissions)
      : hasAnyPermission(requiredPermissions),
    loading 
  };
};

// ============================================
// HOOK - Vérification pattern (ex: "users.*")
// ============================================
export const usePermissionPattern = (pattern) => {
  const { hasPermissionPattern, loading } = usePermissions();

  return {
    hasAccess: hasPermissionPattern(pattern),
    loading,
  };
};