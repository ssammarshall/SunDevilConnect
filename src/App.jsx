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

function App() {
  const [activePage, setActivePage] = useState(pages.mainPage);
  const [activeRole, setActiveRole] = useState(roles.unknown);
  const [id, setId] = useState(-1);
  
  //set up the page
  let topButtons = (<div>
    {activePage!==pages.loginPage?<LoginBtn setPage={(page) => setActivePage(page)} role={activeRole}></LoginBtn>:<></>}
    {activePage!==pages.mainPage?<MainPageBtn setPage={()=>setActivePage(pages.mainPage)}></MainPageBtn>:<></>}
  </div>);
  let page;
  switch(activePage) {
    case pages.loginPage:
      page=<LoginPage setPage={(page)=>setActivePage(page)} setRole={(role) => setActiveRole(role)}></LoginPage>;
      break;
    case pages.clubsPage:
      page=<ClubsScreen role={activeRole}></ClubsScreen>;
      break;
    case pages.eventsPage:
      page=<EventsScreen role={activeRole}></EventsScreen>;
      break;
    case pages.newUserPage:
      page=<NewUserPage setRole={(role) => setActiveRole(role)} setPage={(page)=>setActivePage(page)}></NewUserPage>;
      break;
    case pages.profilePage:
      page=<ProfilePage role={activeRole}></ProfilePage>;
      break;
    default:
      page=<MainScreen setPage={(page) => setActivePage(page)} role={activeRole}></MainScreen>;
  }
  return (<>
    {topButtons}
    {page}
  </>)
}

export default App
