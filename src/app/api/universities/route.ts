import { universitiesCollection } from "@/firebase/clientApp";
import { getDocs } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest, res: NextResponse) {


//         const oldId = "zS0DXGheU8ULCJKVTNTr";
//         const newId = "university_of_toronto";
//         try {
//             // Read data from the existing document
//             const oldDocRef = doc(universitiesCollection, oldId);
//             const oldDocSnap = await getDoc(oldDocRef);

//             if (oldDocSnap.exists()) {
//                 const data = oldDocSnap.data();

//                 // Create a new document with the new ID
//                 const newDocRef = doc(universitiesCollection, newId);
//                 await setDoc(newDocRef, data);

//                 // Optional: Delete the old document
//                 // await deleteDoc(oldDocRef);

//                 return res.status(200).json({ message: "Document ID updated successfully!" });
//             } else {
//                 return res.status(404).json({ error: "Old document not found" });
//             }
//         } catch (error) {
//             console.error("Error updating document ID:", error);
//             return res.status(500).json({ error: error.message });
//         }
// }


export async function GET(req: NextRequest, res: NextResponse) {
    try {
        // Get all documents from the universities collection
        const querySnapshot = await getDocs(universitiesCollection);
        
        // Create an array to hold all university data
        const universities = [];
        
        // Loop through each document and add it to the array
        querySnapshot.forEach((doc) => {
          universities.push({
            id: doc.id,
            ...doc.data()
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
