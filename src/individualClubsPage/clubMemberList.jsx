import ClubMemberEntry from "./clubMemberEntry";
import { roles } from "../roles";
function ClubMemberList({members, role}) {
    //console.log(posts);
    if (members==null) {
        return (<p>This club does not have any members yet</p>);
    }
    members.sort((a, b)=>{
        if (a.role==b.role) {
            return 0;
        }
        if (a.role==roles.clubLeader) {
            return -1;
        }
        return 1;
    });
    return (<ul>{
        members.map((item) => (
            <li key={item.id}><ClubMemberEntry role={role} member={item}></ClubMemberEntry></li>)
        )
    }</ul>);
}

export default ClubMemberList;