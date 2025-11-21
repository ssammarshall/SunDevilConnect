import { pages } from '../Pages';
import { authenticate } from '../utils';

function NewPostPage({id, setPage}) {
    function onButtonClick() {
        let body={};
        body.title=document.getElementById("title").value;
        body.body=document.getElementById("body").value;
        authenticate().then((data) => {
            if (!data.access) {
                console.log("No access token returned from refresh");
                return;
            }
            //use the new token to access what you want
            fetch(process.env.REACT_APP_API_URL + "/connect/clubs/"+id+"/content/?format=json", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: "JWT " + data.access,
                },
                body: JSON.stringify(body)
            })
            //after fetching the data, print it out
            .then((resp) => {
                //console.log(resp);
                return resp.json();
            })
            .then(function (data) {
                console.log(data);
            })
            .catch(function (error) {
                console.log("error: " + error);
            });
        });
        setPage(pages.mainPage);
    }
    return (<>
        <input id="title" placeholder="title"></input><br/><br/>
        <textarea id="body" placeholder="body"></textarea><br/><br/>
        <button id="submit" onClick={onButtonClick}>submit</button>
    </>)
}
export default NewPostPage;