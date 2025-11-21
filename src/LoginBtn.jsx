import './App.css'
import { pages } from './Pages';
import { roles } from './roles';
function LoginBtn({setPage, role}) {
    function login() {
        console.log("Click login button");
        setPage(pages.loginPage);
    }

    function profile() {
        console.log("Click profile button");
        setPage(pages.profilePage);
    }

    if (role==roles.unknown) {
        return (
            <>
                <button className="topBtn" onClick={login}>login</button>
            </>
        )
    } else {
        return (
            <>
                {/*
                <button className="topBtn" onClick={profile}>My profile</button>
                */}
            </>
        )
    }
}
export default LoginBtn