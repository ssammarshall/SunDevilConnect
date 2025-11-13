import './App.css'
import { pages } from './Pages';
function LoginBtn({setPage, role}) {
    function login() {
        console.log("Click login button");
        setPage(pages.loginPage);
    }

    function profile() {
        console.log("Click profile button");
        setPage(pages.profilePage);
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