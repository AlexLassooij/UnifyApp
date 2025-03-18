import { universitiesCollection } from "@/firebase/clientApp";
import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {


        const oldId = "zS0DXGheU8ULCJKVTNTr";
        const newId = "university_of_toronto";
        try {
            // Read data from the existing document
            const oldDocRef = doc(universitiesCollection, oldId);
            const oldDocSnap = await getDoc(oldDocRef);

            if (oldDocSnap.exists()) {
                const data = oldDocSnap.data();

                // Create a new document with the new ID
                const newDocRef = doc(universitiesCollection, newId);
                await setDoc(newDocRef, data);

                // Optional: Delete the old document
                // await deleteDoc(oldDocRef);

                return res.status(200).json({ message: "Document ID updated successfully!" });
            } else {
                return res.status(404).json({ error: "Old document not found" });
            }
        } catch (error) {
            console.error("Error updating document ID:", error);
            return res.status(500).json({ error: error.message });
        }
}