import { NextRequest, NextResponse } from 'next/server';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { Program } from '@/types/datamodel/datamodel';
import { programsCollection } from '@/firebase/clientApp'

export async function POST(request: NextRequest) {
  try {
    // Parse the program data from the request body
    const programData: Program = await request.json();  

    console.debug("PROGRAM DATA", programData)
    
    // Basic validation 
    if (!programData.id || !programData.university_id || !programData.program_name) {
      return NextResponse.json(
        { error: 'Missing required fields: id, university_id, program_name' },
        { status: 400 }
      );
    }

    // Format date objects for Firestore
    const formattedData = formatDateFields(programData);
    
    // Reference to the programs collection and specific document
    const programRef = doc(programsCollection, programData.id);
    
    // Add or update the program
    setDoc(programRef, formattedData);
    
    return NextResponse.json(
      { message: 'Program added successfully', programId: programData.id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error adding program:', error);
    return NextResponse.json(
      { error: 'Failed to add program', details: error.message },
      { status: 500 }
    );
  }
}

// export async function GET(request: NextRequest) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const facultyFilter = searchParams.get('faculty');
//     const universityFilter = searchParams.get('university');
//     const provinceFilter = searchParams.get('province');
    
//     let query = adminDb.collection('programs');
    
//     // Apply filters if provided
//     if (facultyFilter) {
//       query = query.where('faculty', '==', facultyFilter);
//     }
    
//     if (universityFilter) {
//       query = query.where('university_id', '==', universityFilter);
//     }
    
//     if (provinceFilter) {
//       query = query.where('university_location', '>=', provinceFilter)
//                   .where('university_location', '<=', provinceFilter + '\uf8ff');
//     }
    
//     const snapshot = await query.get();
    
//     const programs: Program[] = [];
//     snapshot.forEach(doc => {
//       programs.push(formatProgramDates(doc.data() as Program));
//     });
    
//     return NextResponse.json({ programs });
//   } catch (error) {
//     console.error('Error fetching programs:', error);
//     return NextResponse.json(
//       { error: 'Failed to fetch programs', details: error.message },
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