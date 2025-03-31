"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { PreferenceData } from "@/types/datamodel/datamodel"
import { scrollToTop } from "@/lib/utils"

// Define the types for our form data
type ProfileData = {
    name?: string
    gender?: string
    currentGrade?: string
    province?: string
    high_school?: string
    graduationYear?: string
}

// Define the context type
type OnboardingContextType = {
  profileData: ProfileData
  preferenceData: PreferenceData
  currentStep: number
  totalSteps: number
  currentPreferenceStep: number
  totalPreferenceSteps: number
  updateProfileData: (data: Partial<ProfileData>) => void
  updatePreferenceData: (data: Partial<PreferenceData>) => void
  nextStep: () => void
  prevStep: () => void
  skipToStep: (step: number) => void
  skipToEnd: () => void
  nextPreferenceStep: () => void
  prevPreferenceStep: () => void
  skipToPreferenceStep: (step: number) => void
  getProgressPercentage: () => number
  getPreferenceProgressPercentage: () => number
  isStepCompleted: (step: number) => boolean
  isPreferenceStepCompleted: (step: number) => boolean
}

// Create the context with a default value
const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined)

// Define the provider props
type OnboardingProviderProps = {
  children: ReactNode
}

// Create the provider component
export function OnboardingProvider({ children }: OnboardingProviderProps) {
  const router = useRouter()
  const [profileData, setProfileData] = useState<ProfileData>({})
  const [preferenceData, setPreferenceData] = useState<PreferenceData>({})
  const [currentStep, setCurrentStep] = useState(0)
  const [currentPreferenceStep, setCurrentPreferenceStep] = useState(0)
  const totalSteps = 4 // Total number of main steps (0-indexed)
  const totalPreferenceSteps = 5 // Total number of preference steps (0-indexed)

  // Routes for each step (0-indexed array)
  const stepRoutes = [
    "/onboarding/profile",
    "/onboarding/preferences",
    "/onboarding/recommendations",
    "/grades"
  ]

  // Update form data
  const updateProfileData = (data: Partial<ProfileData>) => {
    setProfileData((prev) => ({ ...prev, ...data }))
  }

  // Update preferences data
  const updatePreferenceData = (data: Partial<PreferenceData>) => {
    setPreferenceData((prev) => ({...prev, ...data}))
  }

  // Main step navigation functions
  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      const nextStepNumber = currentStep + 1
      setCurrentStep(nextStepNumber)

      // If moving to preferences, reset preference step
      if (nextStepNumber === 1) { // Preferences is now at index 1
        setCurrentPreferenceStep(0) // Start at first preference step (index 0)
      }

      router.push(stepRoutes[nextStepNumber])
    } else {
      // If we're at the last step, go to dashboard
      router.push("/grades")
    }
    scrollToTop()
  }

  const prevStep = () => {
    if (currentStep > 0) {
      const prevStepNumber = currentStep - 1
      setCurrentStep(prevStepNumber)
      router.push(stepRoutes[prevStepNumber])
    }
    scrollToTop()
  }

  const skipToStep = (step: number) => {
    if (step >= 0 && step < totalSteps) {
      setCurrentStep(step)
      router.push(stepRoutes[step])
    }
    scrollToTop()
  }

  const skipToEnd = () => {
    router.push("/dashboard")
  }

  // Preference step navigation functions
  const nextPreferenceStep = () => {
    if (currentPreferenceStep < totalPreferenceSteps - 1) {
      const nextStepNumber = currentPreferenceStep + 1
      setCurrentPreferenceStep(nextStepNumber)
      scrollToTop()
    } else {
      // If we're at the last preference step, go to the next main step
      nextStep()
    }
  }

  const prevPreferenceStep = () => {
    if (currentPreferenceStep > 0) {
      const prevStepNumber = currentPreferenceStep - 1
      setCurrentPreferenceStep(prevStepNumber)
    } else {
      // If we're at the first preference step, go to the previous main step
      prevStep()
    }
  }

  const skipToPreferenceStep = (step: number) => {
    if (step >= 0 && step < totalPreferenceSteps) {
      setCurrentPreferenceStep(step)
    }
  }

  // Calculate progress percentage
  const getProgressPercentage = () => {
    // If we're in the preferences step, calculate partial progress
    if (currentStep === 1) {
      const baseProgress = (currentStep / totalSteps) * 100
      const stepProgress = (1 / totalSteps) * 
        (currentPreferenceStep / totalPreferenceSteps) * 100
      return baseProgress + stepProgress
    }
    return ((currentStep + 1) / totalSteps) * 100
  }

  // Calculate preference progress percentage
  const getPreferenceProgressPercentage = () => {
    return ((currentPreferenceStep + 1) / totalPreferenceSteps) * 100
  }

  // Check if a step is completed
  const isStepCompleted = (step: number) => {
    return currentStep > step;
  }

  // Check if a preference step is completed
  const isPreferenceStepCompleted = (step: number) => {
    if (currentStep > 1) { 
      return true;
    }
    if (currentStep === 1 && currentPreferenceStep > step) {
      return true;
    }
    return false;
  }

  // Create the context value
  const contextValue: OnboardingContextType = {
    profileData,
    preferenceData,
    currentStep,
    totalSteps,
    currentPreferenceStep,
    totalPreferenceSteps,
    updateProfileData,
    updatePreferenceData,
    nextStep,
    prevStep,
    skipToStep,
    skipToEnd,
    nextPreferenceStep,
    prevPreferenceStep,
    skipToPreferenceStep,
    getProgressPercentage,
    getPreferenceProgressPercentage,
    isStepCompleted,
    isPreferenceStepCompleted,
  }

  return <OnboardingContext.Provider value={contextValue}>{children}</OnboardingContext.Provider>
}

// Custom hook to use the onboarding context
export function useOnboarding() {
  const context = useContext(OnboardingContext)
  if (context === undefined) {
    throw new Error("useOnboarding must be used within an OnboardingProvider")
  }
  return context
}