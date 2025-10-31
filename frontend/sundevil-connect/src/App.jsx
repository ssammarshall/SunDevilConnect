import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import LoginBtn from './loginBtn'
import UpcomingEventsBtn from './UpcomingEventsBtn.jsx'
import ClubSearchBtn from './ClubSearchBtn.jsx'
import './App.css'

function App() {
  return (
    <>
      <LoginBtn></LoginBtn>
      <UpcomingEventsBtn></UpcomingEventsBtn>
      <ClubSearchBtn></ClubSearchBtn>
    </>
  )
}

export default App
