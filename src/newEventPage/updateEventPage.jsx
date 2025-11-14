import { pages } from '../Pages';

function UpdateEventPage({id, setPage}) {
    function submitButton() {
        //make requests to update an event
        //when done, call this
        setPage(pages.mainPage);
    }
    //can remove some of these fields as needed
    return (<>
        <input id="name" placeholder="name of the event"></input><br/><br/>
        <input id="date" type="datetime-local"></input><br/><br/>
        <input id="location" placeholder="location of the event"></input><br/><br/>
        Is this event paid?: <input id="isPaid" type="checkbox"></input><br/><br/>
        <input id="maxAttendees" type="number" placeholder="number of attendees"></input><br/><br/>
        <button onClick={submitButton}>Submit!</button>
    </>)
}
export default UpdateEventPage;