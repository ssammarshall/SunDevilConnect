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

function App() {
  const [activePage, setActivePage] = useState("mainPage");
  const [activeRole, setActiveRole] = useState("not logged in");
  return (
    <>
      {activePage!=="login"?<LoginBtn setPage={()=>setActivePage("login")}></LoginBtn>:<></>}
      {activePage!=="mainPage"?<MainPageBtn setPage={()=>setActivePage("mainPage")}></MainPageBtn>:<></>}
      {
        activePage==="mainPage"?<MainScreen setPage={(page) => setActivePage(page)} role={activeRole}></MainScreen>:
        (activePage==="login"?<LoginPage setPage={(page)=>setActivePage(page)} setRole={(role) => setActiveRole(role)}></LoginPage>:
        (activePage==="ClubSearchPage"?<ClubsScreen></ClubsScreen>:
        (activePage==="UpcomingEventsPage"?<EventsScreen></EventsScreen>:
        (activePage==="newUserPage"?<NewUserPage setRole={(role) => setActiveRole(role)} setPage={(page)=>setActivePage(page)}></NewUserPage>
          :(<></>)))))
      }
    </>
  )
}

export default App
