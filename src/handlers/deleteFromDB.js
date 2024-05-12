import { getDatabase, ref, remove } from "@firebase/database";
import app from "../firebase";

export default async function deleteFromDataBase(userId, cardId) {
    try {
        const db = ref(getDatabase(app), `cards/${userId}/${cardId}`);
        await remove(db);
    } catch (error) {
        console.error("Error deleting data from Firebase", error);
    }
}