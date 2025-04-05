import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import SettingPage from './Pages/SettingPage';
import SignUpPage from './Pages/SignUpPage';
import ProfilePage from './Pages/ProfilePage';
import { useContext, useEffect } from 'react';
import { AuthContext } from './Hooks/useAuth';
import { Loader } from 'lucide-react';
import { Toaster } from 'react-hot-toast';

function App() {
  const { authUser, checkingAuth, isCheckingAuth } = useContext(AuthContext);

  useEffect(() => {
    checkingAuth();
  }, []); 

  if (isCheckingAuth) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader className="animate-spin" />
      </div>
    );
  }

  return (
    <>
        <div data-theme="coffee">
        <Navbar />
      <Toaster />
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/login" element={authUser ? <Navigate to="/" /> : <LoginPage />} />
        <Route path="/signup" element={authUser ? <Navigate to="/" /> : <SignUpPage />} />
        <Route path="/setting" element={authUser ? <SettingPage /> : <Navigate to="/login" />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>
        </div>
    </>
  );
}

export default App;
