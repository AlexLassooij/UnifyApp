import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { getFirestore, collection } from 'firebase/firestore';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { firebaseConfig } from '@/firebase/clientApp';
import { User } from '@/types/datamodel/datamodel';



export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

if (!getApps().length) {
  initializeApp(firebaseConfig);
}

const firestoreDb = getFirestore(getApp());

// import firstore (obviously)
// Import or define your types
// import { YourType } from '~/@types'
const converter = <T>() => ({
  toFirestore: (data: Partial<T>) => data,
  fromFirestore: (snapshot: FirebaseFirestore.QueryDocumentSnapshot) => snapshot.data() as T
})

// const dataPoint = <T>(collectionPath: string) => {
//   collection(firestoreDb, collectionPath).withConverter(converter<T>())
// }
// const db = {
//   // list your collections here
//   users: dataPoint<User>('users')
// }

// export { db }

export const scrollToTop = () => {
  if (typeof window !== 'undefined') {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
};