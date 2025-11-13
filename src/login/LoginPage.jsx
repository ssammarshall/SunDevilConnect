function LoginPage({setRole, setPage}) {
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
            if (response.status==401) {
                console.log("Invalid user");
                return {access:"invalid user"};
            } else {
                console.log("Valid user");
                let json = response.json();
                return json;
            }
        }).then(function(data) {
            console.log(data);
            if (access!="invalid user") {
                sessionStorage.setItem("refresh",data.refresh);
                sessionStorage.setItem("access", data.access);
                setRole("logged in");
                setPage("mainPage");
            }
        }).catch(error=> {
            console.log("Error: "+error);
        });
    }

    function newUserClick() {
        setPage('newUserPage');
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