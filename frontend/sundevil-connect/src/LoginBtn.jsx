import './App.css'
function LoginBtn() {
    function handleClick() {
        console.log("Click login button");
    }
    return (
        <>
            <button className="topBtn" onClick={handleClick}>login</button>
        </>
    )
}
export default LoginBtn