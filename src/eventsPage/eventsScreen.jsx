import EventsList from './eventsList.jsx';
import { useState } from 'react'

function EventsScreen({role, setPage, setId}) {
    //console.log("Events Screen");
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
        return (<div className='loadPage'>Loading...</div>)
    }

    return (<EventsList setPage={(page)=>setPage(page)} setId={(id)=>setId(id)} role={role} events={eventList}></EventsList>);
}

export default EventsScreen;