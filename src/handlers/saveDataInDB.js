import { getDatabase, ref, set } from "firebase/database";
import app from "../firebase";

export default async function saveDataInDB(userId, 
    currentCity,
    currentCountry,
    currentId,
    currentStartDate,
    currentEndDate,
    currentCityImage) { 
        try {
        const db = getDatabase(app);
        await set(ref(db, 'cards/' + userId + '/' + currentId), {
        city: {
            city: currentCity,
            country: currentCountry,
            id: currentId,
        },
        startDate: currentStartDate,
        endDate: currentEndDate,
        cityImage: currentCityImage,
        selected: false
      });
        } catch(err) {
            console.error("Error saving data to Firebase", err);
        }
       
}