import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import LoginBtn from './LoginBtn.jsx'
import LoginPage from './login/LoginPage.jsx'
import MainPageBtn from './MainPageBtn.jsx'

import './App.css'
import MainScreen from './MainScreen.jsx'
import ClubsScreen from './clubsPage/clubsScreen.jsx'
import EventsScreen from './eventsPage/eventsScreen.jsx'
import NewUserPage from './login/newUserPage.jsx'
import ProfilePage from './profile/ProfilePage.jsx'

function App() {
  const [activePage, setActivePage] = useState("mainPage");
  const [activeRole, setActiveRole] = useState("not logged in");

  //There is likely a way to refactor this that is much better
  return (
    <>
      {activePage!=="login"?<LoginBtn setPage={(page) => setActivePage(page)} role={activeRole}></LoginBtn>:<></>}
      {activePage!=="mainPage"?<MainPageBtn setPage={()=>setActivePage("mainPage")}></MainPageBtn>:<></>}
      {
        activePage==="mainPage"?<MainScreen setPage={(page) => setActivePage(page)} role={activeRole}></MainScreen>:
        (activePage==="login"?<LoginPage setPage={(page)=>setActivePage(page)} setRole={(role) => setActiveRole(role)}></LoginPage>:
        (activePage==="ClubSearchPage"?<ClubsScreen role={activeRole}></ClubsScreen>:
        (activePage==="UpcomingEventsPage"?<EventsScreen role={activeRole}></EventsScreen>:
        (activePage==="newUserPage"?<NewUserPage setRole={(role) => setActiveRole(role)} setPage={(page)=>setActivePage(page)}></NewUserPage>:
        (activePage==="profile"?<ProfilePage role={activeRole}></ProfilePage>:
          (<></>))))))
      }
    </>
  )
}

export default App
