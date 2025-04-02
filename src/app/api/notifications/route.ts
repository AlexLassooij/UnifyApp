import { NextRequest, NextResponse } from 'next/server';
import { doc, setDoc } from 'firebase/firestore';
import { notificationsCollection } from '@/firebase/clientApp';

export async function POST(request: NextRequest) {
    try {
    const { name, email, notification } = await request.json();

    const notificationRef = doc(notificationsCollection, email);

    setDoc(notificationRef, {
        name: name,
        notification: notification,
    })

    return NextResponse.json({ message: 'Notification added successfully' }, { status: 201 });
    } catch (error) {
        console.error('Error adding notification:', error);
        return NextResponse.json(
            { error: 'Failed to add notification', details: (error as Error).message },
            { status: 500 }
        );
    }

}
