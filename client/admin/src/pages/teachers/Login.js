import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { login } from "../../store/actions/auth";

export default function () {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function onChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const success = await dispatch(login(formData));
    if (success) {
      navigate("/dashboard");
    } else {
      setFormData({ email: "", password: "" });
    }
  }

  return (
    <section class="login-page">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-6 text-center mb-5">
            <h2 class="heading-section">Admin Login</h2>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-md-7 col-lg-5">
            <div class="login-wrap p-4 p-md-5">
              <div class="icon d-flex align-items-center justify-content-center">
                <span class="fa fa-user-o"></span>
              </div>
              <h3 class="text-center mb-4">Sign In</h3>
              <form action="#" class="login-form" onSubmit={onSubmit}>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control rounded-left login-input"
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={onChange}
                    required
                  />
                </div>
                <div class="form-group d-flex">
                  <input
                    type="password"
                    class="form-control rounded-left login-input"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={onChange}
                    required
                  />
                </div>
                <div class="form-group">
                  <button
                    type="submit"
                    class="form-control btn btn-primary rounded submit px-3 login-btn"
                  >
                    Login
                  </button>
                </div>
                {/* <div class="form-group d-md-flex">
                  <div class="w-50">
                    <label class="checkbox-wrap checkbox-primary">
                      Remember Me
                      <input type="checkbox" checked />
                      <span class="checkmark"></span>
                    </label>
                  </div>
                  <div class="w-50 text-md-right">
                    <a href="#">Forgot Password</a>
                  </div>
                </div> */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
