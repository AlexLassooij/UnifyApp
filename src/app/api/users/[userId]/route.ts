import { NextRequest, NextResponse } from "next/server";
import { usersCollection } from "@/firebase/clientApp";
import { updateDoc, doc, getDoc } from "firebase/firestore";

export async function PATCH(request: NextRequest,{ params }: { params: Promise<{ userId: string }> }) {
    try {
      const { userId } = await params;
     
      const profileData = await request.json();
      console.debug(profileData)
      
      const {
        name,
        gender,
        currentGrade,
        province,
        high_school,
        graduationYear,
      } = profileData;
  
      
      const userRef = doc(usersCollection, userId);
      
      await updateDoc(userRef,{
        ...(name !== undefined && { name }),
        ...(gender !== undefined && { gender }),
        ...(currentGrade !== undefined && { currentGrade }),
        ...(province !== undefined && { province }),
        ...(high_school !== undefined && { high_school }),
        ...(graduationYear !== undefined && { graduationYear }),
      });
  
      // 6. Fetch updated user profile
      const updatedUserDoc = await getDoc(userRef);
      const updatedUser = { id: updatedUserDoc.id, ...updatedUserDoc.data() };
  
      return NextResponse.json(updatedUser, { status: 200 });
  
    } catch (error) {
      console.error("Error updating user profile:", error);
      return NextResponse.json(
        { error: "Failed to update user profile" },
        { status: 500 }
      );
    }
  }