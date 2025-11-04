import './App.css'
function LoginBtn({setPage}) {
    function handleClick() {
        console.log("Click login button");
        setPage();
    }
    return (
        <>
            <button className="topBtn" onClick={handleClick}>login</button>
        </>
    )
}
export default LoginBtn