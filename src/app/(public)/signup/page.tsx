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
import { signInWithPopup, GoogleAuthProvider, OAuthProvider, createUserWithEmailAndPassword, UserCredential } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { auth } from '@/firebase/clientApp';
import { useUserStore } from '@/store/userStore';
import { FcGoogle } from 'react-icons/fc';
import { Eye, EyeOff } from 'lucide-react';

export default function SignUpPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [emailAlreadyInUse, setEmailAlreadyInUse] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false
  });

  const router = useRouter();
  const { setUser } = useUserStore();

  const validateForm = () => {
    let isValid = true;
  
    // First name validation
    if (!firstName.trim()) {
      setFormErrors({ ...formErrors, firstName: true });
      isValid = false;
    }
  
    // Last name validation
    if (!lastName.trim()) {
      setFormErrors({ ...formErrors, lastName: true });
      isValid = false;
    }
  
    // Email validation
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setFormErrors({ ...formErrors, email: true });
      isValid = false;
    }
  
    // Password validation
    if (password.length < 6) {
      setFormErrors({ ...formErrors, password: true });
      isValid = false;
    }
    return isValid;
  };

  const signUpWithGoogle = async () => {
    setIsProcessing(true);
    setError(null);
    
    try {
      // signInWithPopup returns a UserCredential directly
      const provider = new GoogleAuthProvider();
      const result: UserCredential = await signInWithPopup(auth, provider);
      const user = result.user;
      const userEmail = user.email;
      const userName = user.displayName;
      
      console.debug('User:', user);
      if (userEmail) {
        // Make API call to your login endpoint
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: userEmail,
            name: userName || 'User',
            signup: true,
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
          
        } else if (response.status == 404) {
          setEmailAlreadyInUse(true);
          setError('E-mail already in use.');
        } else {
          console.error('Failed to register user with API');
          setError('Failed to complete sign-in process.');
        }
      }
    } catch (error: any) {
      console.error('Error signing in with Google:', error);      
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
    if (!validateForm()) {
      return; // Stop if validation fails
    }
    setIsProcessing(true);
    setError(null);
    setEmailAlreadyInUse(false);
    try {
      const result: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = result.user;
      const userEmail = user.email;
      const userName = `${firstName} ${lastName}`;
      
      if (email) {
        // Make API call to your login endpoint
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: userEmail,
            name: userName || 'User',
            signup: true,
          }),
        });
  
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
          if (response.status === 201) {
            // New user - redirect to setup
            router.push('/setup');
          } else {
            // Existing user - redirect to dashboard
            router.push('/dashboard');
          }
        } else {
          setEmailAlreadyInUse(true);
          setError('Failed to complete sign-in process.');
        }
      }
      // Redirect or update UI upon successful sign-in
    } catch (error: any) {
      console.error('Error signing in with email:', error);
      // Handle specific Firebase error cases
      if (error.code === 'auth/email-already-in-use') {
        setError('E-mail already in use.');
        setEmailAlreadyInUse(true);
      } else if (error.code === 'auth/user-not-found') {
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
      <div className="grid gap-6 md:grid-cols-2 items-start justify-items-center py-6 md:py-12">
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
            <div className="bg-purple/10 px-4 py-2 lg:py-4 border-b border-purple/20">
              <CardTitle className="text-2xl font-bold text-center font-spartan text-foreground">
                Sign up and take hold of your education
              </CardTitle>
              <p className="text-center text-muted-foreground mt-2">
                Join thousands of students planning their academic journey
              </p>
            </div>
            
            <CardContent className="px-4 py-2 lg:py-4">
              <div className="space-y-8">
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    signInWithEmail();
                  }}>
                    {/* Email and Password Inputs */}
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          {/* specify what form element a label is bound to */}
                          <div className="flex items-center">
                            <Label htmlFor="firstName" className="text-sm font-medium">First Name</Label>
                            <span className="text-red-500 ml-1">*</span>
                          </div>
                          <input
                            id="firstName"
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value.trim())}
                            placeholder="First name"
                            required
                            className={`w-full px-4 py-2.5 border ${formErrors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent`}
                            />
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <Label htmlFor="lastName" className="text-sm font-medium">Last Name</Label>
                            <span className="text-red-500 ml-1">*</span>
                          </div>
                          <input
                            id="lastName"
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value.trim())}
                            placeholder="Last name"
                            required
                            className={`w-full px-4 py-2.5 border ${formErrors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent`}
                            />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                          <span className="text-red-500 ml-1">*</span>
                        </div>
                        <input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email"
                          required
                          className={`w-full px-4 py-2.5 border ${formErrors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent`}
                          />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                          <span className="text-red-500 ml-1">*</span>
                        </div>
                        <div className="relative">
                          <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Create a password"
                            required
                            className={`w-full px-4 py-2.5 border ${formErrors.password ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent`}
                            />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                          >
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                        </div>
                      </div>
                      
                      <Button
                        type="submit"
                        disabled={isProcessing}
                        className="w-full py-5 mt-2 bg-primary hover:bg-accent text-white font-bold"
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
                  </form>
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
                    onClick={signUpWithGoogle}
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
                        Sign up with Google
                      </div>
                    )}
                  </Button>

                  {/* Error and Account Creation */}
                  {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-md text-center text-sm" role="alert">
                      {error}
                    </div>
                  )}
                  
                  {emailAlreadyInUse && (
                    <div className="bg-purple/5 p-2 lg:p-4 rounded-md text-center mt-4">
                      <span className="text-gray-600">Already have an account?</span>
                      <button
                        onClick={() => router.push('/login')}
                        className="ml-2 text-accent hover:text-accent/80 font-medium"
                      >
                        Log in
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

