import { BrowserRouter, Route, Routes } from "react-router-dom";
import Contact from "./pages/Contact";
import Explore from "./pages/Explore";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import Navbar from "./components/layout/Navbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from "./components/PrivateRoute";


function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Explore/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/sign-up" element={<SignUp/>}/>
        <Route path="/profile" element={<PrivateRoute/>}>
         <Route path="/profile" element={<Profile/>}/>
        </Route>
        <Route path="/sign-in" element={<SignIn/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
      </Routes>    
      <Navbar />
    </BrowserRouter>
    <ToastContainer />
    </>
  );
}

export default App;
