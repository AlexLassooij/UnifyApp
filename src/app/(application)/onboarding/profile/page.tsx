"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useOnboarding } from "@/store/onboardingContext"
import { useUserStore } from "@/store/userStore"
import { useEffect } from "react"
import { defaultProfile } from "@/lib/recommendation_mappings"
import { formGroups } from "@/lib/recommendation_mappings"

function StudentProfilePage() {
    const { user, setUser } = useUserStore()

    useEffect(() => {
        // Only set default values for fields that don't already have a value
        Object.entries(defaultProfile).forEach(([key, value]) => {
        // @ts-expect-error - Ignoring index signature error for preferenceData
          if (profileData[key] === undefined) {
            updateProfileData({ [key]: value });
          }
        });
      }, []);
    
    const onboardingContext = useOnboarding()
    if (!onboardingContext) {
        return <div>Error: Onboarding context is not available.</div>
    }
    const { profileData, updateProfileData, nextStep, prevStep } = onboardingContext

    // Define metadata for each radio group
    


    const submitProfileData = async () => {
        try {
          
          if (profileData.province) {
            // Make API call to your login endpoint
            const response = await fetch(`/api/users/${user?.id}`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                ...profileData
              }),
            });
      
            if (response.ok) {
              const userData = await response.json();
              setUser(userData);              
              nextStep();
            } else {
            //   setError('Failed to complete sign-in process.');
            }
          }
          // Redirect or update UI upon successful sign-in
        } catch (error: any) {
          console.error('Error submitting profile data:', error);
        } 
      };
  
  
    // Helper function to render radio groups
    const renderRadioGroup = (groupKey: string) => {
        // @ts-expect-error - Ignoring index signature error for preferenceData
      const group = formGroups[groupKey];
      
      return (
        <div className="space-y-4">
          <Label className="text-base font-medium">{group.label}</Label>
          <RadioGroup
            // @ts-expect-error - Ignoring index signature error for preferenceData
            value={profileData[group.field] || ""}
            onValueChange={(value) => updateProfileData({ [group.field]: value })}
            className="space-y-3"
          >
            {group.options.map((option: {value: string; label: string;}) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem 
                  value={option.value}
                  id={`${group.field}-${option.value}`}
                />
                <Label htmlFor={`${group.field}-${option.value}`} className="font-normal">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      );
    };

    return (
    <>
        {/* Main Content */}
        <Card className="border-none shadow-sm">
            <CardContent className="p-8 md:p-12">
                <form onSubmit={(e) => {
                        e.preventDefault();
                        submitProfileData();
                    }}>
                    <div className="flex flex-col items-start gap-6">
                        <div>
                        <p className="text-[#a78bfa] text-xl mb-2">Let&apos;s get to know you a bit more...</p>
                        <h1 className="text-2xl md:text-3xl font-bold text-[#000000]">What should we call you?</h1>
                        </div>

                        <div className="w-full space-y-8">
                        <div className="space-y-2">
                            <Label htmlFor="firstName">Your Name</Label>
                            <Input
                            id="firstName"
                            placeholder="Jane Doe"
                            value={profileData.name || user?.name || ""}
                            onChange={(e) => updateProfileData({ name: e.target.value })}
                            />
                        </div>

                        {/* Render radio groups dynamically */}
                        {renderRadioGroup('gender')}
                        {renderRadioGroup('currentGrade')}

                        <div className="space-y-2">
                            <Label htmlFor="school">Current School</Label>
                            <Input
                            id="school"
                            placeholder="Enter your school name (Optional)"
                            value={profileData.high_school || ""}
                            onChange={(e) => updateProfileData({ high_school: e.target.value })}
                            />
                        </div>

                        {renderRadioGroup('province')}
                        {renderRadioGroup('graduationYear')}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mt-4">
                        <Button
                            onClick={prevStep}
                            variant="outline"
                            className="h-12 border-[#a78bfa] text-[#a78bfa] hover:bg-[#f8f5ff]"
                        >
                            Back
                        </Button>
                        <Button type="submit" className="h-12 bg-[#a78bfa] hover:bg-[#9175e5] text-white">
                            Continue
                        </Button>
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
    </>
    )
}

export default StudentProfilePage

