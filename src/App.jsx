import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import ListingDetail from "./pages/ListingDetail";
import Cart from "./pages/Cart";
import VendorDashboard from "./pages/VendorDashboard";
import CreateListing from './pages/CreateListing';
import EditListing from './pages/EditListing';
import Profile from './pages/Profile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/listings/:id" element={<ListingDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/dashboard" element={<VendorDashboard />} />
        <Route path="/dashboard/create" element={<CreateListing />} />
        <Route path="/dashboard/edit/:id" element={<EditListing />} />
        <Route path="/profile" element={<Profile />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App;