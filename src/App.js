import "./styles.css";
import Login from "./components/login/login";
import Home from "./components/Home/home";
import UserAccount from "./components/userAccount/userAccount";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import AuthState from "./context/auth/authstate";

export default function App() {
  return (
    <Router>
      <div className="App">
        <AuthState>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/user" element={<UserAccount />} />
        </Routes>
        </AuthState>       
      </div>
    </Router>
  )
}
