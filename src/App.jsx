import LoginPage from './Pages/Auth/LoginPage'
import RegisterPage from './Pages/Auth/RegisterPage'
import VerifyOtpPage from './Pages/Auth/VerifyOtp'
import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
function App() {

  return (
       <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path='/verify-otp' element={<VerifyOtpPage/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
