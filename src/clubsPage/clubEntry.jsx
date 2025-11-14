import { roles } from "../roles";
import { pages } from "../Pages";
function ClubEntry({club, role, setPage, setId, clubMemberships, setClubMemberships}) {
    function buttonClick() {
        setId(club.id);
        setPage(pages.specificClubPage);
    }

    function clubJoin() {
        //do the requests needed to add a user to the club
        let membership = clubMemberships;
        membership[membership.length]={club_id:club.id,club_name:club.name,role:"M"};
        buttonClick();
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
            console.log({club_id:club.id,club_name:club.name,role:"L"});
            console.log(clubMemberships);
            for(let i=0; i<clubMemberships.length;i++) {
                if (clubMemberships[i].club_id==club.id) {
                    if (clubMemberships[i].role=="L") {
                        return (
                            <span>
                                <br/>{club.name}<br/>
                                {club.description}<br/>
                                <button onClick={()=>buttonClick()}>Manage club</button>
                            </span>
                        )
                    } else if (clubMemberships[i].role=="M") {
                        return (
                            <span>
                                <br/>{club.name}<br/>
                                {club.description}<br/>
                                <button onClick={()=>buttonClick()}>View club</button>
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