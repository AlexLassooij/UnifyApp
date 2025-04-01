'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';
import { 
  User, 
  onAuthStateChanged, 
  setPersistence, 
  browserLocalPersistence,
  signOut as firebaseSignOut,
  getIdToken, 
} from 'firebase/auth';
import { useRouter, usePathname } from 'next/navigation';
import { auth } from '@/firebase/clientApp';
import { useUserStore } from '@/store/userStore';

// Define context types
interface AuthContextType {
  firebaseUser: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  syncUserWithAPI: (user: User, additionalData?: Record<string, any>) => Promise<any>;
  signOut: () => Promise<void>;
  getAuthToken: () => Promise<string | null>;
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  firebaseUser: null,
  isLoading: true,
  isAuthenticated: false,
  syncUserWithAPI: async () => null,
  signOut: async () => {},
  getAuthToken: async () => null
});

// Hook to use the auth context
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: {children: ReactNode}) {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user, setUser, logout } = useUserStore();
  const router = useRouter();
  const pathname = usePathname();
  const syncInProgress = useRef<boolean>(false);

  // Set persistence on mount
  useEffect(() => {
    setPersistence(auth, browserLocalPersistence)
      .then(() => console.log("Auth persistence set to local"))
      .catch(error => console.error("Error setting persistence:", error));
  }, []);

  // Utility to get a fresh auth token
  const getAuthToken = async (): Promise<string | null> => {
    if (!firebaseUser) return null;
    try {
      return await getIdToken(firebaseUser, true);
    } catch (error) {
      console.error("Error getting auth token:", error);
      return null;
    }
  };

  const syncUserWithAPI = async (
    userToSync: User | null = null, 
    additionalData?: Record<string, any>
  ) => {
    // If a sync is already in progress, don't start another one
    if (syncInProgress.current) {
      console.log("Sync already in progress, skipping duplicate request");
      return null;
    }
    
    // Use provided user, fallback to current Firebase user, then context state
    const currentUser = userToSync || auth.currentUser || firebaseUser;
    if (!currentUser) {
      console.error("Cannot sync - no Firebase user");
      return { error: "No user to sync" };
    }

    try {
      syncInProgress.current = true;
      console.log(`Starting API sync for user: ${currentUser.email}`);
      
      const token = await getIdToken(currentUser, true);
      
      // Base request data
      const requestData = {
        email: currentUser.email,
        ...additionalData // Allow overriding properties
      };
      
      console.log("Syncing user with API:", requestData);
      
      // don't use client here because we are authenticating
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const userData = await response.json();
        console.log("User data from API:", userData);
        setUser(userData);
        return { userData, status: response.status };
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error("API sync failed:", response.status, errorData);
        return { error: errorData, status: response.status };
      }
    } catch (error) {
      console.error("Error syncing user data:", error);
      return { error };
    } finally {
      syncInProgress.current = false;
    }
  };

  // Function to sign out
  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      logout(); // Clear user from store
      router.push('/login'); // Redirect to login page
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log("Auth state changed:", currentUser ? `User (${currentUser.email}) logged in` : "No user");
      
      setFirebaseUser(currentUser);
      
      // If we have a Firebase user but no app user, sync with API to get the user data
      // if (currentUser && !user && !syncInProgress.current) {
      //   await syncUserWithAPI(currentUser);
      // }
      
      // Handle logout - when Firebase user is null but we still have a user in our store
      if (!currentUser && user) {
        logout();
      }
      
      // Auth state has been determined
      setIsLoading(false);
    });

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, [user]); // Only re-run when user in store changes

  // Protect routes that require authentication
  useEffect(() => {
    // Skip during loading state
    if (isLoading) return;
    console.debug('checking public route')
    // Skip for public routes
    const publicRoutes = ['/login', '/signup', '/', '/parents', '/about', '/students', '/testimonials'];
    if (publicRoutes.some(route => route.includes(pathname))) return;
    
    // If not authenticated and not on a public route, redirect to login
    if (!firebaseUser && !pathname?.startsWith('/login')) {
      const returnUrl = encodeURIComponent(pathname || '/');
      router.push(`/login?returnUrl=${returnUrl}`);
    }
  }, [firebaseUser, isLoading, pathname, router]);

  // Create context value
  const value = {
    firebaseUser,
    isLoading,
    isAuthenticated: !!firebaseUser,
    syncUserWithAPI,
    signOut,
    getAuthToken
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Export a wrapper for APIClient that uses the auth context
export function withAuth<T extends (...args: any[]) => any>(apiFunction: T): T {
  return (async (...args: Parameters<T>): Promise<ReturnType<T>> => {
    // This function will be called when using the API
    const authContext = useAuth();
    
    // Ensure we have a token
    await authContext.getAuthToken();
    
    // Pass through to the original function
    return apiFunction(...args);
  }) as T;
}