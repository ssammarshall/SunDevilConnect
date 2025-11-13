import './App.css'
function AdminPanelButton({role}) {
    function handleClick() {
        console.log("Click admin panel button");
        if (role=="admin") {
            window.location.href=process.env.REACT_APP_API_URL+"/admin";
        }
    }
    return (
        <>
            <button onClick={handleClick}>Admin panel</button>
        </>
    )
}
export default AdminPanelButton