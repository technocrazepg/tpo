import React, { useState } from "react";
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import GoogleIcon from '@mui/icons-material/Google';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
function Footer() {
  return (
    <footer className="bg-dark text-center text-white" id="footer">
      <div className="container p-4">
        <section className=" d-flex">
          <div className="col-lg-4 container">
            <h3>Contact Us</h3>
            <email>
              Email : xyz@manit.ac.in,
            </email>
            <p>
              Phone : +123-456-789
            </p>
            <address>
              Address: Link Road Number 3, Near Kali Mata Mandir, Bhopal,
              Madhya Pradesh, India 462003
            </address>
          </div>
          <div className="col-lg-4 container mt-4">
            <h3>Stay Connected</h3>
            <section className="mb-4">
              <a className="m-2" href="#!" role="button" style={{ color: "white" }}
              ><FacebookOutlinedIcon /></a>

              <a className="m-2" href="#!" role="button" style={{ color: "white" }}
              ><TwitterIcon /></a>

              <a className="m-2" href="#!" role="button" style={{ color: "white" }}
              ><GoogleIcon /></a>

              <a className="m-2" href="#!" role="button" style={{ color: "white" }}
              ><InstagramIcon /></a>

              <a className="m-2" href="#!" role="button" style={{ color: "white" }}
              ><LinkedInIcon /></a>
            </section>
          </div>
        </section>
      </div>
      <div className="text-center p-3" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
        © 2022 Copyright
      </div>
    </footer>
  )
}

export default Footer;
