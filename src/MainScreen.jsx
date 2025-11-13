import UpcomingEventsBtn from './UpcomingEventsBtn.jsx'
import ClubSearchBtn from './ClubSearchBtn.jsx'
import AdminPanelButton from './AdminPanelButton.jsx'
import { pages } from './Pages.js'
function MainScreen({setPage, role}) {
  return (
    <>
      <UpcomingEventsBtn setPage={()=>setPage(pages.eventsPage)}></UpcomingEventsBtn>
      <ClubSearchBtn setPage={()=>setPage(pages.clubsPage)}></ClubSearchBtn>
      {role=="admin"?<AdminPanelButton role={role}></AdminPanelButton>:<></>}
    </>
  )
}

export default MainScreen
