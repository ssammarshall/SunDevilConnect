import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import LoginBtn from './LoginBtn.jsx'
import LoginPage from './login/LoginPage.jsx'
import MainPageBtn from './MainPageBtn.jsx'
import { pages } from './Pages.js'
import { roles } from './roles.js'

import './App.css'
import MainScreen from './MainScreen.jsx'
import ClubsScreen from './clubsPage/clubsScreen.jsx'
import EventsScreen from './eventsPage/eventsScreen.jsx'
import NewUserPage from './login/newUserPage.jsx'
import ProfilePage from './profile/ProfilePage.jsx'
import PageDoesNotExist from './pageDoesNotExist.jsx'
import IndividualClubPage from './individualClubsPage/individualClubPage.jsx'
import IndividualEventPage from './individualEventsPage/individualEventPage.jsx'
import UpdateEventPage from './newEventPage/updateEventPage.jsx'
import UpdatePostPage from './newPostPage/updatePostPage.jsx'
import NewEventPage from './newEventPage/newEventPage.jsx'
import NewPostPage from './newPostPage/newPostPage.jsx'

function App() {
  const [activePage, setActivePage] = useState(pages.mainPage);
  const [activeRole, setActiveRole] = useState(roles.unknown);
  const [id, setId] = useState(-1);
  const [clubMemberships, setClubMemberships] = useState({});
  const [postId, setPostId] = useState(-1);

  //set up the page
  let topButtons = (<div>
    {(activePage!==pages.loginPage&&activePage!==pages.profilePage)?<LoginBtn setPage={(page) => setActivePage(page)} role={activeRole}></LoginBtn>:<></>}
    {activePage!==pages.mainPage?<MainPageBtn setPage={()=>setActivePage(pages.mainPage)}></MainPageBtn>:<></>}
  </div>);
  let page;
  switch(activePage) {
    case pages.mainPage:
      page=<MainScreen setPage={(page) => setActivePage(page)} role={activeRole}></MainScreen>;
      break;
    case pages.loginPage:
      page=<LoginPage setClubMemberships={(membership)=>setClubMemberships(membership)} setPage={(page)=>setActivePage(page)} setRole={(role) => setActiveRole(role)}></LoginPage>;
      break;
    case pages.clubsPage:
      page=<ClubsScreen clubMemberships={clubMemberships} setClubMemberships={(membership)=>setClubMemberships(membership)} setPage={(page)=>setActivePage(page)} role={activeRole} setId={(id)=>setId(id)}></ClubsScreen>;
      break;
    case pages.eventsPage:
      page=<EventsScreen setPage={(page)=>setActivePage(page)} setId={(id)=>setId(id)} role={activeRole}></EventsScreen>;
      break;
    case pages.newUserPage:
      page=<NewUserPage setRole={(role) => setActiveRole(role)} setPage={(page)=>setActivePage(page)}></NewUserPage>;
      break;
    case pages.specificClubPage:
      page=<IndividualClubPage setEventId={(id)=>setId(id)} setPostId={(id)=>setPostId(id)} setPage={(page)=>setActivePage(page)} clubMemberships={clubMemberships} role={activeRole} id={id}></IndividualClubPage>
      break;
    case pages.specificEventPage:
      page=<IndividualEventPage role={activeRole} id={id}></IndividualEventPage>
      break;
    case pages.editEventPage:
      page=<UpdateEventPage id={id} setPage={(page)=>setActivePage(page)}></UpdateEventPage>;
      break;
    case pages.editPostPage:
      page=<UpdatePostPage clubId={id} postId={postId} setPage={(page)=>setActivePage(page)}></UpdatePostPage>;
      break;
    case pages.newEventPage:
      page=<NewEventPage id={id} setPage={(page)=>setActivePage(page)}></NewEventPage>;
      break;
    case pages.newPostPage:
      page=<NewPostPage id={id} setPage={(page)=>setActivePage(page)}></NewPostPage>
      break;
    case pages.profilePage:
      page=<ProfilePage role={activeRole}></ProfilePage>;
      break;
    default:
      page=<PageDoesNotExist></PageDoesNotExist>;
  }
  return (<>
    {topButtons}
    {page}
  </>)
}

export default App
