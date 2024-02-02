import { Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Signin from "./pages/Signin";
import SendMoney from "./pages/SendMoney";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import UserDetails from "./pages/UserDetails";

function App() {
  return (
    <div className='w-full min-h-screen'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/send' element={<SendMoney />} />
        <Route path='/account' element={<UserDetails />} />
      </Routes>
    </div>
  );
}

export default App;
