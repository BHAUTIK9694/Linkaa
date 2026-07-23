import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { authService } from '@services/adminService';

/**
 * @typedef {object} AdminUser
 * @property {number} id
 * @property {string} name
 * @property {string} email
 */

/**
 * @typedef {object} AdminAuthContextValue
 * @property {AdminUser|null} admin
 * @property {boolean} isLoading
 * @property {boolean} isAuthenticated
 * @property {(credentials: {email:string, password:string}) => Promise<void>} login
 * @property {() => Promise<void>} logout
 */

export const AdminAuthContext = createContext(/** @type {AdminAuthContextValue} */ (null));

/**
 * Provides admin authentication state across the admin subtree.
 * Restores session on mount via /api/admin/auth/me.
 */
export function AdminAuthProvider({ children }) {
  const [admin, setAdmin]       = useState(null);
  const [isLoading, setLoading] = useState(true);

  // Restore session on page reload
  useEffect(() => {
    authService
      .me()
      .then((res) => setAdmin(res.data?.admin ?? null))
      .catch(() => setAdmin(null))
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback(async (credentials) => {
    const res = await authService.login(credentials);
    setAdmin(res.data?.admin ?? null);
  }, []);

  const logout = useCallback(async () => {
    await authService.logout().catch(() => {});
    setAdmin(null);
  }, []);

  const value = {
    admin,
    isLoading,
    isAuthenticated: admin !== null,
    login,
    logout,
  };

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

/**
 * Hook to consume admin auth context.
 * @returns {AdminAuthContextValue}
 */
// eslint-disable-next-line react-refresh/only-export-components
export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error('useAdminAuth must be used inside <AdminAuthProvider>');
  return ctx;
}
