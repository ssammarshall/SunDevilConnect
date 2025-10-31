import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import LoginBtn from './loginBtn'
import LoginPage from './LoginPage.jsx'
import MainPageBtn from './MainPageBtn.jsx'

import './App.css'
import MainScreen from './MainScreen.jsx'

function App() {
  const [activePage, setActivePage] = useState("mainPage");
  let page = <><LoginBtn setPage={()=>setActivePage("login")}></LoginBtn></>;
  return (
    <>
      {activePage!=="login"?<LoginBtn setPage={()=>setActivePage("login")}></LoginBtn>:<></>}
      {activePage!=="mainPage"?<MainPageBtn setPage={()=>setActivePage("mainPage")}></MainPageBtn>:<></>}
      {
        activePage==="mainPage"?<MainScreen setPage={setActivePage}></MainScreen>:
        <LoginPage isActive={activePage==="login"}></LoginPage>
      }
    </>
  )
}

export default App
