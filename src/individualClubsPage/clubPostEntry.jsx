import { roles } from "../roles";
import { pages } from "../Pages";
function ClubPostEntry({post, role, setPage, setId, clubId}) {
    function editBtn() {
        setId(post.id);
        setPage(pages.editPostPage);
    }
    function flagBtn() {
        let body = {};
        fetch(process.env.REACT_APP_API_URL+"/connect/clubs/"+clubId+"/content/"+post.id+"/flag/?format=json",{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        }).then(response=> {
            let json = response.json();
            return json;
        }).then(function(data) {
            console.log(data);
        }).catch(error=> {
            console.log("Error: "+error);
        });
    }
    //different return values based on the role
    switch (role) {
        case roles.admin:
            return (<>
                <span>
                    <h3>{post.title}</h3>
                    {post.body}
                </span><br/>
                <button onClick={editBtn}>Edit post</button>
                <button onClick={flagBtn}>Flag post (CANNOT BE UNDONE)</button>
            </>)
        default: 
            return (
            <>
                <span>
                    <h3>{post.title}</h3>
                    {post.body}
                </span><br/>
                <button onClick={flagBtn}>Flag post (CANNOT BE UNDONE)</button>
            </>
            )
    }
    
}
export default ClubPostEntry;