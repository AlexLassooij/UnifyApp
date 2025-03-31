import { NextRequest, NextResponse } from "next/server";
import { calculateUniversityScores } from "@/lib/recommendationEngine";
import { PreferenceData, RecommendationScore } from "@/types/datamodel/datamodel";
import { universitiesCollection, usersCollection } from "@/firebase/clientApp";
import { getDocs, doc, updateDoc, getDoc } from "firebase/firestore";

export async function POST(request: NextRequest, { params }: { params: Promise<{ userId: string }> }) {

  const { userId } = await params;
  try {
    // Parse preference data from request body
    const preferenceData: PreferenceData = await request.json();
    
    // Validate preference data
    if (!preferenceData) {
      return NextResponse.json(
        { error: "Preference data is required" },
        { status: 400 }
      );
    }
    console.debug(preferenceData)
    // Fetch all university documents from the database
    console.debug("Fetching universities from Firestore...");
    const scoresQuery = universitiesCollection;
    console.debug("After versities from Firestore...");

    const universitySnapshot = await getDocs(scoresQuery);
    if (universitySnapshot.empty) {
      return NextResponse.json(
        { error: "No universities found in the database" },
        { status: 404 }
      );
    }

    console.debug(universitySnapshot.docs.length);

    // Transform university documents into the required format
    const universitiesData = universitySnapshot.docs.map(doc => {
      const data = doc.data();
      
      return {
        university_name: data.university_name || "Unknown University",
        id: doc.id,
        recommendation_scores: data.recommendation_scores || {} as RecommendationScore
      };
    });

    console.debug(universitiesData)


    // Calculate recommendations based on preference data and university data
    const recommendations = calculateUniversityScores(preferenceData, universitiesData);
    
    const result = {
        university_recommendations: recommendations.recommendations,
        topMatch: recommendations.topMatch,
        totalUniversities: universitiesData.length
      }
      
    const userRef = doc(usersCollection, userId);
      
    await updateDoc(userRef, {
      recommended_universities: result.university_recommendations})
      
    // Return recommendations
    return NextResponse.json({
      recommendations: recommendations.recommendations,
      topMatch: recommendations.topMatch,
      totalUniversities: universitiesData.length
    }, { status: 200 });
    
  } catch (error: any) {
    console.error("Error calculating recommendations:", error);
    return NextResponse.json(
      { error: `Failed to calculate recommendations: ${error.message}` },
      { status: 500 }
    );
  }
}

// Optional: GET route to get recommendations for a specific user
export async function GET(request: NextRequest, { params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params;
  
  try {
    const userRef = doc(usersCollection, userId);
    const user = (await getDoc(userRef)).data();
    
    return NextResponse.json({
      recommended_universities: user?.recommended_universities
    }, { status: 200 });
    
  } catch (error: any) {
    console.error("Error processing GET request:", error);
    return NextResponse.json(
      { error: `Failed to process request: ${error.message}` },
      { status: 500 }
    );
  }
}