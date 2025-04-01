import { NextRequest, NextResponse } from 'next/server';
import { doc, setDoc, Timestamp, getDocs, collection, query, where } from 'firebase/firestore';
import { Program } from '@/types/datamodel/datamodel';
import { programsCollection } from '@/firebase/clientApp'

export async function POST(request: NextRequest) {
  try {
    // Parse the program data from the request body
    const programData: Program = await request.json();  

    
    // Basic validation 
    if (!programData.id || !programData.university_id || !programData.program_name) {
      return NextResponse.json(
        { error: 'Missing required fields: id, university_id, program_name' },
        { status: 400 }
      );
    }

    // Format date objects for Firestore
    const formattedData = formatDateFields(programData);
    const { id, ...dataToSave } = formattedData;

    // Reference to the programs collection and specific document
    const programRef = doc(programsCollection, programData.id);
    
    // Add or update the program
    setDoc(programRef, dataToSave);
    
    return NextResponse.json(
      { message: 'Program added successfully', programId: programData.id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error adding program:', error);
    return NextResponse.json(
      { error: 'Failed to add program', details: (error as Error).message },
      { status: 500 }
    );
  }
}

// export async function GET(request: NextRequest) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const namesOnly = searchParams.get('namesOnly') === 'true';
//     const universityId = searchParams.get('universityId');
    
//     // Create a reference to the programs collection
//     const q = universityId 
//       ? query(programsCollection, where("university_id", "==", universityId))
//       : programsCollection;
    
//     // Get all documents from the programs collection
//     const querySnapshot = await getDocs(q);
    
//     if (namesOnly) {
//       // If namesOnly parameter is true, return only program names and IDs
//       const programNames = [];
//       querySnapshot.forEach((doc) => {
//         const data = doc.data();
//         programNames.push({
//           id: doc.id,
//           program_name: data.program_name,
//           university_id: data.university_id,
//           faculty: data.faculty || null
//         });
//       });
      
//       return NextResponse.json({ 
//         programs: programNames,
//         count: programNames.length
//       });
//     } else {
//       // Return full program details
//       const programs = [];
//       querySnapshot.forEach((doc) => {
//         const programData = doc.data() as Program;
//         programs.push(formatProgramDates(programData));
//       });
      
//       return NextResponse.json({ 
//         programs,
//         count: programs.length
//       });
//     }
//   } catch (error) {
//     console.error('Error fetching programs:', error);
//     return NextResponse.json(
//       { error: 'Failed to fetch programs', details: (error as Error).message },
//       { status: 500 }
//     );
//   }
// }

// Helper function to format date fields for Firestore
function formatDateFields(program: any): any {
  const formatted = { ...program };
  
  // Format application_deadline dates
  if (program.application_deadline) {
    formatted.application_deadline = program.application_deadline.map((deadline: any) => ({
      ...deadline,
      date: Timestamp.fromDate(new Date(deadline.date))
    }));
  }
  
  return formatted;
}

// Helper function to format dates when retrieving from Firestore
function formatProgramDates(program: Program): Program {
  const formatted = { ...program };
  
  // Format application_deadline dates
  if (formatted.application_deadline && Array.isArray(formatted.application_deadline)) {
    formatted.application_deadline = formatted.application_deadline.map(deadline => ({
      ...deadline,
      date: deadline.date instanceof Date 
        ? deadline.date 
        : new Date(deadline.date)
    }));
  }
  
  return formatted;
}