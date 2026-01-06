import "./App.css";
import Footer from "./components/CommanComponents/Footer";
import Navbar from "./components/CommanComponents/Navbar";
import AllDoctors from "./pages/AllDoctors";
// import BookAppointment from './pages/BookAppointment';
import Home from "./pages/Home";
import { Routes, Route, useNavigate } from "react-router-dom";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import DoctorProfile from "./components/DoctorDashboardLinks/DoctorProfile";
import BedOccupancy from "./components/CommanComponents/BedChecking";
import BedDetails from "./components/CommanComponents/BedDetails";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { authActions } from "./store/auth";
import toast, { Toaster } from "react-hot-toast";
import PatientDashboard from "./pages/PatientsDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";

import GoogleTranslate from "./components/GoogleTranslate/GoogleTranslate";

import ForgetPassword from "./components/CommanComponents/forgetPassword";
import ResetPassword from "./components/CommanComponents/resetPassword";
import LanguageSelector from "./components/GoogleTranslate/languageSelector";
import RoomPage from "./pages/VideoRoom";
import LobbyScreen from "./pages/VideoCallLobby";
import { ActiveSectionProvider } from "./context/ActiveSectionContext";
import { jwtDecode } from "jwt-decode";
function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      const decoded = jwtDecode(token); // decode token
      const isExpired = decoded.exp * 1000 < Date.now();

      if (isExpired) {
        toast.error("Token expired. Please sign in again.");
        dispatch(authActions.logout());
        localStorage.clear(); // clear all stored user data
        navigate("/LogIn");
      } else {
        dispatch(authActions.login());
      }
    } catch (err) {
      console.error("Invalid token:", err);
      toast.error("Invalid token. Please sign in again.");
      dispatch(authActions.logout());
      localStorage.clear();
      navigate("/LogIn");
    }
  }
}, [dispatch, navigate]);


  return (
    <div className="">
      <Toaster />
      <GoogleTranslate />
      <ActiveSectionProvider>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/all-doctors" element={<AllDoctors />} />

          {/* <Route path="/book-appointment" element={<BookAppointment />} /> */}
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/check-bed-availability" element={<BedOccupancy />} />
          <Route
            path="/view-bed-details/:roomId/:bedId"
            element={<BedDetails />}
          />
          <Route path="/view-doctor-details/:id" element={<DoctorProfile />} />

          <Route path="/patient-dashboard" element={<PatientDashboard />} />
          <Route path="/video-call/:roomId" element={<RoomPage />} />
          <Route path="/video-call-lobby/:roomId" element={<LobbyScreen />} />

          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/forgot-password" element={<ForgetPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          <Route path="/LogIn" element={<LogIn />} />
        </Routes>
        <Footer />
      </ActiveSectionProvider>
    </div>
  );
}

export default App;
