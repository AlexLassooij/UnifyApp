import { auth } from '@/firebase/clientApp';
import { getIdToken, onAuthStateChanged, User } from 'firebase/auth';
import { useRouter } from 'next/router';
import { json } from 'stream/consumers';

interface ApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: any;
  headers?: Record<string, string>;
  redirectToLogin?: boolean;
}

async function getCurrentUser(): Promise<User | null> {
    // If auth is already initialized and we have a user, return immediately
    console.debug("Checking auth state", auth.currentUser);
    if (auth.currentUser) {
      return auth.currentUser;
    }
  
    // Otherwise, wait for auth state to be determined
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        unsubscribe(); // Stop listening once we get the auth state
        resolve(user);
      });
    });
  }
  

/**
 * Make an authenticated API request
 */
export async function apiRequest(url: string, options: ApiOptions = {}) {
    const { redirectToLogin = true } = options; // Default to redirecting

  // Check if a user is logged in
  const user = await getCurrentUser();
  if (!user) {
    console.error("User not authenticated");
    const loginPath = `/login?returnUrl=${encodeURIComponent(window.location.pathname)}`;
    window.location.href = loginPath;
  }
  
  // Get the current ID token
  const token = await getIdToken(user as User, true);
  
  // Default headers with authorization token
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    ...options.headers
  };
  
  // Make the request with the auth token
  const response = await fetch(url, {
    method: options.method || 'GET',
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  
  if (!response.ok) {
    // Handle 401 Unauthorized by redirecting to login
    if (response.status === 401 && redirectToLogin) {
        const loginPath = `/login?returnUrl=${encodeURIComponent(window.location.pathname)}`;
        window.location.href = loginPath;
        throw new Error("Unauthorized. Redirecting to login...");
      }
    const errorText = await response.text().catch(() => 'Unknown error');
    throw new Error(`API request failed: ${response.status} ${response.statusText} - ${errorText}`);
  }
  
  // For GET requests or requests that return no content
  if (response.status === 204 || options.method === 'DELETE') {
    return null;
  }
  
  // Parse the JSON response
//   console.debug("API response:", data);
  return response.json();
}

/**
 * API client with common HTTP methods
 */
export const api = {
  get: (url: string, options?: Omit<ApiOptions, 'method' | 'body'>) => 
    apiRequest(url, { ...options, method: 'GET' }),
    
  post: (url: string, body: any, options?: Omit<ApiOptions, 'method' | 'body'>) => 
    apiRequest(url, { ...options, method: 'POST', body }),
    
  put: (url: string, body: any, options?: Omit<ApiOptions, 'method' | 'body'>) => 
    apiRequest(url, { ...options, method: 'PUT', body }),
    
  patch: (url: string, body: any, options?: Omit<ApiOptions, 'method' | 'body'>) => 
    apiRequest(url, { ...options, method: 'PATCH', body }),
    
  delete: (url: string, options?: Omit<ApiOptions, 'method'>) => 
    apiRequest(url, { ...options, method: 'DELETE' }),
};