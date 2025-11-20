import ClubMemberEntry from "./clubMemberEntry";
import { roles } from "../roles";
function ClubMemberList({members, role}) {
    //console.log(posts);
    if (members==null) {
        return (<p>This club does not have any members yet</p>);
    }
    let filteredMembers = [];
    members.sort((a, b)=>{
        if (a.role==b.role) {
            return 0;
        }
        if (a.role==roles.clubLeader) {
            return -1;
        }
        if (a.role==roles.requestedToJoin) {
            return 1;
        }
        if (b.role==roles.clubLeader) {
            return 1;
        }
        if (b.role==roles.requestedToJoin) {
            return -1;
        }
        return 1;
    });
    //filter members if you are a normal member
    if (role==roles.user) {
        for (let i=0;i<members.length;i++) {
            if (members[i].role!=roles.requestedToJoin) {
                filteredMembers.push(members[i]);
            }
        }
    } else {
        filteredMembers=members;
    }
    return (<ul>{
        filteredMembers.map((item) => (
            <li key={item.username}><ClubMemberEntry role={role} member={item}></ClubMemberEntry></li>)
        )
    }</ul>);
}

export default ClubMemberList;