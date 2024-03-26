export default async function fetchForecast(city, country, dateStart, dateEnd) {
    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city},${country}/${dateStart}/${dateEnd}?unitGroup=metric&include=days&iconSet=icons1&key=${process.env.REACT_APP_KEY_WEATHER}&contentType=json`);
        if (response.status === 200) {
            const data = await response.json();
            return data;
        } else {
            console.log("Unsuccessfully processed request");
        }
    } catch (err) {
        console.error('There was an error!', err);
    }
}