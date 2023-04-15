import { useContext, useRef } from "react";
import "./login.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import logo from './logo.png';

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { user, isFetching, dispatch } = useContext(AuthContext);

  const handleClick = (e) => {


    e.preventDefault();
    loginCall({ email: email.current.value, password: password.current.value }, dispatch);
  };
  console.log(user);
  return (
    <div className="main">

      <div className="sideBar">
        <div className="upperTriangle"></div>
        <div className="lowerTriangle"></div>
      </div>

        <nav className="navBar">
          <img src = {logo} alt = 'logo' class = "logoImg"></img>
        </nav>

      <div className="loginWrapper">
        <div className="signIn">Sign In</div>
        <div className="loginRight">
          <form className="loginform" onSubmit={handleClick}>
            <input placeholder="Email" type="email" required className="loginInput" ref={email} />
            <input placeholder="Password" type="password" required minLength={6} className="loginInput" ref={password} />
            <button className="LoginBtn" type="submit" disabled={isFetching}>{isFetching ? "Loading" : "Log In"} </button>
            <span className="forgotPass">Forgot Password?</span>
            <button className="createBtn">{isFetching ? "Loading" : "Create account"}</button>
          </form>
        </div>
      </div>
    </div>
  );
}
