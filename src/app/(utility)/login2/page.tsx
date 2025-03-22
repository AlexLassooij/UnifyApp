'use client'

import { useState, useEffect } from 'react';
import { signInWithPopup, GoogleAuthProvider, OAuthProvider, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { auth } from '@/firebase/clientApp';
import { useUserStore } from '@/store/userStore';
import { FcGoogle } from 'react-icons/fc';
import { AiFillApple } from 'react-icons/ai';


export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [noAccountFound, setNoAccountFound] = useState(false);

  const router = useRouter();
  const { setUser } = useUserStore();

  // Handle redirect result when component mounts
  // useEffect(() => {
  //   async function handleRedirectResult() {
  //     if (isProcessing) return;
      
  //     setIsProcessing(true);
  //     try {
  //       const result = await getRedirectResult(auth);
        
  //       if (result) {
  //         const user = result.user;
  //         const email = user.email;
  //         const name = user.displayName;
          
  //         if (email) {
  //           // Make API call to your login endpoint
  //           const response = await fetch('/api/login', {
  //             method: 'POST',
  //             headers: {
  //               'Content-Type': 'application/json',
  //             },
  //             body: JSON.stringify({
  //               email,
  //               name: name || 'User', // Provide a default if name is null
  //             }),
  //           });

  //           if (response.ok) {
  //             const userData = await response.json();
  //             console.debug('User data:', userData);
  //             setUser(userData);
              
  //             // Redirect based on whether it's a new or existing user
  //             if (response.status === 201) {
  //               // New user - redirect to setup
  //               router.push('/setup');
  //             } else {
  //               // Existing user - redirect to dashboard
  //               router.push('/dashboard');
  //             }
  //           } else {
  //             console.error('Failed to register user with API');
  //             setError('Failed to complete sign-in process.');
  //           }
  //         }
  //       }
  //     } catch (error) {
  //       console.error('Error handling redirect result:', error);
  //       setError('An error occurred during sign-in. Please try again.');
  //     } finally {
  //       setIsProcessing(false);
  //     }
  //   }

  //   handleRedirectResult();
  // }, [router, isProcessing, setUser]);

  // const signInWithGoogle = async () => {
  //   const provider = new GoogleAuthProvider();
  //   try {
  //     await signInWithRedirect(auth, provider);
  //     // Redirect or update UI upon successful sign-in
  //   } catch (error) {
  //     setError('Failed to sign in with Google. Please try again.');
  //     console.error(error);
  //   }
  // };

  const signInWithGoogle = async () => {
    setIsProcessing(true);
    setError(null);
    setNoAccountFound(false);
    const provider = new GoogleAuthProvider();
    
    try {
      // signInWithPopup returns a UserCredential directly
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const email = user.email;
      const name = user.displayName;
      
      if (email) {
        // Make API call to your login endpoint
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            name: name || 'User',
          }),
        });
  
        if (response.ok) {
          const userData = await response.json();
          console.debug('User data:', userData);
          setUser(userData);
          
          // Redirect based on whether it's a new or existing user
          if (response.status === 201) {
            // New user - redirect to setup
            router.push('/setup');
          } else {
            // Existing user - redirect to dashboard
            router.push('/dashboard');
          }
        } else {
          console.error('Failed to register user with API');
          setError('Failed to complete sign-in process.');
        }
      }
    } catch (error: any) {
      console.error('Error signing in with Google:', error);
      setNoAccountFound(true);
      
      // Handle specific error cases
      if (error.code === 'auth/popup-closed-by-user') {
        setError('Sign-in was cancelled. Please try again.');
      } else if (error.code === 'auth/popup-blocked') {
        setError('Pop-up was blocked by your browser. Please enable pop-ups for this site.');
      } else {
        setError('Failed to sign in with Google. Please try again.');
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const signInWithApple = async () => {
    // const provider = new OAuthProvider('apple.com');
    // try {
    //   await signInWithPopup(auth, provider);
    //   // Redirect or update UI upon successful sign-in
    // } catch (error) {
    //   setError('Failed to sign in with Apple. Please try again.');
    //   console.error(error);
    // }
    return null
  };

  const signInWithEmail = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, isSignIn: true }),
      });
  
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        router.push('/dashboard');
      } else if (response.status === 404) {
        setError('No account found with this email address. Please check your email or sign up.');
        setNoAccountFound(true);
      } else {
        setError('Failed to complete sign-in process.');
      }
      // Redirect or update UI upon successful sign-in
    } catch (error: any) {
      console.error('Error signing in with email:', error);
      setNoAccountFound(true);
      // Handle specific Firebase error cases
      if (error.code === 'auth/user-not-found') {
        setError('No account found with this email address. Please check your email or sign up.');
      } else if (error.code === 'auth/wrong-password') {
        setError('Incorrect password. Please try again.');
      } else {
        setError('Failed to sign in with email. Please try again.');
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div id="login-page-container" className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-md">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
        </div>
        <div className="mt-8 space-y-6">
        <div className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            />
            <button
              onClick={signInWithEmail}
              disabled={isProcessing}
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-bold text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </>
              ) : (
                <>Sign in with Email</>
              )}
            </button>
          </div>
          <div className="space-y-4">
            <button
              onClick={signInWithGoogle}
              disabled={isProcessing}
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-bold text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </>
              ) : (
                <>
                  <FcGoogle className="h-5 w-5 mr-2" />
                  Sign in with Google
                </>
              )}
            </button>
            {/* <button
              onClick={signInWithApple}
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <AiFillApple className="h-5 w-5 mr-2" />
              Sign in with Apple
            </button> */}
          </div>
          
          {error && (
            <div className="text-red-500 text-center mt-2" role="alert">
              {error}
            </div>
          )}
          {noAccountFound && (
            <div className="text-center mt-4">
              <span className="text-gray-600">New to Unify?</span>
              <button
                onClick={() => router.push('/signup')}
                className="ml-2 text-indigo-600 hover:text-indigo-500 font-medium"
              >
                Create an account
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}