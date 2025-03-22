import { NextResponse, NextRequest } from "next/server";
import { doc, getDoc, updateDoc, deleteDoc, Timestamp, serverTimestamp, collection } from 'firebase/firestore';
import { db, usersCollection } from '@/firebase/clientApp';
import { Application } from "@/types/datamodel/datamodel";

export async function PATCH(request: NextRequest, { params }: { params: { userId: string; applicationId: string } }) {
  try {
    const { userId, applicationId } = params;
    const userDocRef = doc(usersCollection, userId);
    const applicationsCollection = collection(userDocRef, 'applications');
    const applicationRef = doc(applicationsCollection, applicationId);

    const applicationData = await request.json();
    const dataToUpdate = { ...applicationData.data };
    // TODO deadline missing from POST
    console.debug("DATA TO UPDATE", dataToUpdate) 
    
    // Convert date fields if they exist in the update data
    if (applicationData.data.application_deadline) {
      dataToUpdate.application_deadline = Timestamp.fromDate(new Date(applicationData.data.application_deadline));
    }
    
    if (applicationData.data.application_date) {
      dataToUpdate.application_date = Timestamp.fromDate(new Date(applicationData.data.application_date));
    }
    
    // Always update last_updated with server timestamp
    dataToUpdate.last_updated = serverTimestamp();
    
    // Convert sub_tasks deadlines if they exist
    if (applicationData.data.sub_tasks) {
      dataToUpdate.sub_tasks = applicationData.data.sub_tasks.map(task => ({
        ...task,
        deadline: Timestamp.fromDate(new Date(task.deadline))
      }));
    }
    console.debug("DATA UPDATED", dataToUpdate)
    await updateDoc(applicationRef, dataToUpdate);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating application:', error);
    return NextResponse.json({ error: 'Failed to update application' }, { status: 500 });
  }
}


export async function DELETE(request: NextRequest, { params }: { params: { userId: string; applicationId: string } }
) {
  try {
    const { userId, applicationId } = params;
    
    const userDocRef = doc(usersCollection, userId);
    const applicationsCollection = collection(userDocRef, 'applications');
    const applicationRef = doc(applicationsCollection, applicationId);
    
    await deleteDoc(applicationRef);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting application:', error);
    return NextResponse.json({ error: 'Failed to delete application' }, { status: 500 });
  }
}