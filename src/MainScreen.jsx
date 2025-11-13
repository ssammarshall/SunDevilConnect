import UpcomingEventsBtn from './UpcomingEventsBtn.jsx'
import ClubSearchBtn from './ClubSearchBtn.jsx'
import AdminPanelButton from './AdminPanelButton.jsx'
function MainScreen({setPage, role}) {
  return (
    <>
      <UpcomingEventsBtn setPage={()=>setPage("UpcomingEventsPage")}></UpcomingEventsBtn>
      <ClubSearchBtn setPage={()=>setPage("ClubSearchPage")}></ClubSearchBtn>
      {role=="admin"?<AdminPanelButton role={role}></AdminPanelButton>:<></>}
    </>
  )
}

export default MainScreen
