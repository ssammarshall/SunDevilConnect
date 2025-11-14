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
                    {event.name}<br/>
                    {event.location}<br/>
                </span>
            )
        default: 
            return (
                <span>
                    {event.name}<br/>
                    {event.club.name}<br/>
                </span>
            )
    }
}
export default EventEntry;