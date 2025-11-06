import { constants } from "./constants";
function UpcomingEventsBtn({setPage}) {
    function handleClick() {
        console.log("Click upcoming events button");
        let events = fetch(constants.backendURL+"/connect/events/?format=json").then((resp)=>{
            return resp.json();
        }).then(function(data) {
            console.log(data);
        }).catch(function(error) {
            console.log("error: "+error);
        });
        setPage();
    }
    return (
        <>
            <button onClick={handleClick}>Upcoming</button>
        </>
    )
}
export default UpcomingEventsBtn