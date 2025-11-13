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
  //There is likely a way to refactor this that is much better
  return (
    <>
      {activePage!==pages.loginPage?<LoginBtn setPage={(page) => setActivePage(page)} role={activeRole}></LoginBtn>:<></>}
      {activePage!==pages.mainPage?<MainPageBtn setPage={()=>setActivePage(pages.mainPage)}></MainPageBtn>:<></>}
      {
        activePage===pages.mainPage?<MainScreen setPage={(page) => setActivePage(page)} role={activeRole}></MainScreen>:
        (activePage===pages.loginPage?<LoginPage setPage={(page)=>setActivePage(page)} setRole={(role) => setActiveRole(role)}></LoginPage>:
        (activePage===pages.clubsPage?<ClubsScreen role={activeRole}></ClubsScreen>:
        (activePage===pages.eventsPage?<EventsScreen role={activeRole}></EventsScreen>:
        (activePage===pages.newUserPage?<NewUserPage setRole={(role) => setActiveRole(role)} setPage={(page)=>setActivePage(page)}></NewUserPage>:
        (activePage===pages.profilePage?<ProfilePage role={activeRole}></ProfilePage>:
          (<></>))))))
      }
    </>
  )
}

export default App
