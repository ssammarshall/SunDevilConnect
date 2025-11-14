import ClubEntry from "./clubEntry";
function ClubsList({clubs, role, setPage, setId, clubMemberships, setClubMemberships}) {
    //console.log("loading clubs list");
    //console.log(clubs);
    if (clubs==null) {
        return (<p>There are no clubs in the database</p>);
    }
    return (<ul>{
        clubs.map((item) => (
            <li key={item.id}><ClubEntry clubMemberships={clubMemberships} setClubMemberships={(membership)=>setClubMemberships(membership)} setId={(id)=>setId(id)} setPage={(page)=>setPage(page)} role={role} club={item}></ClubEntry></li>)
        )
    }</ul>);
}

export default ClubsList;