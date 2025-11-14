import { roles } from "../roles";
import { pages } from "../Pages";
function ClubPostEntry({post, role, setPage, setId}) {
    function editBtn() {
        setId(post.id);
        setPage(pages.editPostPage);
    }
    //different return values based on the role
    switch (role) {
        case roles.admin:
            return (<>
                <span>
                    <h1>{post.title}</h1>
                    {post.body}
                </span><br/>
                <button onClick={editBtn}>Edit post</button>
            </>)
        default: 
            return (
            <>
                <span>
                    <h1>{post.title}</h1>
                    {post.body}
                </span>
            </>
            )
    }
    
}
export default ClubPostEntry;