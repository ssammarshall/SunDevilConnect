import EventEntry from "./eventEntry";
function EventsList({events}) {
    //console.log("loading events list");
    //console.log(events);
    if (events==null) {
        return (<p>There are no events in the database</p>);
    }
    return (<ul>{
        events.map((item) => (
        <li key={item.name}><EventEntry event={item}></EventEntry></li>)
    )}</ul>);
}

export default EventsList;