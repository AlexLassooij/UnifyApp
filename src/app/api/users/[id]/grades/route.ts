import { NextRequest, NextResponse } from "next/server";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { usersCollection } from "@/firebase/clientApp";
import { UserGrade } from "@/types/datamodel/datamodel";


export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const userId = params.id;
    
    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }
    
    // Get user document from Firestore using the usersCollection
    const userDocRef = doc(usersCollection, userId);
    const userDoc = await getDoc(userDocRef);
    
    if (!userDoc.exists()) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }
    
    const userData = userDoc.data();
    // Get the grades array from the user document
    const userGrades = userData.grades || [];
    
    // Format the grades for the frontend
    const formattedGrades = userGrades.map((grade: UserGrade, index: number) => {
      // Format the year (assuming it's stored as a date in Firestore)
      

      return {
        id: index.toString(), // Use grade ID or index as fallback
        year: grade.year,
        course: grade.course_code,
        grade: grade.grade,
        completed: grade.completed,
      };
    });
    
    return NextResponse.json({ grades: formattedGrades });
  } catch (error) {
    console.error("Error fetching user grades:", error);
    return NextResponse.json(
      { error: "Failed to fetch user grades" },
      { status: 500 }
    );
  }
}

// Add POST handler to the existing route.ts file
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const userId = params.id;
    
    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }
    
    // Parse the request body
    const newGradeData = await request.json();
    
    // Validate the grade data
    if (!newGradeData.course_code || !newGradeData.subject || newGradeData.grade === undefined) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    
    // Get user document from Firestore
    const userDocRef = doc(usersCollection, userId);
    const userDoc = await getDoc(userDocRef);
    
    if (!userDoc.exists()) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }
    
    const userData = userDoc.data();
    const existingGrades = userData.grades || [];
    const updatedGrades = [...existingGrades, newGradeData];
    
    // Update the user document
    await updateDoc(userDocRef, {
      grades: updatedGrades
    });
    
    return NextResponse.json({ 
      success: true,
      message: "Grade added successfully" 
    });
    
  } catch (error) {
    console.error("Error adding grade:", error);
    return NextResponse.json(
      { error: "Failed to add grade" },
      { status: 500 }
    );
  }
}