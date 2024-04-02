import { initializeApp } from 'firebase/app';
import { getDatabase, ref } from 'firebase/database';

export const firebaseConfig = {
  apiKey: process.env.FirebaseApiKey || process.env.NEXT_PUBLIC_FirebaseApiKey,
  projectId: process.env.FirebaseProjectId || process.env.NEXT_PUBLIC_FirebaseProjectId,
  databaseURL: process.env.FirebaseDatabaseURL || process.env.NEXT_PUBLIC_FirebaseDatabaseURL,
};

export const firebaseApp = initializeApp(firebaseConfig);

export const db = getDatabase(firebaseApp);
export const mainPathRef = ref(db, 'userId/');
export const dynamicPathRef = (id: any) => {
  return ref(db, `userId/${id}`);
};
