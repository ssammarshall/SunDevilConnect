import { useState } from 'react'
import ClubPostList from './clubPostList';
import EventsList from '../eventsPage/eventsList';
import { pages } from '../Pages';
import { roles } from '../roles';

function IndividualClubPage({role, id, setPage, clubMemberships, setId}) {

    function newPost() {
        setPage(pages.newPostPage);
    }

    function newEvent() {
        setPage(pages.newEventPage);
    }

    //make a fetch call to the API

    //console.log("Club page");
    let [clubPosts, setClubPosts] = useState({});
    let [clubEvents, setClubEvents] = useState({});

    let postsAndEvents = (<>
        <ClubPostList setId={(id)=>setId(id)} posts={clubPosts} role={role} setPage={(page)=>setPage(page)}></ClubPostList>
        <EventsList events={clubEvents} role={role} setPage={(page)=>setPage(page)}></EventsList>
    </>);

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
    for(let i=0; i<clubMemberships.length;i++) {
        if (clubMemberships[i].club_id==id||role==roles.admin) {
            if (clubMemberships[i].role==roles.clubLeader||role==roles.admin) {
                return (<>
                    <ClubPostList setId={(id)=>setId(id)} posts={clubPosts} role={roles.admin} setPage={(page)=>setPage(page)}></ClubPostList>
                    <EventsList events={clubEvents} role={roles.admin} setPage={(page)=>setPage(page)}></EventsList><br/>
                    <button onClick={newPost}>New Post</button>
                    <button onClick={newEvent}>New Event</button>
                </>)
            }
        }
    }
    //console.log("CLUB POSTS=");
    //console.log(clubPosts);
    return (<>{postsAndEvents}</>);
}

export default IndividualClubPage;