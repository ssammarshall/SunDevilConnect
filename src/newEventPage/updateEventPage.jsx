import { useState, useEffect } from 'react';
import { pages } from '../Pages';
import { authenticate } from '../utils';

function UpdateEventPage({id, setPage}) {
    const [isLoading, setIsLoading] = useState(true);
    const [clubId, setClubId] = useState(null);
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');
    const [isPaid, setIsPaid] = useState(false);
    const [maxAttendees, setMaxAttendees] = useState('');
    const [category, setCategory] = useState('SOCIAL');

    useEffect(() => {
        fetch(process.env.REACT_APP_API_URL+"/connect/events/"+id+"/?format=json")
            .then((resp) => resp.json())
            .then(function(data) {
                setClubId(data.club.id);
                setName(data.name || '');
                if (data.date) {
                    const dateObj = new Date(data.date);
                    const localDate = new Date(dateObj.getTime() - dateObj.getTimezoneOffset() * 60000);
                    setDate(localDate.toISOString().slice(0, 16));
                }
                setLocation(data.location || '');
                setIsPaid(data.is_paid_event || false);
                setMaxAttendees(data.max_num_of_attendees || '');
                setCategory(data.category || 'SOCIAL');
                setIsLoading(false);
            })
            .catch(function(error) {
                console.log("error: " + error);
                setIsLoading(false);
            });
    }, [id]);

    function submitButton() {
        let body = {};
        body.name = name;
        body.date = date;
        body.location = location;
        body.is_paid_event = isPaid;
        body.max_num_of_attendees = parseInt(maxAttendees);
        body.category = category || "SOCIAL";

        if (!body.name || !body.date || !body.location || !body.max_num_of_attendees) {
            console.log("Please fill in all required fields");
            return;
        }

        authenticate().then((data) => {
            if (!data.access) {
                console.log("No access token returned from refresh");
                return;
            }
            fetch(process.env.REACT_APP_API_URL + "/connect/clubs/"+clubId+"/events/"+id+"/?format=json", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: "JWT " + data.access,
                },
                body: JSON.stringify(body)
            })
            .then((resp) => {
                if (!resp.ok) {
                    return resp.json().then(err => {
                        throw new Error(JSON.stringify(err));
                    });
                }
                return resp.json();
            })
            .then(function (data) {
                console.log("Event updated successfully:", data);
                setPage(pages.mainPage);
            })
            .catch(function (error) {
                console.log("error: " + error);
            });
        });
    }

    if (isLoading) {
        return (<div className='loadPage'>Loading...</div>);
    }

    return (<>
        <input id="name" placeholder="name of the event" value={name} onChange={(e) => setName(e.target.value)}></input><br/><br/>
        <input id="date" type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)}></input><br/><br/>
        <input id="location" placeholder="location of the event" value={location} onChange={(e) => setLocation(e.target.value)}></input><br/><br/>
        Is this event paid?: <input id="isPaid" type="checkbox" checked={isPaid} onChange={(e) => setIsPaid(e.target.checked)}></input><br/><br/>
        <input id="maxAttendees" type="number" placeholder="number of attendees" value={maxAttendees} onChange={(e) => setMaxAttendees(e.target.value)}></input><br/><br/>
        <label htmlFor="category">Category: </label>
        <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="SOCIAL">Social</option>
            <option value="SPORTS">Sports</option>
            <option value="ACADEMIC">Academic</option>
            <option value="FUNDRAISING">Fundraising</option>
            <option value="NETWORKING">Networking</option>
        </select><br/><br/>
        <button onClick={submitButton}>Submit!</button>
    </>)
}
export default UpdateEventPage;