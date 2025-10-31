import { constants } from "./constants";
function ClubSearchBtn() {
    function handleClick() {
        console.log("Click club search button");
        let clubs = fetch(constants.backendURL+"/connect/clubs/?format=json").then((resp)=>resp.json()).then(function(data) {
            console.log(data);
        }).catch(function(error) {
            console.log("error");
        });
    }
    return (
        <>
            <button onClick={handleClick}>Clubs</button>
        </>
    )
}
export default ClubSearchBtn