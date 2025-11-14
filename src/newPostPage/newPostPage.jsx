import { pages } from '../Pages';

function NewPostPage({id, setPage}) {
    function onButtonClick() {
        //do post request to reach main clubs page
        setPage(pages.mainPage);
    }
    return (<>
        <input id="title" placeholder="title"></input><br/><br/>
        <textarea id="body" placeholder="body"></textarea><br/><br/>
        <button id="submit" onClick={onButtonClick}>submit</button>
    </>)
}
export default NewPostPage;