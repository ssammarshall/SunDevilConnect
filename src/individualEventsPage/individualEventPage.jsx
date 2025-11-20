import { useState } from 'react'

function IndividualEventPage({role, id}) {

    //console.log("Event page");
    let [eventDetails, setEventDetails] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    if (isLoading) {
        fetch(process.env.REACT_APP_API_URL+"/connect/events/"+id+"/?format=json").then((resp)=>{
            return resp.json();
        }).then(function(data) {
            setEventDetails(data);
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

    console.log("Event details=");
    console.log(eventDetails);
    return (<>
        <h1>{eventDetails.name}</h1>
        <p>{eventDetails.club.name}</p>
        <p>{eventDetails.date}</p>
        <p>{eventDetails.location}</p>
        <p>{eventDetails.attendees}</p>
    </>);
}

export default IndividualEventPage;