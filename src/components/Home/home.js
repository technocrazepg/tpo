import { React, useState, useContext } from "react";
import Header from "./header";
import AboutUs from "./aboutUs";
import Footer from "./footer";
import "./home.css";

function Home() {
  const [clickForLogin, setClickForLogin] = useState(false);
  return (
    <div>
      <Header setClickForLogin={setClickForLogin} />
      <AboutUs />
      <Footer />
    </div>
  );
}

export default Home;
