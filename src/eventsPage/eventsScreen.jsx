import EventsList from './eventsList.jsx';
import { constants } from '../constants.js'
import { useState } from 'react'

function EventsScreen() {
    //console.log("Clubs Screen");
    //let clubList = {};
    let [eventList, setEventList] = useState({});
    //let isLoading = true;
    const [isLoading, setIsLoading] = useState(true);
    if (isLoading) {
        let events = fetch(constants.backendURL+"/connect/events/?format=json").then((resp)=>{
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

    return (<EventsList event={eventList}></EventsList>);
}

export default EventsScreen;