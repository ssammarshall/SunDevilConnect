import { roles } from "../roles";
import { pages } from "../Pages";
function EventEntry({event, role, setPage, setId}) {
    function buttonClick() {
        setId();
        setPage(pages.specificEventPage);
    }
    function editEventBtn() {
        setId();
        setPage(pages.editEventPage);
    }
    switch (role) {
        case roles.admin:
            return (<>
                <span>
                    {event.name}<br/>
                    {event.location}<br/>
                </span><br/>
                <button onClick={buttonClick}>View event</button>
                <button onClick={editEventBtn}>Edit event</button>
            </>)
        default: 
            return (<>
                <span>
                    {event.name}<br/>
                    {event.club.name}<br/>
                </span><br/>
                <button onClick={buttonClick}>View event</button>
            </>)
    }
}
export default EventEntry;