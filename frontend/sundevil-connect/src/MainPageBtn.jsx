import './App.css'
function MainPageBtn({setPage}) {
    function handleClick() {
        console.log("Click main page button");
        setPage();
    }
    return (
        <>
            <button className="topLeftBtn" onClick={handleClick}>Main</button>
        </>
    )
}
export default MainPageBtn