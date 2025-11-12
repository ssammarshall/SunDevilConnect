function NewUserPage({setRole, setPage}) {
    function onButtonClick() {
        console.log("Logging in");
        let body = {};
        body.username = document.getElementById("username").value;
        body.password = document.getElementById("password").value;
        body.first_name = document.getElementById("firstName").value;
        body.last_name = document.getElementById("lastName").value;
        body.email = document.getElementById("email").value;

        //console.log(body);
        fetch(process.env.REACT_APP_API_URL+"/auth/users",{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        }).then(response=> {
            if (response.status>=400) {
                console.log("Error! Invalid user");
            } else {
                console.log("Valid user");
                let json = response.json();
                return json;
            }
        }).then(function(data) {
            console.log(data);
            //sessionStorage.setItem("refresh",data.refresh);
            //sessionStorage.setItem("access", data.access);
            setRole("logged in");
        }).catch(error=> {
            console.log("Error: "+error);
        });
    }

    return (<>
        <input id="username" placeholder="username"></input><br/><br/>
        <input type="password" id="password" placeholder="password"></input><br/><br/>
        <input id="firstName" placeholder="first name"></input><br/><br/>
        <input id="lastName" placeholder="last name"></input><br/><br/>
        <input id="email" placeholder="email"></input><br/><br/>

        <button id="createUser" onClick={onButtonClick}>create user</button>
    </>)
}
export default NewUserPage