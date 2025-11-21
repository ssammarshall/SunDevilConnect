import { useState } from 'react'
import { roles } from '../roles';
import { pages } from '../Pages.js';
import { authenticate } from '../utils.js';

function IndividualEventPage({role, id, memberships, setPage}) {

    function registerForEvent() {
        /*authenticate().then((data) => {
            if (!data.access) {
                console.log("No access token returned from refresh");
                return;
            }
            let body = {};
            
            //use the new token to access what you want
            fetch(process.env.REACT_APP_API_URL + "/connect/clubs/"+eventDetails.club.id+"events/"+id+"/?format=json", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: "JWT " + data.access,
                },
            })
            //after fetching the data, print it out
            .then((resp) => {
                //console.log(resp);
                return resp.json();
            })
            .then(function (data) {
                console.log(data);
            })
            .catch(function (error) {
                console.log("error: " + error);
            });
        });*/
        setPage(pages.mainPage);
    }



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

    let partOfClub=false;
    if (memberships!=null) {
    for (let i=0;i<memberships.length;i++) {
        if (memberships[i].role==roles.clubLeader||memberships[i].role==roles.clubMember) {
            if (memberships[i].club_id==eventDetails.club.id) {
                partOfClub=true;
            }
        }
    }
    }
    let eventInformation=(<>
        <h1>{eventDetails.name}</h1>
        <p>{eventDetails.club.name}</p>
        <p>{eventDetails.date}</p>
        <p>{eventDetails.location}</p>
        <p>{eventDetails.attendees}</p>

    </>)

    if (role==roles.admin||role==roles.clubLeader||role==roles.clubMember||partOfClub) {
        return (<>
            {eventInformation}
            <button onClick={registerForEvent} id="eventRegister">Register for event</button>
        </>);
    }

    console.log("Event details=");
    console.log(eventDetails);
    return (<>
        {eventInformation}
    </>);
}

export default IndividualEventPage;