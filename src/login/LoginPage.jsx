function LoginPage({setRole}) {
    function onButtonClick() {
        console.log("Logging in");
        let body = {};
        body.username = document.getElementById("username").value;
        body.password = document.getElementById("password").value;
        //console.log(body);
        fetch(process.env.REACT_APP_API_URL+"/auth/jwt/create",{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        }).then(response=> {
            if (response.status==401) {
                console.log("Invalid user");
            } else {
                console.log("Valid user");
                setRole("logged in");
            }
        }).catch(error=> {
            console.log("Error: "+error);
        });
    }
    return (
        <>
            <input id="username"></input><br/><br/>
            <input type="password" id="password"></input><br/><br/>
            <button id="login" onClick={onButtonClick}>login</button>
        </>
    );
}
export default LoginPage