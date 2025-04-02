import { Route, Routes } from 'react-router-dom'
import Navbar from './Components/Navbar'
import HomePage from './Pages/HomePage'
import LoginPage from './Pages/LoginPage'
import SettingPage from './Pages/SettingPage'
import SignUpPage from './Pages/SignUpPage'
import ProfilePage from './Pages/ProfilePage'
function App() {
  return (
    <>
      <Navbar />
      <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/signup' element={<SignUpPage/>} />
          <Route path='/setting' element={<SettingPage/>} />
          <Route path='/profile' element={<ProfilePage/>} />
      </Routes>
    </>
  )
}

export default App
