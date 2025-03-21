import { NextResponse } from "next/server";
import { getDocs, query, where, setDoc, addDoc } from 'firebase/firestore';
import { User } from '@/types/datamodel/datamodel';
import { usersCollection } from "@/firebase/clientApp";



export async function POST(request: Request) {
  const { email, name, method } = await request.json();

  if (!email) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  try {
    const q = query(usersCollection, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (method === 'emp' && querySnapshot.empty) {
      return NextResponse.json(
        { error: 'No user found with this email address' },
        { status: 404 } // 404 Not Found is appropriate for this case
      );
    }
    
    if (querySnapshot.empty) {
      const newUser: User = {
        name,
        email,
        high_school: '',
        curriculum: "none",
        province: "none",
        saved_programs: [],
        saved_universities: [],
        recommended_programs: [],
        recommended_universities: [],
        grades: [],
      };

      console.debug(newUser)
      const docRef = await addDoc(usersCollection, newUser);

      return NextResponse.json({ ...newUser, id: docRef.id }, { status: 201 });
      // redirect to user setup page if new user
    } else {
      const userDoc = querySnapshot.docs[0];
      return NextResponse.json({...userDoc.data(), id: userDoc.id}, { status: 200 });
      // redirect to user dashboard if existing user
    }
  } catch (error) {
    console.error('Error fetching or creating user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}