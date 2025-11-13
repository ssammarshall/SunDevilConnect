function EventEntry({event, role}) {
    return (
        <>
            {event.name + ", " + event.club.name}
        </>
    )
}
export default EventEntry;