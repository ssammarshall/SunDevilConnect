import { useState } from 'react'

function ProfilePage({role}) {
    //console.log("Profile Screen");
    //let isLoading = true;
    const [isLoading, setIsLoading] = useState(true);
    if (isLoading) {
        let me = fetch(process.env.REACT_APP_API_URL+"/auth/users/me/?format=json",{
            headers:{"access":sessionStorage.getItem("access")}
        }).then((resp)=>{
            console.log(resp);
            return resp.json();
        }).then(function(data) {
            setIsLoading(false);
            console.log(data);
        }).catch(function(error) {
            console.log("error: "+error);
        });
    }
    console.log(isLoading);
    if (isLoading) {
        return (<div>Loading...</div>)
    }

    return (<>

    </>)
}

export default ProfilePage;