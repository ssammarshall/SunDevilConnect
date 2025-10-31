import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import LoginBtn from './loginBtn'


import './App.css'
import MainScreen from './MainScreen.jsx'

function App() {
  return (
    <>
      <LoginBtn></LoginBtn>
      <MainScreen></MainScreen>
    </>
  )
}

export default App
