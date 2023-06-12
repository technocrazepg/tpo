import React, { useContext, useState } from "react";
import AuthContext from "../../context/auth/authcontext";
import './profile.css'
export default function Profile() {
  const auth = useContext(AuthContext);
  const [updateduser, setUpdatedUser] = useState({ fname: auth.data.fname, lname: auth.data.lname, email: auth.data.email, id: auth.data.id, phone: auth.data.phone, address: auth.data.address, course: auth.data.course, department: auth.data.department, year: auth.data.year, scholar: auth.data.scholar, })
  const onChange = (e) => {
    setUpdatedUser({ ...updateduser, [e.target.name]: e.target.value })
  }

  const [alertMsg, setAlertMsg] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [isError, setIsError] = useState(false);
  const [clickForEdit, setClickForEdit] = useState(false);
  const update = async (e) => {
    e.preventDefault(); //to prevent reloading.
    try {
      const response = await fetch('http://localhost:5000/auth/update', {
        method: 'PUT',
        credentials: "include",
        withCredentials: true,
        mode: "cors",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateduser)
      });
      const json = await response.json();
      if (json.errors) {
        setAlertMsg(json.errors[0].msg);
        setIsError(true);
      }
      else if (json.error) {
        setAlertMsg(json.error);
        setIsError(true);
      }
      else {
        setAlertMsg(json.msg);
        setIsError(false);
      }
      setClickForEdit(false);
      auth.setData(updateduser);
      setShowAlert(true);
    } catch (error) {
      console.log(error);
    }
  }
  let alertClass;
  const alerts = () => {
    if (isError)
      alertClass = "alert alert-danger";
    else
      alertClass = "alert alert-success";
    return (
      <div className={alertClass} role="alert">
        {alertMsg}<span style={{ cursor: "pointer", float: "right", fontSize: "23px" }} onClick={() => { setShowAlert(false) }}>&times;</span>
      </div>
    )
  }
  return (
    <>
      <div className="container rounded bg-white profile">
        {showAlert && alerts()}
        <div className="row">
          <div className="col-md-3 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5"><img className="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" /><span className="font-weight-bold">{auth.data.fname.toUpperCase()} {auth.data.lname.toUpperCase()}</span><span className="text-black-50">{auth.data.email}</span><span> </span></div>
          </div>
          <div className="col-md-5 border-right">
            <div className="p-3 py-5">
              <div className="mb-3">
                <h4 className="text-center">Profile Settings</h4>
              </div>
              <br />
              <div className="row mt-3">
                <div className="form-group row">
                  <label htmlFor="phone" className='col-sm-4 col-form-label font-weight-bold'><strong>Mobile</strong></label>
                  <div className="col-sm-8 d-flex">
                    <input id="phone" name="phone" onChange={onChange} type="text" className="form-control mb-3" placeholder="Phone number" value={updateduser.phone} disabled/>
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="address" className='col-sm-4 col-form-label font-weight-bold'><strong>Address</strong></label>
                  <div className="col-sm-8">
                    <input id="address" name="address" onChange={onChange} type="text" className="form-control mb-3" placeholder="Address line" value={updateduser.address} disabled/>
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="course" className='col-sm-4 col-form-label font-weight-bold;'><strong>Course</strong></label>
                  <div className="col-sm-8">
                    <input name="course" onChange={onChange} type="text" className="form-control mb-3" placeholder="Course" value={updateduser.course} readOnly style={{ backgroundColor: "transparent", cursor: "not-allowed" }} />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="department" className='col-sm-4 col-form-label font-weight-bold'><strong>Department</strong></label>
                  <div className="col-sm-8">
                    <input name="department" onChange={onChange} type="text" className="form-control mb-3" placeholder="Department" value={updateduser.department} readOnly style={{ backgroundColor: "transparent", cursor: "not-allowed" }} />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="year" className='col-sm-4 col-form-label font-weight-bold'><strong>Year</strong></label>
                  <div className="col-sm-8">
                    <input name="year" onChange={onChange} type="text" className="form-control mb-3" placeholder="Year" value={updateduser.year} readOnly style={{ backgroundColor: "transparent", cursor: "not-allowed" }} />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="scholar" className='col-sm-4 col-form-label font-weight-bold'><strong>Scholar Number</strong></label>
                  <div className="col-sm-8">
                    <input name="scholar" onChange={onChange} type="text" className="form-control mb-3" placeholder="Scholar No." value={updateduser.scholar} readOnly style={{ backgroundColor: "transparent", cursor: "not-allowed" }} />
                  </div>
                </div>
              </div>
              <div className="mt-5 text-center">
                {!clickForEdit ?
                  <button className="btn btn-primary profile-button w-25" type="button" onClick={()=>{
                    setClickForEdit(true);
                    document.getElementById("phone").removeAttribute("disabled");
                    document.getElementById("phone").focus();
                    document.getElementById("address").removeAttribute("disabled");
                  }}>Edit</button> :
                  <div>
                    <button className="btn profile-button w-25" type="button" onClick={()=>{
                      setClickForEdit(false);
                      document.getElementById("phone").setAttribute("disabled","");
                      document.getElementById("address").setAttribute("disabled","");
                    }}>Cancel</button>
                    &nbsp;
                    <button className="btn btn-primary profile-button w-25" type="button" onClick={update}>Save</button>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
