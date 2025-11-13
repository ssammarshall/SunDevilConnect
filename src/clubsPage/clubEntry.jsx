import { roles } from "../roles";
import { pages } from "../Pages";
function ClubEntry({club, role, setPage}) {

    //different return values based on the role
    switch (role) {
        case roles.admin:
            return (
                <span>
                    <br/>{club.name}<br/>
                    {club.description}<br/>
                    <button onClick={()=>setPage(pages.specificClubPage)}>Manage club</button>
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