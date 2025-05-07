import { Routes, Route} from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

import NavBar from "./components/NavBar";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Footer from "./components/Footer";
import Services from "./pages/Services";
import Booking from "./pages/Booking";
import Payment from "./pages/Payment";
import MenuPage from "./pages/Menu";
function App() {
  return (
    <div className="min-h-screen bg-BG flex flex-col justify-between">
 
    <NavBar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/book" element={<Booking />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/menu" element={<MenuPage />} />       
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Register" element={<Register/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/services" element={<Services/>} />
        <Route path="/payment" element={<Payment/>} />
      </Routes>
      <Footer/>
     
    </div>
  );
}

export default App;
