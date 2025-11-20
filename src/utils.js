//contains utility functions
//it is much easier to have a universal authentication function
export function authenticate() {
    if (!sessionStorage.getItem("refresh")) {
      console.log("No refresh token found.");
      return;
    }
    //get access token
    let token;
    //fetch a new token
    return fetch(process.env.REACT_APP_API_URL + "/auth/jwt/refresh/?format=json", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh: sessionStorage.getItem("refresh") }),
    }).then((resp) => {
        return resp.json();
    });
}
//usage: 
/*
authenticate().then((data) => {
    if (!data.access) {
        console.log("No access token returned from refresh");
        return;
    }

    //use the new token to access what you want
    fetch(process.env.REACT_APP_API_URL + "/auth/users/me/?format=json", {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "JWT " + data.access,
        },
    })
    //after fetching the data, print it out
    .then((resp) => {
        //console.log(resp);
        return resp.json();
    })
    .then(function (data) {
        setIsLoading(false);
        console.log(data);
    })
    .catch(function (error) {
        console.log("error: " + error);
    });
});
*/