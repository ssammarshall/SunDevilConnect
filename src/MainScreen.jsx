import UpcomingEventsBtn from './UpcomingEventsBtn.jsx'
import ClubSearchBtn from './ClubSearchBtn.jsx'
import AdminPanelButton from './AdminPanelButton.jsx'
import { roles } from './roles.js'
import { pages } from './Pages.js'
function MainScreen({setPage, role}) {
  return (
    <>
      <UpcomingEventsBtn setPage={()=>setPage(pages.eventsPage)}></UpcomingEventsBtn>
      <ClubSearchBtn setPage={()=>setPage(pages.clubsPage)}></ClubSearchBtn>
      {role==roles.admin?<AdminPanelButton role={role}></AdminPanelButton>:<></>}
    </>
  )
}

export default MainScreen
