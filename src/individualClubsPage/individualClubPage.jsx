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

    //NEW STRATEGY
    const [isLoading, setIsLoading] = useState(true);
    if (isLoading) {
        Promise.all([fetch(process.env.REACT_APP_API_URL+"/connect/clubs/"+id+"/content/?format=json").then(value=>value.json()),
            fetch(process.env.REACT_APP_API_URL+"/connect/clubs/"+id+"/events/?format=json").then(value=>value.json()),
            fetch(process.env.REACT_APP_API_URL+"/connect/clubs/"+id+"/members/?format=json").then(value=>value.json()),
            fetch(process.env.REACT_APP_API_URL+"/connect/clubs/"+id+"/?format=json").then(value=>value.json())
        ]).then(([posts, events, members, club]) => {
            setIsLoading(false);
            setClubPosts(posts);
            setClubEvents(events);
            setClubusers(members);
            setClubInfo(club.description);
            setClubName(club.name);
        }).catch((err) => {
            console.log("error: "+err);
        });
        return (<div className='loadPage'>Loading...</div>);
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