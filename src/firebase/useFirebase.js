import { useAuthContext } from "../auth/AuthContext";
import { auth, db } from "./firebase-config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";

export function useFirebase() {
    const userCollectionRef = collection(db, 'users');
    const travelCollectionRef = collection(db, 'travels');

    const { currentUser } = useAuthContext();

    async function userRegister(username, email, password) {
        const response = await createUserWithEmailAndPassword(auth, email, password);
        const { uid } = response.user;

        return setDoc(doc(userCollectionRef, uid), {
            id: uid,
            email,
            username
        });
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

    async function getUserName() {
        try {
            if (!currentUser) {
                return '';
            }

            const user = await getDoc(doc(userCollectionRef, currentUser.uid));

            if (!user.exists()) {
                return '';
            }

            return user.data()?.username;
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

    return { userRegister, userLogin, userLogout, getUserName, getTravels, createTravel, updateTravel };
}
