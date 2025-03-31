"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check, Bookmark } from "lucide-react"
import { useOnboarding } from "@/store/onboardingContext"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useState, useEffect } from "react"
import { useUserStore } from "@/store/userStore"

// Define types for the recommendation data
type MatchDetails = {
  fieldOfStudy: number
  housing: number
  research: number
  school_size: number
  location: number
  diversity: number
  urban_rural: number
  financial_aid: number
  tuition: number
  athletics: number
  greek_life: number
  clubs: number
  coop: number
}

type UniversityRecommendation = {
  university_id: string
  university_name: string
  score: number
  rank: number
  matchDetails: MatchDetails
}


export default function ResultsPage() {
  const router = useRouter()
  const { nextStep, skipToStep, getProgressPercentage, isStepCompleted } = useOnboarding()

  const [results, setResults] = useState<UniversityRecommendation[] | null>(null)
  const [bookmarked, setBookmarked] = useState<Record<string, boolean>>({})

  const { user } = useUserStore()
  
  // Simulate fetching results
  useEffect(() => {
    const getRecommendations = async () => {    
    
        try {
          const response = await fetch(`/api/users/${user?.id}/recommendations`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
          }
          const data = await response.json()
          console.debug(data)

          data.recommended_universities.sort((a:UniversityRecommendation, b: UniversityRecommendation) => a.rank - b.rank)
          setResults(data.recommended_universities)
          
        } catch (error) {
          console.error("Failed to add grade:", error);
        }
      };

      getRecommendations()
  }, [user?.id])

  const handleBookmark = (id: string) => {
    setBookmarked((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const handleStartTracking = () => {
    nextStep() // Go to grades input step
  }

  const handleMaybeLater = () => {
    router.push("/dashboard")
  }

  // University logo mapping
 

  return (
        <Card className="border-none shadow-sm">
          <CardContent className="p-8 md:p-12">
            <div className="flex flex-col items-start gap-6">
              <div className="flex items-center gap-4">
                <div className="bg-[#a78bfa] rounded-full p-3 flex items-center justify-center">
                  <Check className="h-4 w-4 text-white" />
                </div>
                <span className="text-[#a78bfa] text-xl font-medium">Student Profile Set Up</span>
              </div>

              <h1 className="text-xl md:text-2xl font-bold text-[#000000]">
                Here are your university and program suggestions:
              </h1>

              <div className="w-full space-y-4">
                {results?.map((uni) => (
                 <Card
                 key={uni.university_id}
                 className="border border-gray-200 hover:border-[#a78bfa] transition-colors"
               >
                    <div className="flex items-center p-4">
                    <div className="flex items-center gap-4 flex-1">
                        {/* Updated logo section with rank next to logo */}
                        <div className="flex items-center gap-3">
                        {/* Rank indicator */}
                        <div className="bg-[#a78bfa] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                            {uni.rank}
                        </div>
                        
                        {/* Logo container */}
                        <div className="w-20 h-20 flex items-center justify-center">
                            <Image
                            src={`/universities/${uni.university_id}.png`}
                            alt={`${uni.university_name} logo`}
                            width={64}
                            height={64}
                            className="mr-3 h-[64px] w-auto object-contain"
                            style={{ height: "64px", width: "auto" }}
                            />
                        </div>
                        </div>
                
                        <div>
                        <h3 className="text-lg font-semibold">{uni.university_name}</h3>
                        </div>
                    </div>
                    <button
                        onClick={() => handleBookmark(uni.university_id)}
                        className="p-2 text-[#ffc107] hover:text-[#ffca2c]"
                    >
                        <Bookmark className={`h-6 w-6 ${bookmarked[uni.university_id] ? "fill-[#ffc107]" : ""}`} />
                    </button>
                    </div>
                </Card>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mt-4">
                <Button onClick={handleStartTracking} className="h-12 bg-[#a78bfa] hover:bg-[#9175e5] text-white">
                  Start tracking grades
                </Button>
                <Button
                  onClick={handleMaybeLater}
                  variant="outline"
                  className="h-12 border-[#a78bfa] text-[#a78bfa] hover:bg-[#f8f5ff]"
                >
                  Maybe later
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        
  )
}

