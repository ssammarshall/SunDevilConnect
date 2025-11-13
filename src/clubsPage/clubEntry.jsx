import { roles } from "../roles";
import { pages } from "../Pages";
function ClubEntry({club, role, setPage, setId}) {
    function buttonClick() {
        setId(club.id);
        setPage(pages.specificClubPage);
    }
    //different return values based on the role
    switch (role) {
        case roles.admin:
            return (
                <span>
                    <br/>{club.name}<br/>
                    {club.description}<br/>
                    <button onClick={()=>buttonClick()}>Manage club</button>
                </span>
            )
        default: 
            return (
            <>
                {club.name + ", " + club.description}
            </>
            )
    }
    
}
export default ClubEntry;