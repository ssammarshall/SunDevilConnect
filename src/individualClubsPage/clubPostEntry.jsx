import { roles } from "../roles";
function ClubPostEntry({post, role}) {
    //different return values based on the role
    switch (role) {
        case roles.admin:
            return (
                <span>
                    <h1>{post.title}</h1>
                    {post.body}
                </span>
            )
        default: 
            return (
            <>
                {post.title + ", " + post.body}
            </>
            )
    }
    
}
export default ClubPostEntry;