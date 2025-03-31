import { universitiesCollection } from "@/firebase/clientApp";
import { University } from "@/types/datamodel/datamodel";
import { getDocs, setDoc, updateDoc, doc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { id, university_name, recommendation_scores } = await req.json();

      try {
          // Read data from the existing document
          const uniRef = doc(universitiesCollection, id);
          setDoc(uniRef, {"university_name": university_name, recommendation_scores}, { merge: true });
          return NextResponse.json({ id, recommendation_scores }, { status: 200 });
      } catch (error) {
          console.error("Error updating document ID:", error);
          return 
      }
}


export async function GET(req: NextRequest) {
    try {
        // Get all documents from the universities collection
        const querySnapshot = await getDocs(universitiesCollection);
        
        // Create an array to hold all university data
        const universities: University[] = [];
        
        // Loop through each document and add it to the array
        querySnapshot.forEach((doc) => {
          // TODO may need to make some fields optional
          const universityData = doc.data() as University;
          universities.push({
            id: doc.id,
            ...universityData
          });
        });
        
        // Return the universities as JSON
        return NextResponse.json({ universities });
      } catch (error) {
        console.error("Error fetching universities:", error);
        return NextResponse.json(
          { error: "Failed to fetch universities" },
          { status: 500 }
        );
      }
}
