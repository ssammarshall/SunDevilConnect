import { pages } from "../Pages";
import { roles } from "../roles";

function LoginPage({setRole, setPage, setClubMemberships}) {
    function onButtonClick() {
        console.log("Logging in");
        let body = {};
        body.username = document.getElementById("username").value;
        body.password = document.getElementById("password").value;
        //console.log(body);
        fetch(process.env.REACT_APP_API_URL+"/auth/jwt/create/",{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        }).then(response=> {
            if (response.status>=400) {
                console.log("Invalid user");
                return {access:"invalid user"};
            } else {
                console.log("Valid user");
                let json = response.json();
                return json;
            }
        }).then(function(data) {
            console.log(data);
            if (data.access!="invalid user") {
                sessionStorage.setItem("refresh",data.refresh);
                sessionStorage.setItem("access", data.access);
                setClubMemberships(data.user.memberships);
                if (data.is_admin) {
                    setRole(roles.admin);
                } else {
                    setRole(roles.user);
                }
                setPage(pages.mainPage);
            }
        }).catch(error=> {
            console.log("Error: "+error);
        });
    }

    function newUserClick() {
        setPage(pages.newUserPage);
    }
    return (
        <>
            <input id="username" placeholder="username"></input><br/><br/>
            <input type="password" id="password" placeholder="password"></input><br/><br/>
            <button id="login" onClick={onButtonClick}>login</button>
            <button id="new user" onClick={newUserClick}>new user</button>
        </>
    );
}
export default LoginPage