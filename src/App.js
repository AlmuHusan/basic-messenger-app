import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Route, Routes} from 'react-router-dom'
import Home from "./pages/Home"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Navbar from './components/Navbar';
import AuthProvider from './context/auth';
import PrivateRoute from './components/PrivateRoute'
import Profile from './pages/Profile';
function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route element={<PrivateRoute/>}>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/profile" element={<Profile/>}/>
        </Route>
        <Route exact path="/register" element={<Register/>}/>
        <Route exact path="/login" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
    </AuthProvider>

  );
}

export default App;
