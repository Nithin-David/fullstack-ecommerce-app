import React, { useState } from 'react';
import "./CSS/LoginSignup.css";

const LoginSignup = () => {
  const [state, setState] = useState("signup");

  const [data, setData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setData({...data, [e.target.name]: e.target.value });
  };

  const login = async () => {
   let responseData;

   await fetch("http://localhost:4000/login", {
     method: "POST",
     headers: {
       Accept: "application/json",
       "Content-Type": "application/json",
     },
     body: JSON.stringify(data),
   })
     .then((res) => res.json())
     .then((data) => (responseData = data));

   if (responseData.success) {
     alert("User registered successfully");
     localStorage.setItem("auth-token", responseData.token);
     window.location.replace("/");
   } else {
     alert(responseData.message);
   }
  }

  const signup = async () => {
   let responseData;

   await fetch("http://localhost:4000/signup", {
     method: "POST",
     headers: {
       Accept: "application/json",
       "Content-Type": "application/json"
     },
     body: JSON.stringify(data),
   }).then(res => res.json()).then(data => responseData = data);

   if (responseData.success){
    alert("User registered successfully");
    localStorage.setItem("auth-token", responseData.token);
    window.location.replace("/");
   }else{
    alert(responseData.message);
   }
  }

  return (
    <div className="login-parent">
      <div className="login-container">
        <div className="input-fields">
          {state === "signup" ? <p>Sign Up</p> : <p>Login</p>}
          {state === "signup" ? (
            <input
              value={data.username}
              onChange={handleChange}
              type="text"
              name="username"
              placeholder="Enter your name"
            />
          ) : (
            <></>
          )}
          <input
            value={data.email}
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="Enter your email"
          />
          <input
            value={data.password}
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="Enter password"
          />
          <button onClick={() => {state === "login" ? login() : signup()}}>Countinue</button>
        </div>
        <div className="login-link">
          {state === "signup" ? (
            <p>
              Already have an account?{" "}
              <span onClick={() => setState("login")}>Login here</span>
            </p>
          ) : (
            <p>
              Create a account.{" "}
              <span onClick={() => setState("signup")}>Click here</span>
            </p>
          )}
        </div>
        <div className="login-policy">
          <input type="checkbox" />
          <p>By countinuing i agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  );
}

export default LoginSignup