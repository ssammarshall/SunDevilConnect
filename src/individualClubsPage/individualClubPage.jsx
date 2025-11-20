import { useState } from 'react'
import ClubPostList from './clubPostList';
import EventsList from '../eventsPage/eventsList';
import ClubMemberList from './clubMemberList';
import { pages } from '../Pages';
import { roles } from '../roles';

function IndividualClubPage({role, id, setPage, clubMemberships, setEventId, setPostId}) {

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
    let [clubUsers, setClubusers] = useState({});
    let [clubInfo, setClubInfo] = useState("");
    let [clubName, setClubName] = useState("");

    let postsAndEvents = (<>

    </>);

    const [isLoading, setIsLoading] = useState(4);
    const [hasLoadedPosts, setHasLoadedPosts] = useState(false);
    const [hasLoadedEvents, setHasLoadedEvents] = useState(false);
    const [hasLoadedMembers, setHasLoadedMembers] = useState(false);
    const [hasLoadedClubData, setHasLoadedClubData] = useState(false);

    if (isLoading!=0) {
        //fetch needed elements
        //posts
        if (!hasLoadedPosts) {
            fetch(process.env.REACT_APP_API_URL+"/connect/clubs/"+id+"/content/?format=json").then((resp)=>{
                return resp.json();
            }).then(function(data) {
                setClubPosts(data);
                setIsLoading(isLoading-1);
                setHasLoadedPosts(true);
                //console.log(clubList);
            }).catch(function(error) {
                console.log("error: "+error);
            });
        }
        //events
        if (!hasLoadedEvents) {
            fetch(process.env.REACT_APP_API_URL+"/connect/clubs/"+id+"/events/?format=json").then((resp)=>{
                return resp.json();
            }).then(function(data) {
                setClubEvents(data);
                setHasLoadedEvents(true);
                setIsLoading(isLoading-1);
            }).catch(function(error) {
                console.log("error: "+error);
            });
        }
        //users
        if (!hasLoadedMembers) {
            fetch(process.env.REACT_APP_API_URL+"/connect/clubs/"+id+"/members/?format=json").then((resp)=>{
                return resp.json();
            }).then(function(data) {
                setClubusers(data);
                setHasLoadedMembers(true);
                setIsLoading(isLoading-1);
                console.log(data);
            }).catch(function(error) {
                console.log("error: "+error);
            });
        }
        //club information
        if (!hasLoadedClubData) {
            fetch(process.env.REACT_APP_API_URL+"/connect/clubs/"+id+"/?format=json").then((resp)=>{
                return resp.json();
            }).then(function(data) {
                setClubInfo(data.description);
                setClubName(data.name);
                setIsLoading(isLoading-1);
            }).catch(function(error) {
                console.log("error: "+error);
            });
        }
        console.log("loading status: "+isLoading);
        return (<div>Loading...</div>)
    }
    for(let i=0; i<clubMemberships.length;i++) {
        if (clubMemberships[i].club_id==id||role==roles.admin) {
            if (clubMemberships[i].role==roles.clubLeader||role==roles.admin) {
                return (<>
                    <h1>{clubName}</h1>
                    <h2>{clubInfo}</h2>
                    <h2>Posts: </h2>
                    <ClubPostList setId={(id)=>setPostId(id)} posts={clubPosts} role={roles.admin} setPage={(page)=>setPage(page)}></ClubPostList>
                    <h2>Events: </h2>
                    <EventsList setId={(id)=>setEventId(id)} events={clubEvents} role={roles.admin} setPage={(page)=>setPage(page)}></EventsList><br/>
                    <h2>Members: </h2>
                    <ClubMemberList members={clubUsers} role={role}></ClubMemberList>
                    <button onClick={newPost}>New Post</button>
                    <button onClick={newEvent}>New Event</button>
                </>)
            }
        }
    }
    //console.log("CLUB POSTS=");
    //console.log(clubPosts);
    return (<>
        <h1>{clubName}</h1>
        <h2>{clubInfo}</h2>
        <h2>Posts: </h2>
        <ClubPostList setId={(id)=>setPostId(id)} posts={clubPosts} role={role} setPage={(page)=>setPage(page)}></ClubPostList>
        <h2>Events: </h2>        
        <EventsList setId={(id)=>setEventId(id)} events={clubEvents} role={role} setPage={(page)=>setPage(page)}></EventsList>
        <h2>Members: </h2>
        <ClubMemberList members={clubUsers} role={role}></ClubMemberList>
    </>);
}

export default IndividualClubPage;