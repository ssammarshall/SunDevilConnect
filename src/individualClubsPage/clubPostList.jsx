import ClubPostEntry from "./clubPostEntry";
function ClubPostList({posts, role}) {
    console.log(posts);
    if (posts==null) {
        return (<p>This club has not posted anything yet</p>);
    }
    return (<ul>{
        posts.map((item) => (
            <li key={item.id}><ClubPostEntry role={role} post={item}></ClubPostEntry></li>)
        )
    }</ul>);
}

export default ClubPostList;