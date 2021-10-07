import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export const loadNotes = async (uid) => {
    const notes = []
    try {
        const q = query(collection(db, `${uid}/journal/notes`));

        const querySnapshot = await getDocs(q);


        querySnapshot.forEach((doc) => {
            notes.push({
                id: doc.id,
                ...doc.data()
            })
        });

        return notes

    } catch (e) {
        console.log(e)
    }

}