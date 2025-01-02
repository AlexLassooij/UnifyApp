'use client'

import { useState } from 'react';
import { signInWithPopup, GoogleAuthProvider, OAuthProvider } from 'firebase/auth';
import { auth } from '@/firebase/clientApp';
import { FcGoogle } from 'react-icons/fc';
import { AiFillApple } from 'react-icons/ai';

export default function SignInPage() {
  const [error, setError] = useState<string | null>(null);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      // Redirect or update UI upon successful sign-in
    } catch (error) {
      setError('Failed to sign in with Google. Please try again.');
      console.error(error);
    }
  };

  const signInWithApple = async () => {
    const provider = new OAuthProvider('apple.com');
    try {
      await signInWithPopup(auth, provider);
      // Redirect or update UI upon successful sign-in
    } catch (error) {
      setError('Failed to sign in with Apple. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-md">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
        </div>
        <div className="mt-8 space-y-6">
          <div className="space-y-4">
            <button
              onClick={signInWithGoogle}
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <FcGoogle className="h-5 w-5 mr-2" />
              Sign in with Google
            </button>
            <button
              onClick={signInWithApple}
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <AiFillApple className="h-5 w-5 mr-2" />
              Sign in with Apple
            </button>
          </div>
          {error && (
            <div className="text-red-500 text-center mt-2" role="alert">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

