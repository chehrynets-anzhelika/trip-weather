import { child, getDatabase, ref, get } from "@firebase/database";
import app from "../firebase";

export default async function getDataFromDataBase(userId) {
    try {
        const dbRef = ref(getDatabase(app));
        const snapshot = await get(child(dbRef, `cards/${userId}`));
            if(snapshot.exists()) {
                let tripsOfUser = Object.values(snapshot.val());
                return tripsOfUser;
            } else {
                console.log("No data available");
                return;
            }
        
    } catch (error) {
        console.error("Error reading data from Firebase", error);
    }
}

