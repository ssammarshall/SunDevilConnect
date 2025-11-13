import ClubEntry from "./clubEntry";
function ClubsList({clubs, role}) {
    //console.log("loading clubs list");
    //console.log(clubs);
    if (clubs==null) {
        return (<p>There are no clubs in the database</p>);
    }
    return (<ul>{
        clubs.map((item) => (
            <li key={item.name}><ClubEntry role={role} club={item}></ClubEntry></li>)
        )
    }</ul>);
}

export default ClubsList;