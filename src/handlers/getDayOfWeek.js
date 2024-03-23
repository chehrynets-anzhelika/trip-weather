export function getDayOfWeek(){
    const date = new Date();
    const day = date.getDay();
    switch(day){
        case 0: return "Sunday";
        case 1: return "Monday";
        case 2: return "Tuesday";
        case 3: return "Wednesday";
        case 4: return "Thursday";
        case 5: return "Friday";
        case 6: return "Saturday";
        default: return;
    }
}