import { pages } from '../Pages';
import { authenticate } from '../utils';

function NewEventPage({id, setPage}) {
    function submitButton() {
        let body = {};
        body.name = document.getElementById("name").value;
        body.date = document.getElementById("date").value;
        body.location = document.getElementById("location").value;
        body.is_paid_event = document.getElementById("isPaid").checked;
        body.max_num_of_attendees = parseInt(document.getElementById("maxAttendees").value);
        body.category = document.getElementById("category").value || "SOCIAL";
        body.club = id;

        if (!body.name || !body.date || !body.location || !body.max_num_of_attendees) {
            console.log("Please fill in all required fields");
            return;
        }

        authenticate().then((data) => {
            if (!data.access) {
                console.log("No access token returned from refresh");
                return;
            }
            fetch(process.env.REACT_APP_API_URL + "/connect/clubs/"+id+"/events/?format=json", {
                method: "POST",
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
                console.log("Event created successfully:", data);
                setPage(pages.mainPage);
            })
            .catch(function (error) {
                console.log("error: " + error);
            });
        });
    }
    return (<>
        <input id="name" placeholder="name of the event"></input><br/><br/>
        <input id="date" type="datetime-local"></input><br/><br/>
        <input id="location" placeholder="location of the event"></input><br/><br/>
        Is this event paid?: <input id="isPaid" type="checkbox"></input><br/><br/>
        <input id="maxAttendees" type="number" placeholder="number of attendees"></input><br/><br/>
        <label htmlFor="category">Category: </label>
        <select id="category">
            <option value="SOCIAL">Social</option>
            <option value="SPORTS">Sports</option>
            <option value="ACADEMIC">Academic</option>
            <option value="FUNDRAISING">Fundraising</option>
            <option value="NETWORKING">Networking</option>
        </select><br/><br/>
        <button onClick={submitButton}>Submit!</button>
    </>)
}
export default NewEventPage;