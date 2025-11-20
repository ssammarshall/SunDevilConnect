import { roles } from "../roles";
function ClubMemberEntry({member, role}) {
    function admitBtn() {
        //fetch call to add member to club
    }
    //different return values based on the role
    switch (role) {
        case roles.admin:
            return (<>
                <span>
                    {member.user}: {member.role==roles.clubMember?"Member":"Leader"}
                </span><br/>
                //<button onClick={admitBtn}>Add member</button>
            </>)
        default: 
            return (
            <>
                <span>
                    {member.user}: {member.role==roles.clubMember?"Member":"Leader"}
                </span>
            </>
            )
    }
    
}
export default ClubMemberEntry;