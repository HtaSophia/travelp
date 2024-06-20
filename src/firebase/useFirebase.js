import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import {
    Timestamp,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    orderBy,
    query,
    serverTimestamp,
    setDoc,
    updateDoc,
    where,
} from "firebase/firestore";
import { auth, db } from "./firebase-config";
import { useAuthContext } from "../auth/AuthContext";
import { v4 as uuid } from "uuid";

export function useFirebase() {
    const userCollectionRef = collection(db, "users");
    const travelCollectionRef = collection(db, "travels");

    const { currentUser } = useAuthContext();

    async function userRegister(username, email, password) {
        const response = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        const { uid } = response.user;

        return setDoc(doc(userCollectionRef, uid), {
            id: uid,
            email,
            username,
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
                return "";
            }

            const user = await getDoc(doc(userCollectionRef, currentUser.uid));

            if (!user.exists()) {
                return "";
            }

            return user.data()?.username;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async function getTravel(travelId) {
        try {
            const travelRef = doc(travelCollectionRef, travelId);
            const travelSnapshot = await getDoc(travelRef);
            return travelSnapshot.data();
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async function getTravels() {
        const travelsQuery = query(
            travelCollectionRef,
            where("userId", "==", currentUser.uid),
            orderBy("updatedAt", "desc")
        );

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
            userId: currentUser.uid,
            startDate: Timestamp.fromDate(new Date(travel.startDate)),
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        };

        if (travel.endDate) {
            newTravel.endDate = Timestamp.fromDate(new Date(travel.endDate));
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

    async function deleteTravel(travelId) {
        try {
            const travelRef = doc(travelCollectionRef, travelId);
            return deleteDoc(travelRef);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    return {
        userRegister,
        userLogin,
        userLogout,
        getUserName,
        getTravel,
        getTravels,
        createTravel,
        updateTravel,
        deleteTravel,
    };
}
