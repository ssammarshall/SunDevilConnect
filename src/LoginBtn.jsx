import './App.css'
function LoginBtn({setPage, role}) {
    function login() {
        console.log("Click login button");
        setPage("login");
    }

    function profile() {
        console.log("Click profile button");
        setPage("profile");
    }

    if (role=="not logged in") {
        return (
            <>
                <button className="topBtn" onClick={login}>login</button>
            </>
        )
    } else {
        return (
            <>
                <button className="topBtn" onClick={profile}>My profile</button>
            </>
        )
    }
}
export default LoginBtn