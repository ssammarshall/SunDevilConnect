import { useState } from 'react'
import ClubPostList from './clubPostList';

function IndividualClubPage({role, id}) {
    //make a fetch call to the API

    //console.log("Club page");
    let [clubPosts, setClubPosts] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    if (isLoading) {
        fetch(process.env.REACT_APP_API_URL+"/connect/clubs/"+id+"/content/?format=json").then((resp)=>{
            return resp.json();
        }).then(function(data) {
            setClubPosts(data);
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

    console.log("CLUB POSTS=");
    console.log(clubPosts);
    return (<ClubPostList posts={clubPosts} role={role}></ClubPostList>);
}

export default IndividualClubPage;