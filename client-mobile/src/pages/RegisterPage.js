import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { fetchRegister } from "../store/actions/actionUser";
// import { fetchRegister } from "../store/action";

function RegisterPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [registerData, setRegisterData] = useState({
    name: '',
    username: '',
    password: '',
    email: '',
    phone: '',
    address: '',
    role: ''
  })

  const changeHandling = (e) => {
    const value = e.target.value
    const name = e.target.name
    setRegisterData({
      ...registerData,
      [name]: value
    })
  }

  const submitRegister = (e) => {
    e.preventDefault()
    dispatch(fetchRegister(registerData))
      .then((data) => {
        navigate('/login')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      <div className='mx-auto' style={{ borderRadius: '20px', textAlign: 'center', color: 'red', maxWidth: '800px' }}>
        <div className="card-body m-auto d-flex flex-column">
          <center>
            <img src="https://raw.githubusercontent.com/Forgotosleep/lemon-learn-english/developer/assets/logo%20v1.png" width="300" alt="" />
          </center>
          <form onSubmit={submitRegister}>
            <div className="mb-3">
              <input type="text" className="form-control" style={{ borderRadius: 75 }} placeholder="Name" onChange={(e) => changeHandling(e)} name="name" />
            </div>
            <div className="mb-3">
              <input type="text" className="form-control" style={{ borderRadius: 75 }} placeholder="Username" onChange={(e) => changeHandling(e)} name="username" />
            </div>
            <div className="mb-3">
              <input type="password" className="form-control" style={{ borderRadius: 75 }} placeholder="Password" onChange={(e) => changeHandling(e)} name="password" />
            </div>
            <div className="mb-3">
              <input type="text" className="form-control" style={{ borderRadius: 75 }} placeholder="Email" onChange={(e) => changeHandling(e)} name="email" />
            </div>
            <div className="mb-3">
              <input type="text" className="form-control" style={{ borderRadius: 75 }} placeholder="Phone" onChange={(e) => changeHandling(e)} name="phone" />
            </div>
            <div className="mb-3">
              <input type="text" className="form-control" style={{ borderRadius: 75 }} placeholder="Address" onChange={(e) => changeHandling(e)} name="address" />
            </div>
            <select className="form-select" aria-label="Default select example" style={{ borderRadius: 75 }} onChange={(e) => changeHandling(e)} name="role">
              <option hidden>Choose your role</option>
              <option value="teacher">Teacher</option>
              <option value="student">Student</option>
            </select>


            <button type="submit" className="btn btn-warning mt-2">Submit</button>
          </form>
          <br />
          <div className="row" style={{ paddingLeft: "5%", paddingRight: "5%" }}>
            <hr className="col-4 mt-2" />
            <p className="col-4">OR</p>
            <hr className="col-4 mt-2" />
          </div>
          REGISTER WITH GOOGLE
        </div>
      <footer className="footer py-3 position-relative" style={{ top: "4em" }}>
        <hr />
        <div className="container">
          <span className="text-muted">Already have an account? <Link to="/login" style={{ textDecoration: "none", color: "black", fontWeight: "bolder" }}>Sign In.</Link> </span>
        </div>
      </footer>
      </div >
    </>

  );
}

export default RegisterPage;
