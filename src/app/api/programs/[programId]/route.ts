import { NextRequest, NextResponse } from "next/server";
import { doc, getDoc, Timestamp } from "firebase/firestore";
import { programsCollection } from "@/firebase/clientApp";

export async function GET(request: NextRequest, { params }: { params: Promise<{ programId: string }> }) {
  try {
    // Get programId from URL parameters
    const { programId } = await params;
    
    if (!programId) {
      return NextResponse.json({ error: "Program ID is required" }, { status: 400 });
    }
    
    console.log(`Fetching program with ID: ${programId}`);
    
    // Create reference to the specific program document
    const programRef = doc(programsCollection, programId);
    
    // Get program document
    const programSnapshot = await getDoc(programRef);
    
    // Check if program exists
    if (!programSnapshot.exists()) {
      return NextResponse.json({ error: "Program not found" }, { status: 404 });
    }
    
    // Get program data
    const programData = programSnapshot.data();
    
    // Add the ID to the returned object
    const program = {
      id: programSnapshot.id,
      ...programData,
    };
    
    // Format dates for better frontend consumption
    const formattedProgram = formatDates(program);
    
    // Return the program data
    return NextResponse.json(formattedProgram);
  } catch (error: any) {
    console.error("Error fetching program:", error);
    
    // Return appropriate error response
    return NextResponse.json(
      { error: `Failed to fetch program: ${error.message}` },
      { status: 500 }
    );
  }
}

/**
 * Helper function to format date fields in the program
 * This ensures dates are properly serialized for JSON
 */
function formatDates(program: any) {
  const formatted = { ...program };
  
  // Format application deadlines
  if (formatted.application_deadline && Array.isArray(formatted.application_deadline)) {
    formatted.application_deadline = formatted.application_deadline.map((deadline: any) => {
      if (deadline.date) {
        return {
          ...deadline,
          date: deadline.date.toDate().toISOString(),
        };
      }
      return deadline;
    });
  }
  
  // Handle any other date fields
//   if (formatted.created_at && typeof formatted.created_at.toDate === 'function') {
//     formatted.created_at = formatted.created_at.toDate().toISOString();
//   }
  
//   if (formatted.last_updated && typeof formatted.last_updated.toDate === 'function') {
//     formatted.last_updated = formatted.last_updated.toDate().toISOString();
//   }
  
  return formatted;
}