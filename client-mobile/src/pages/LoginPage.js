import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { fetchLogin } from '../store/action';
function LoginPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })

  const changeHandling = (e) => {
    const value = e.target.value
    const name = e.target.name
    setLoginData({
      ...loginData,
      [name]: value
    })
  }
  
  const submitLogin = (e) => {
    e.preventDefault()
    dispatch(fetchLogin(loginData))
      .then(() => {
        navigate('/')
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
          <form onSubmit={submitLogin}>
            <div className="mb-3">
              <input type="text" onChange={changeHandling} name="email" className="form-control" style={{ borderRadius: 75 }} placeholder="Email" />
            </div>
            <div className="mb-3">
              <input type="password" onChange={changeHandling} name="password" className="form-control" style={{ borderRadius: 75 }} placeholder="Password" />
            </div>
            <button type="submit" className="btn btn-warning mt-2">Submit</button>
          </form>
          <br />
          <div className="row" style={{ paddingLeft: "5%", paddingRight: "5%" }}>
            <hr className="col-4 mt-2" />
            <p className="col-4">OR</p>
            <hr className="col-4 mt-2" />
          </div>
          LOGIN WITH GOOGLE
        </div>
      </div >
    </>

  );
}

export default LoginPage;
