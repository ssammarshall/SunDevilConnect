import EventEntry from "./eventEntry";
function EventsList({events, role, setPage, setId}) {
    //console.log("loading events list");
    //console.log(events);
    if (events==null) {
        return (<p>There are no events in the database</p>);
    }
    return (<ul>{
        events.map((item) => (
        <li key={item.name}><EventEntry setPage={(page)=>setPage(page)} setId={()=>setId(item.id)} role={role} event={item}></EventEntry></li>)
    )}</ul>);
}

export default EventsList;