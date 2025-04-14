import { initializeApp } from "firebase/app";
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  UserCredential,
  onAuthStateChanged,
  type User
} from "firebase/auth";
import { useNavigate } from "@tanstack/react-router";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const userQueryOptions = queryOptions<{
  user: User
}>({
  queryKey: ["user"],
  queryFn: async () => {
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        unsubscribe(); // Unsubscribe after first response
        if (!user) {
          reject(new Error('No user found'));
        }
        resolve({ user: user!});
      });
    });
  },
})

export function useUser() {
  return useSuspenseQuery(userQueryOptions);
}

export const loginWithEmailAndPassword = async (
  email: string,
  password: string,
  navigate: ReturnType<typeof useNavigate>
): Promise<UserCredential> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    navigate({
      to: "/",
    });
    return userCredential;
  } catch (error) {
    throw error;
  }
};

export const registerWithEmailAndPassword = async (
  email: string,
  password: string,
  navigate: ReturnType<typeof useNavigate>
): Promise<UserCredential> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    navigate({
      to: "/",
    });
    return userCredential;
  } catch (error) {
    throw error;
  }
};

export const loginWithGoogle = async (
  navigate: ReturnType<typeof useNavigate>
): Promise<UserCredential> => {
  try {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    navigate({
      to: "/",
    });
    return userCredential;
  } catch (error) {
    throw error;
  }
};
