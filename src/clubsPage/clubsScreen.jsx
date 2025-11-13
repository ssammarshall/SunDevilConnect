import ClubsList from './clubsList.jsx'
import { useState } from 'react'

function ClubsScreen({role, setPage}) {
    //console.log("Clubs Screen");
    //let clubList = {};
    let [clubList, setClubList] = useState({});
    //let isLoading = true;
    const [isLoading, setIsLoading] = useState(true);
    if (isLoading) {
        let clubs = fetch(process.env.REACT_APP_API_URL+"/connect/clubs/?format=json").then((resp)=>{
            return resp.json();
        }).then(function(data) {
            setClubList(data);
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

    console.log("CLUBS LIST=");
    console.log(clubList);
    return (<ClubsList setPage={(page)=>setPage(page)} clubs={clubList} role={role}></ClubsList>);
}

export default ClubsScreen;