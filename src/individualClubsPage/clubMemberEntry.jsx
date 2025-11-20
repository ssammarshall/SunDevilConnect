import { roles } from "../roles";
function ClubMemberEntry({member, role}) {
    function admitBtn() {
        //fetch call to add member to club
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
                <button onClick={admitBtn}>Add as member</button>
                <button onClick={admitBtn}>Add as leader</button>
                <button onClick={admitBtn}>Deny access to club</button>
            </>);
        case roles.clubMember:
            return (<>
                {text}
                <button onClick={admitBtn}>Promote to club leader</button>
                <button onClick={admitBtn}>Remove from club</button>
            </>);
        case roles.clubLeader:
            if (role==roles.clubLeader) {
                return (<>{text}</>);
            } else if (role==roles.admin){
                return (<>
                    {text}
                    <button onClick={admitBtn}>Demote to club member</button>
                    <button onClick={admitBtn}>Remove from club</button>
                </>);               
            }
    }
    //fallback in case nothing returns earlier
    return (<>{text}</>);
}
export default ClubMemberEntry;