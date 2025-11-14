import { useState } from 'react'
import ClubPostList from './clubPostList';
import EventsList from '../eventsPage/eventsList';

function IndividualClubPage({role, id}) {
    //make a fetch call to the API

    //console.log("Club page");
    let [clubPosts, setClubPosts] = useState({});
    let [clubEvents, setClubEvents] = useState({});
    
    const [isLoading, setIsLoading] = useState(2);
    if (isLoading) {
        //fetch both posts and events
        fetch(process.env.REACT_APP_API_URL+"/connect/clubs/"+id+"/content/?format=json").then((resp)=>{
            return resp.json();
        }).then(function(data) {
            setClubPosts(data);
            setIsLoading(isLoading-1);
            //console.log(clubList);
        }).catch(function(error) {
            console.log("error: "+error);
        });
        fetch(process.env.REACT_APP_API_URL+"/connect/clubs/"+id+"/events/?format=json").then((resp)=>{
            return resp.json();
        }).then(function(data) {
            setClubEvents(data);
            setIsLoading(isLoading-1);
        }).catch(function(error) {
            console.log("error: "+error);
        });        
    }
    console.log(isLoading);
    if (isLoading!=0) {
        return (<div>Loading...</div>)
    }

    console.log("CLUB POSTS=");
    console.log(clubPosts);
    return (<>
        <ClubPostList posts={clubPosts} role={role}></ClubPostList>
        <EventsList events={clubEvents} role={role}></EventsList>
    </>);
}

export default IndividualClubPage;