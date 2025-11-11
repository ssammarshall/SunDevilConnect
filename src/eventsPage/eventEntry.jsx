function EventEntry({event}) {
    return (
        <>
            {event.name + ", " + event.description}
        </>
    )
}
export default EventEntry;