import { useState, useEffect } from "react";
import { authenticate } from "../utils";
function ProfilePage({ role }) {
  //console.log("Profile Screen");
  //let isLoading = true;
  const [isLoading, setIsLoading] = useState(true);
    if (isLoading) {

    authenticate().then((data) => {
        console.log("Token=");
        console.log(data);
        //use the new token to access the profile
        if (!data.access) {
          console.log("No access token returned from refresh");
          return;
        }

        //use the new token to access the profile
        fetch(process.env.REACT_APP_API_URL + "/auth/users/me/?format=json", {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "JWT " + data.access,
          },
        })
          //after fetching the token, print it out
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
  }

  if (isLoading) {
    return <div className='loadPage'>Loading...</div>;
  }

  return <></>;
}

export default ProfilePage;
