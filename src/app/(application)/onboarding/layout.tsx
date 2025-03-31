import type React from "react"
import { OnboardingProvider } from "@/store/onboardingContext"
import OnboardingProgress from "@/components/ui/onboarding-progress"
export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <OnboardingProvider>
      <div className="min-h-screen bg-[#f8f5ff] rounded-xl p-8">
        <div className="flex items-center justify-center">
          <div className="w-full max-w-7xl grid md:grid-cols-[2fr_1fr] gap-6">
              {children}
              <OnboardingProgress/>
            </div>  
          </div>
            
      </div>
    </OnboardingProvider>
  )
}