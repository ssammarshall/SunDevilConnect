import EventsList from './eventsList.jsx';
import { useState } from 'react'

function EventsScreen() {
    //console.log("Clubs Screen");
    //let clubList = {};
    let [eventList, setEventList] = useState({});
    //let isLoading = true;
    const [isLoading, setIsLoading] = useState(true);
    if (isLoading) {
        let events = fetch(process.env.REACT_APP_API_URL+"/connect/events/?format=json").then((resp)=>{
        return resp.json();
    }).then(function(data) {
        setEventList(data);
        setIsLoading(false);
        //console.log(clubList);
    }).catch(function(error) {
        console.log("error: "+error);
    });
}
    console.log(isLoading);
    if (isLoading) {
        return (<div>Loading...</div>)
    }

    return (<EventsList events={eventList}></EventsList>);
}

export default EventsScreen;