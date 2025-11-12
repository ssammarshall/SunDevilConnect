function ClubSearchBtn({setPage}) {
    let clubList = {};
    function handleClick() {
        console.log("Click club search button");
        /*let clubs = fetch(constants.backendURL+"/connect/clubs/?format=json").then((resp)=>{
            window.resp=resp;
            //console.log("Response: ");
            //console.log(resp);
            //return resp;
            clubList = resp.json();
            return clubList;
        }).then(function(data) {
            console.log(data);
        }).catch(function(error) {
            console.log("error: "+error);
        });*/
        setPage();
    }
    return (
        <>
            <button onClick={handleClick}>Clubs</button>
        </>
    )
}
export default ClubSearchBtn