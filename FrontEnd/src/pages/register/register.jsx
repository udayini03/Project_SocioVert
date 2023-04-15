import { useRef } from "react";
import "./register.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from './logo.png';


export default function Register() {
  const email = useRef();
  const password = useRef();
  const username = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();


  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      password.current.setCustomValidity("Passwords Don't match");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value
      };
      try {
        await axios.post("/auth/register", user);
        navigate("/login")
      } catch (err) {
        console.log(err);
      }
    }
  };


  return (
    <div className="main">


      <div className="sideBar">
        <div className="upperTriangle"></div>
        <div className="lowerTriangle"></div>
      </div>

      <nav className="navBar">
        <img src={logo} alt='logo' class="logoImg"></img>
      </nav>

      <div className="loginWrapper">
        <div className="SignUpBox">
          <div className="SignUp">Sign Up</div>
          <div className="loginRight">
            <form className="loginBox" onSubmit={handleClick}>
              <input placeholder="Enter your Name" required ref={username} className="loginInput" />
              <input placeholder="Email" requied ref={email} type="email" className="loginInput" />
              <input placeholder="Password" requied ref={password} minLength={6} type="password" className="loginInput" />
              <input placeholder="Confirm Password" required ref={passwordAgain} minLength={6} type="password" className="loginInput" />
              <button className="loginButton" type="submit">Sign Up</button>
              <button className="loginRegisterButton">Already have a Account?</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
} 
