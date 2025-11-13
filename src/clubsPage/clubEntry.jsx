import { roles } from "../roles";
function ClubEntry({club, role}) {

    //different return values based on the role
    switch (role) {
        case roles.admin:
            return (
                <span>
                    {club.name}<br/>
                    {club.description}
                    <button>Manage club</button>
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