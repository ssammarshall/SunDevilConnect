import { roles } from "../roles";
import { pages } from "../Pages";
function EventEntry({event, role, setPage, setId}) {
    function buttonClick() {
        setId();
        setPage(pages.specificEventPage);
    }
    switch (role) {
        case roles.admin:
            return (
                <span>
                    <br/>{event.name}<br/>
                    {event.location}<br/>
                    <button onClick={()=>buttonClick()}>Update event</button>
                </span>
            )
        default: 
            return (
            <>
                {event.name + ", " + event.club.name}
            </>
            )
    }
}
export default EventEntry;