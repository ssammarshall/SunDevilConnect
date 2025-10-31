import UpcomingEventsBtn from './UpcomingEventsBtn.jsx'
import ClubSearchBtn from './ClubSearchBtn.jsx'
function MainScreen({setClubSearchPage, setUpcomingEventsPage}) {
  return (
    <>
      <UpcomingEventsBtn setPage={setUpcomingEventsPage}></UpcomingEventsBtn>
      <ClubSearchBtn setPage={setClubSearchPage}></ClubSearchBtn>
    </>
  )
}

export default MainScreen
