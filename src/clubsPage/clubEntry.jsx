import { roles } from "../roles";
import { pages } from "../Pages";
import { authenticate } from "../utils";
function ClubEntry({club, role, setPage, setId, clubMemberships, setClubMemberships}) {
    function buttonClick() {
        setId(club.id);
        setPage(pages.specificClubPage);
    }

    function clubJoin() {
        //do the requests needed to add a user to the club
        let body = {};
        body.id=club.id;
        //body.role=roles.requestedToJoin;
        let membership = clubMemberships;
        membership[membership.length]={club_id:club.id,club_name:club.name,role:roles.requestedToJoin};
        authenticate().then((data) => {
            if (!data.access) {
                console.log("No access token returned from refresh");
                return;
            }
            //use the new token to access what you want
            fetch(process.env.REACT_APP_API_URL + "/connect/clubs/"+club.id+"/join/?format=json", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: "JWT " + data.access,
                },
                body: JSON.stringify(body)
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
        });
    }

    //different return values based on the role
    //view club for members
    //manage club for admins and club leaders
    //join club for logged in non-members
    switch (role) {
        case roles.admin:
            return (
                <span>
                    <br/>{club.name}<br/>
                    {club.description}<br/>
                    <button onClick={()=>buttonClick()}>Manage club</button>
                </span>
            )
        case roles.user:
            //console.log({club_id:club.id,club_name:club.name,role:"L"});
            //console.log(clubMemberships);
            for(let i=0; i<clubMemberships.length;i++) {
                if (clubMemberships[i].club_id==club.id) {
                    if (clubMemberships[i].role==roles.clubLeader) {
                        return (
                            <span>
                                <br/>{club.name}<br/>
                                {club.description}<br/>
                                <button onClick={()=>buttonClick()}>Manage club</button>
                            </span>
                        )
                    } else if (clubMemberships[i].role==roles.clubMember) {
                        return (
                            <span>
                                <br/>{club.name}<br/>
                                {club.description}<br/>
                                <button onClick={()=>buttonClick()}>View club</button>
                            </span>
                        );
                    } else if (clubMemberships[i].role==roles.requestedToJoin) {
                        return (
                            <span>
                                <br/>{club.name}<br/>
                                {club.description}<br/>
                            </span>
                        );
                    }
                }
            }
            //If you are not a member or leader of the club
            return (
                <span>
                    <br/>{club.name}<br/>
                    {club.description}<br/>
                    <button onClick={()=>clubJoin()}>Join club</button>
                </span>
            );
        default: 
            return (
            <>
                {club.name + ", " + club.description}
            </>
            )
    }
    
}
export default ClubEntry;