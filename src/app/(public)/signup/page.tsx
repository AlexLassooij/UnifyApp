"use client"

import type React from "react"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { signInWithPopup, GoogleAuthProvider, OAuthProvider, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { auth } from '@/firebase/clientApp';
import { useUserStore } from '@/store/userStore';
import { FcGoogle } from 'react-icons/fc';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [noAccountFound, setNoAccountFound] = useState(false);

  const router = useRouter();
  const { setUser } = useUserStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login logic here
    console.log({ email, password, acceptTerms })
  }

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
    <main className="container md:max-h-screen min-w-full px-8 ">
      <div className="grid gap-6 md:grid-cols-2 items-start justify-items-center my-6 md:my-12">
        {/* Left side - Features */}
        <div className="space-y-8 mt-24">
          <h1 className="text-4xl font-bold tracking-tight text-default sm:text-5xl">Jump start your future now!</h1>
          <ul className="space-y-4 text-lg">
            <li className="flex items-start">
              <span className="mr-2 text-xl">•</span>
              <span>University Comparison Tool</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-xl">•</span>
              <span>Grade Tracking</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-xl">•</span>
              <span>Track and manage your applications</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-xl">•</span>
              <span>University Acceptance Predictor</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-xl">•</span>
              <span>Personalized AI essay assistance</span>
            </li>
          </ul>
        </div>

        {/* Right side - Login Form */}
        <div className="flex max-w-md lg:max-w-lg xl:min-w-[600px] justify-center">
          <Card className="w-full border-purple-light border-2 rounded-2xl overflow-hidden bg-white shadow-md">
            <div className="bg-purple/10 py-6 px-4 border-b border-purple/20">
              <CardTitle className="text-2xl font-bold text-center font-spartan text-foreground">
                Sign up and take hold of your education
              </CardTitle>
              <p className="text-center text-muted-foreground mt-2">
                Join thousands of students planning their academic journey
              </p>
            </div>
            
            <CardContent className="p-8">
              <div className="space-y-8">
                {/* Email and Password Inputs */}
                <div className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">Email address</Label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create a password"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
                    />
                  </div>
                  
                  <Button
                    onClick={signInWithEmail}
                    disabled={isProcessing}
                    className="w-full py-6 bg-primary hover:bg-accent text-white font-bold"
                  >
                    {isProcessing ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creating your account...
                      </div>
                    ) : (
                      "Create account"
                    )}
                  </Button>
                </div>
                
                {/* Separator */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                  </div>
                </div>
                
                {/* Social Sign-in Buttons */}
                <Button
                  onClick={signInWithGoogle}
                  disabled={isProcessing}
                  variant="outline"
                  className="w-full py-6 border-gray-300 font-medium hover:bg-gray-50"
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing in...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <FcGoogle className="h-5 w-5 mr-2" />
                      Sign in with Google
                    </div>
                  )}
                </Button>

                {/* Error and Account Creation */}
                {error && (
                  <div className="bg-red-50 text-red-600 p-3 rounded-md text-center text-sm" role="alert">
                    {error}
                  </div>
                )}
                
                {noAccountFound && (
                  <div className="bg-purple/5 p-4 rounded-md text-center mt-4">
                    <span className="text-gray-600">New to Unify?</span>
                    <button
                      onClick={() => router.push('/signup')}
                      className="ml-2 text-accent hover:text-accent/80 font-medium"
                    >
                      Create an account
                    </button>
                  </div>
                )}
                
                {/* Terms and Privacy */}
                <p className="text-xs text-gray-500 text-center mt-4">
                  By signing up, you agree to our{" "}
                  <Link href="/terms" className="text-accent hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-accent hover:underline">
                    Privacy Policy
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}

