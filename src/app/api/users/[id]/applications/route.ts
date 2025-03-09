import { NextResponse } from "next/server";
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/firebase/clientApp';


// Get a specific application
export async function GET(
  request: Request,
  { params }: { params: { userId: string; applicationId: string } }
) {
  const { userId, applicationId } = params;
  
  try {
    const cRef = doc(db, 'curricula', 'SsFbcfosxnQwYQd0Krn8');
    const cDoc = await getDoc(cRef)
    console.debug(cDoc.data())
    // const applicationRef = doc(db, 'users', userId, 'applications', applicationId);
    const applicationDoc = await getDoc(applicationRef);
    
    if (!applicationDoc.exists()) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }
    
    return NextResponse.json({
      id: applicationDoc.id,
      ...applicationDoc.data()
    }, { status: 200 });
  } catch (error) {
    console.error('Error fetching application:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Update an application
export async function PUT(
  request: Request,
  { params }: { params: { userId: string; applicationId: string } }
) {
  const { userId, applicationId } = params;
  const applicationData = await request.json();
  
  try {
    const applicationRef = doc(db, 'users', userId, 'applications', applicationId);
    await updateDoc(applicationRef, applicationData);
    
    const updatedDoc = await getDoc(applicationRef);
    
    return NextResponse.json({
      id: updatedDoc.id,
      ...updatedDoc.data()
    }, { status: 200 });
  } catch (error) {
    console.error('Error updating application:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Delete an application
export async function DELETE(
  request: Request,
  { params }: { params: { userId: string; applicationId: string } }
) {
  const { userId, applicationId } = params;
  
  try {
    const applicationRef = doc(db, 'users', userId, 'applications', applicationId);
    await deleteDoc(applicationRef);
    
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error deleting application:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}