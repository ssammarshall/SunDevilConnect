import { roles } from "../roles";
import { authenticate } from "../utils";

function ClubMemberEntry({member, role}) {
    function changeUserRole(role) {
        authenticate().then((data) => {
            if (!data.access) {
                console.log("No access token returned from refresh");
                return;
            }
            let body={};
            body.role=role;
            //use the new token to make a patch request
            fetch(process.env.REACT_APP_API_URL + "/connect/clubs/"+member.club_id+"/members/"+member.id+"/?format=json", {
                method: 'PATCH',
                body: JSON.stringify(body),
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
        });
    }
    let memberRoleText;
    if (member.role==roles.clubLeader) {
        memberRoleText="Leader";
    } else if (member.role==roles.requestedToJoin) {
        memberRoleText="Requested to join club";
    } else {
        memberRoleText="Member";
    }

    let text=(<span>{member.username}: {memberRoleText}</span>);

    if (role==roles.user) {
        return (<>{text}</>);
    }

    //we know the user is a club leader or an admin now
    //switch through the member's role
    switch (member.role) {
        case roles.requestedToJoin:
            return (<>
                {text}
                <button onClick={()=>changeUserRole(roles.clubMember)}>Add as member</button>
                <button onClick={()=>changeUserRole(roles.clubLeader)}>Add as leader</button>
            </>);
        case roles.clubMember:
            return (<>
                {text}
                <button onClick={()=>changeUserRole(roles.clubLeader)}>Promote to club leader</button>
            </>);
        case roles.clubLeader:
            if (role==roles.clubLeader) {
                return (<>{text}</>);
            } else if (role==roles.admin){
                return (<>
                    {text}
                    <button onClick={()=>changeUserRole(roles.clubMember)}>Demote to club member</button>
                </>);               
            }
    }
    //fallback in case nothing returns earlier
    return (<>{text}</>);
}
export default ClubMemberEntry;