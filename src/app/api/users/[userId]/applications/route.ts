import { NextRequest, NextResponse } from 'next/server';
import { Timestamp, doc, collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { usersCollection } from '@/firebase/clientApp';

// GET all applications for a specific user
export async function GET(request: NextRequest, { params }: { params: Promise<{ userId: string }> }) {
  try {
    
    const { userId } = await params;
    
    
    // Get applications subcollection for this user

    const userDocRef = doc(usersCollection, userId);
    const applicationsRef = collection(userDocRef, 'applications');
    const snapshot = await getDocs(applicationsRef);
    
    if (snapshot.empty) {
      return NextResponse.json({ applications: [] });
    }

    const applicationsReformatted = snapshot.docs.map(doc => {
      const data = doc.data();
      console.debug(data);
      // Convert Firestore timestamps to serializable format
      return {
        id: doc.id,
        ...data,
        application_date: data.application_date?.toDate(),
        application_deadline: data.application_deadline?.toDate(),
        last_updated: data.last_updated?.toDate(),
        sub_tasks: data.sub_tasks ? data.sub_tasks.map((task: any) => ({
          ...task,
          deadline: task.deadline?.toDate(),
        })) : []
      };
    });
    
    return NextResponse.json({ applications: applicationsReformatted });
  } catch (error) {
    console.error('Error fetching applications:', error);
    return NextResponse.json({ error: 'Failed to fetch applications' }, { status: 500 });
  }
}

// POST to create a new application for a specific user
export async function POST(request: NextRequest, { params }: { params: Promise<{ userId: string }> }) {
  try {
    const { userId } = await params;
    
    const data = await request.json();

    const applicationData = {
      ...data,
      // Convert ISO date strings to Firestore timestamps
      application_date: data.application_date ? 
        Timestamp.fromDate(new Date(data.application_date)) : 
        serverTimestamp(),
      
      application_deadline: data.application_deadline ?
        Timestamp.fromDate(new Date(data.application_deadline)) :
        null,
      
      // Always set last_updated to server timestamp
      last_updated: serverTimestamp(),
      
      // Convert sub_tasks deadlines if they exist
      sub_tasks: data.sub_tasks ? data.sub_tasks.map((task: any) => ({
        ...task,
        deadline: task.deadline ? 
          Timestamp.fromDate(new Date(task.deadline)) : 
          null
      })) : []
    };
    
    const userDocRef = doc(usersCollection, userId);
    const applicationsRef = collection(userDocRef, 'applications');
    const docRef = await addDoc(applicationsRef, applicationData);
    
    return NextResponse.json({ 
      success: true, 
      id: docRef.id 
    }, { status: 201 });  } catch (error) {
    console.error('Error creating application:', error);
    return NextResponse.json({ error: 'Failed to create application' }, { status: 500 });
  }
}