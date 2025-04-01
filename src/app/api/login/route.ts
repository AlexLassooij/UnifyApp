import { NextResponse } from "next/server";
import { getDocs, query, where, addDoc } from 'firebase/firestore';
import { User } from '@/types/datamodel/datamodel';
import { usersCollection } from "@/firebase/clientApp";



export async function POST(request: Request) {
  const { email, name="newUser", signup=false } = await request.json();

  if (!email) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  try {
    const q = query(usersCollection, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (!signup && querySnapshot.empty) {
      return NextResponse.json(
        { error: 'No user found with this email address' },
        { status: 404 } // 404 Not Found is appropriate for this case
      );
    }

    if (signup && !querySnapshot.empty) {
      return NextResponse.json(
        { error: 'E-mail address already in use' },
        { status: 404 } // 404 Not Found is appropriate for this case
      );
    }

    if (signup && querySnapshot.empty) {
      const newUser: User = {
        name,
        email,
        high_school: '',
        curriculum: "AB", // ! only temporary until we allow users to select province
        province: "AB",
        currentGrade: "12",
        graduationYear: "2025",
        saved_programs: [],
        saved_universities: [],
        recommended_programs: [],
        recommended_universities: [],
        grades: [],
      };
      
      const docRef = await addDoc(usersCollection, newUser);

      return NextResponse.json({ ...newUser, id: docRef.id }, { status: 201 });          
      // signup false and not empty
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