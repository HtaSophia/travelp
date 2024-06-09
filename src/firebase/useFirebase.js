import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import { auth, db } from "./firebase-config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, doc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { v5 as uuid } from 'uuid';

export function useFirebase() {
    const userCollectionRef = collection(db, 'users');
    const travelCollectionRef = collection(db, 'travels');

    const { currentUser } = useContext(AuthContext);

    async function userRegister(username, email, password) {
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            const { uid } = response.user;

            return setDoc(doc(userCollectionRef, uid), {
                id: uid,
                email,
                username
            });
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async function userLogin(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    async function userLogout() {
        try {
            await signOut(auth);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async function getTravels() {
        const travelsQuery = query(travelCollectionRef, where('userId', '==', currentUser.uid));

        try {
            const querySnapshot = await getDocs(travelsQuery);
            return querySnapshot.docs.map((doc) => doc.data());
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async function createTravel(travel) {
        const newTravel = {
            ...travel,
            id: uuid(),
            userId: currentUser.id,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        }

        try {
            return setDoc(doc(travelCollectionRef, newTravel.id), newTravel);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async function updateTravel(travel) {
        try {
            const travelRef = doc(travelCollectionRef, travel.id);
            return updateDoc(travelRef, {
                ...travel,
                updatedAt: serverTimestamp(),
            });
        } catch (error) {
            throw new Error(error.message);
        }
    }

    return { userRegister, userLogin, userLogout, getTravels, createTravel, updateTravel };
}