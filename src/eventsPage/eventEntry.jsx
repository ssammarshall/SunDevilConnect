function EventEntry({event}) {
    return (
        <>
            {event.name + ", " + event.club.name}
        </>
    )
}
export default EventEntry;