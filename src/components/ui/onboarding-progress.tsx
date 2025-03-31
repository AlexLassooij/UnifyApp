"use client"

import { useOnboarding } from "@/store/onboardingContext"
import { Progress } from "@/components/ui/progress"
import { Check, Circle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function OnboardingProgress() {

    const onboardingContext = useOnboarding()
    if (!onboardingContext) {
        return <div>Error: Onboarding context is not available.</div>
    }
    const { getProgressPercentage, isStepCompleted } = onboardingContext

    return(        
        <Card className="border-none shadow-sm">
            <CardContent className="p-8">
            <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#a78bfa]">Get Started</h2>

                <Progress
                value={getProgressPercentage()}
                className="h-2 bg-[#e9e3ff]"
                />

                    <div className="space-y-4 mt-6">
                    

                    <div className="flex items-center gap-3">
                        <div
                        className={`${isStepCompleted(0) ? "bg-[#a78bfa]" : "border border-[#a78bfa]"} rounded-full p-1 flex items-center justify-center`}
                        >
                        {isStepCompleted(0) ? (
                            <Check className="h-4 w-4 text-white" />
                        ) : (
                            <Circle className="h-4 w-4 text-transparent" />
                        )}
                        </div>
                        <span className="text-[#000000] font-medium">Student Profile</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <div
                        className={`${isStepCompleted(1) ? "bg-[#a78bfa]" : "border border-[#a78bfa]"} rounded-full p-1 flex items-center justify-center`}
                        >
                        {isStepCompleted(1) ? (
                            <Check className="h-4 w-4 text-white" />
                        ) : (
                            <Circle className="h-4 w-4 text-transparent" />
                        )}
                        </div>
                        <span className="text-[#000000] font-medium">Preferences</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <div
                        className={`${isStepCompleted(2) ? "bg-[#a78bfa]" : "border border-[#a78bfa]"} rounded-full p-1 flex items-center justify-center`}
                        >
                        {isStepCompleted(2) ? (
                            <Check className="h-4 w-4 text-white" />
                        ) : (
                            <Circle className="h-4 w-4 text-transparent" />
                        )}
                        </div>
                        <span className="text-[#000000] font-medium">Your Recommendations</span>
                    </div>

                    {/* <div className="flex items-center gap-3">
                        <div
                        className={`${isStepCompleted(3) ? "bg-[#a78bfa]" : "border border-[#a78bfa]"} rounded-full p-1 flex items-center justify-center`}
                        >
                        {isStepCompleted(3) ? (
                            <Check className="h-4 w-4 text-white" />
                        ) : (
                            <Circle className="h-4 w-4 text-transparent" />
                        )}
                        </div>
                        <span className="text-[#000000] font-medium">Invite a classmate</span>
                    </div> */}

                    <div className="flex items-center gap-3">
                        <div
                        className={`${isStepCompleted(3) ? "bg-[#a78bfa]" : "border border-[#a78bfa]"} rounded-full p-1 flex items-center justify-center`}
                        >
                        {isStepCompleted(3) ? (
                            <Check className="h-4 w-4 text-white" />
                        ) : (
                            <Circle className="h-4 w-4 text-transparent" />
                        )}
                        </div>
                        <span className="text-[#000000] font-medium">Input Grades</span>
                    </div>
                </div>
            </div>
            </CardContent>
        </Card>
  )}