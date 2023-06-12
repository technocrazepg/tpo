import React, { useState , useContext} from "react";
import Navbar from "./navbar/navbar";
import Dashboard from "../dashboard/dashboard";
import Profile from "../profile/profile";
import Stats from "../stats/stats";
import ContactUs from "../contactUs/contactUs";
import AuthContext from "../../context/auth/authcontext";
import { Link } from "react-router-dom";

export default function UserAccount(props) {
  const [dashboard, setDashboard] = useState(true);
  const [stats, setStats] = useState(false);
  const [credits, setCredits] = useState(false);
  const [profile, setProfile] = useState(false);
  const sidePage = () => {
    if (dashboard) return <Dashboard />;
    else if (stats) return <Stats />;
    else if (credits) return <ContactUs />;
    else if(profile) return <Profile />
  };
  const auth = useContext(AuthContext);
  return (
    <>
      <div className="userAccount d-flex">
        {auth.authToken ? (
          <div className="d-flex w-100 ">
            <Navbar
              dashboard={dashboard}
              setDashboard={setDashboard}
              stats={stats}
              setStats={setStats}
              credits={credits}
              setCredits={setCredits}
              profile={profile}
              setProfile={setProfile}
            />
            {sidePage()}
          </div>
        ) : (
          <h1>Please Login <Link to="/login">here</Link> First !!</h1>
        )}
      </div>
    </>
  );
}
