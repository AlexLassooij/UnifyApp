import { NextResponse } from "next/server";
import { query, where, getDocs } from "firebase/firestore";
import { curriculaCollection } from "@/firebase/clientApp";


export async function GET(request: Request, { params }: { params: Promise<{ curriculum: string }>}) {
  // Get the curriculum from the URL query parameter

  const { curriculum } = await params

  if (!curriculum) {
    return NextResponse.json(
      { error: "Missing curriculum parameter" },
      { status: 400 }
    );
  }

  try {
    // Query for the curriculum document
    const q = query(curriculaCollection, where("curriculum", "==", curriculum));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return NextResponse.json(
        { subjects: [], message: "No curriculum found" },
        { status: 200 }
      );
    }

    // Get the subjects from the first matching document
    const curriculumDoc = querySnapshot.docs[0];
    const subjects = curriculumDoc.data().subjects || [];

    // Return the subjects
    return NextResponse.json({ subjects }, { status: 200 });
  } catch (error) {
    console.error("Error fetching curriculum subjects:", error);
    return NextResponse.json(
      { error: "Failed to fetch subjects" },
      { status: 500 }
    );
  }
}