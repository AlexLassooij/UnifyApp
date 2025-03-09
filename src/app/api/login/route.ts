import { NextResponse } from "next/server";
import { getDocs, query, where, setDoc, addDoc } from 'firebase/firestore';
import { User } from '@/types/datamodel/datamodel';
import { usersCollection } from "@/firebase/clientApp";



export async function POST(request: Request) {
  const { email, name } = await request.json();

  if (!email) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  try {
    // const usersnap = await db.collection('curricula').get();
    // // console.debug(usersnap.docs)
    // // usersnap.then((snapshot) => {
    // //   snapshot.forEach((doc) => {
    // //     console.debug(doc.id, '=>', doc.data());
    // //   });
    // // });
    // // return NextResponse.json({ message: 'Internal server error' }, { status: 200 });
    // return null
    const q = query(usersCollection, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      const newUser: User = {
        name,
        email,
        high_school: '',
        curriculum: null,
        province: null,
        saved_programs: [],
        saved_universities: [],
        recommended_programs: [],
        recommended_universities: [],
        grades: [],
      };

      console.debug(newUser)
      const docRef = await addDoc(usersCollection, newUser);

      const userId = docRef.id;
      await setDoc(docRef, { ...newUser, id: userId });
      return NextResponse.json({ ...newUser, id: docRef.id }, { status: 201 });
      // redirect to user setup page if new user
    } else {
      const userDoc = querySnapshot.docs[0];
      return NextResponse.json({...userDoc.data()}, { status: 200 });
      // redirect to user dashboard if existing user
    }
  } catch (error) {
    console.error('Error fetching or creating user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}