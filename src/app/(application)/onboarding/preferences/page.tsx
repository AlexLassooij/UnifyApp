"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { useOnboarding } from "@/store/onboardingContext"
import { useUserStore } from "@/store/userStore"
import { useEffect } from "react"
import { defaultPreferences, preferenceSteps } from "@/lib/recommendation_mappings"
// Define the step configuration for our multi-step form


// Get array of step keys for easy navigation
const stepKeys = Object.keys(preferenceSteps);

export default function PreferencesPage() {
  const { user } = useUserStore();

  useEffect(() => {
    // Only set default values for fields that don't already have a value
    Object.entries(defaultPreferences).forEach(([key, value]) => {
      if (preferenceData[key] === undefined) {
        updatePreferenceData({ [key]: value });
      }
    });
  }, []);

  // Handler for form submission

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    
    if (currentPreferenceStep < stepKeys.length - 1) {
      nextPreferenceStep();
    } else {
      // Final step, complete the onboarding
      submitPreferences();
    }
  };

  
  const onboardingContext = useOnboarding();
  if (!onboardingContext) {
    return <div>Error: Onboarding context is not available.</div>;
  }
  
  const { 
    preferenceData, 
    updatePreferenceData, 
    currentPreferenceStep,
    skipToPreferenceStep,
    nextPreferenceStep,
    prevPreferenceStep,
    nextStep,
    prevStep,
    getPreferenceProgressPercentage
  } = onboardingContext;

  // Get current step data
  const currentStepKey = stepKeys[currentPreferenceStep];
  // @ts-expect-error - Ignoring index signature error for preferenceData
  const currentStepData = preferenceSteps[currentStepKey];

  

  const submitPreferences = async () => {
    console.debug("Submitting preferences:", JSON.stringify(preferenceData));
    try {
      if (user?.id) {
        const response = await fetch(`/api/users/${user?.id}/recommendations`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...preferenceData
          })
        });
  
        if (response.ok) {
          nextStep(); // Move to next onboarding step
        } else {
          console.error("Failed to save preferences");
        }
      }
    } catch (error) {
      console.error('Error submitting preferences:', error);
    } 
  };

  // Render form fields based on field type
  // @ts-expect-error - Ignoring index signature error for preferenceData
  const renderField = (field) => {
    switch (field.type) {
      case "radio":
        return (
          <RadioGroup
            key={field.id}
            value={preferenceData[field.id]?.toString() || "1"}
            onValueChange={(value) => updatePreferenceData({ [field.id]: parseInt(value) })}
            className="space-y-3"
          >
            {/* @ts-expect-error - Ignoring index signature error for preferenceData */}
            {field.options.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem 
                  value={option.value}
                  id={`${field.id}-${option.value}`}
                />
                <Label htmlFor={`${field.id}-${option.value}`} className="font-normal">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );
        
      case "slider":
        return (
          <div key={field.id} className="space-y-4">
            <div className="flex justify-between">
              <span>Least Important</span>
              <span>Most Important</span>
            </div>
            <Slider
              value={[preferenceData[field.id] || 3]}
              min={field.min}
              max={field.max}
              step={field.step}
              onValueChange={(value) => updatePreferenceData({ [field.id]: value[0] })}
              className="py-4"
            />
            <div className="flex justify-between">
              {[...Array(field.max)].map((_, i) => (
                <div 
                  key={i} 
                  className={`flex items-center justify-center rounded-full w-8 h-8 text-sm font-medium border
                  ${preferenceData[field.id] === i + 1 
                    ? 'bg-purple-light text-white border-purple' 
                    : 'bg-white text-gray-600 border-gray-300'}`}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        );
        
      default:
        return <p>Unknown field type</p>;
    }
  };

  // Render step indicators
  const renderStepIndicators = () => {
    return (
      <div className="flex space-x-2 my-6">
        {stepKeys.map((step, index) => (
          <div 
            key={index}
            onClick={() => skipToPreferenceStep(index)}
            className={`
              h-2 rounded-full cursor-pointer transition-all
              ${index <= currentPreferenceStep ? 'bg-[#a78bfa]' : 'bg-gray-200'}
              ${index === currentPreferenceStep ? 'w-8' : 'w-4'}
            `}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <Progress value={getPreferenceProgressPercentage()} className="h-1 mb-6" />
        {renderStepIndicators()}
        
        <Card className="border-none shadow-sm">
          <CardContent className="p-8 md:p-12">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col items-start gap-6">
                <div>
                  <p className="text-[#a78bfa] text-xl mb-2">Step {currentPreferenceStep + 1} of {stepKeys.length}</p>
                  <h1 className="text-2xl md:text-3xl font-bold text-[#000000]">{currentStepData.title}</h1>
                  <p className="text-gray-600 mt-2">{currentStepData.description}</p>
                </div>

                <div className="w-full space-y-8">
                  {/* @ts-expect-error - Ignoring index signature error for preferenceData */}
                  {currentStepData.fields.map((field) => (
                    <div key={field.id} className="space-y-4">
                      <Label className="text-base font-medium">{field.label}</Label>
                      {renderField(field)}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mt-4">
                  <Button
                    type="button"
                    onClick={currentPreferenceStep === 0 ? prevStep : prevPreferenceStep}
                    variant="outline"
                    className="h-12 border-[#a78bfa] text-[#a78bfa] hover:bg-[#f8f5ff]"
                  >
                    Back
                  </Button>
                  <Button 
                    type="submit"
                    className="h-12 bg-[#a78bfa] hover:bg-[#9175e5] text-white"
                  >
                    {currentPreferenceStep < stepKeys.length - 1 ? 'Continue' : 'Finish'}
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}