import defaultImage from "../images/default.jpg";
const API_URL = "https://api.unsplash.com/photos/random";


export default async function fetchImage({city, country}) {
    try {
        const response = await fetch(`${API_URL}?query=cityscape,${city},${country}&orientation=landscape&client_id=${process.env.REACT_APP_KEY}`);
        if(response.status !== 200) {
            return defaultImage;
        }
        const data = await response.json();
        return data.urls.small;
    } catch (err) {
        console.error('There was an error!', err);
        return defaultImage;
    }
}