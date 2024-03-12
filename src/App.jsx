import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";

import "./App.css";
import { auth } from "./config";

function App() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState("");
  const [verifyEmail, setVerifyEmail] = useState(false);
  const [forgotPasswordState, setForgotPasswordState] = useState(false);
  const [islogin, setIslogin] = useState(null);
  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log(user);
      await sendEmailVerification(user.user);
      setRegisterEmail("");
      setRegisterPassword("");
      alert("Verification link sent successfully");
    } catch (error) {
      alert(error.message);
    }
  };

  const login = async () => {
    if (!loginEmail || !loginPassword) {
      alert("Please enter email and password");
      return;
    }
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      setUser(userCredentials);
      console.log(userCredentials);
      if (userCredentials.user.emailVerified) {
        setIslogin(true);
        console.log("verified user");
        console.log("User logged in successfully (email verified)");
        alert("Login successful");
        console.log(user.user);
        setLoginEmail(null);
        setLoginPassword(null);
      } else {
        console.error("Email verification required, please verify your email");
        setVerifyEmail(true);
        // Optionally, provide a way to resend verification email
      }
    } catch (error) {
      console.error("Login failed:", error.message);
      // Handle login errors (e.g., invalid credentials)
    }
  };

  const verifyEmailHandle = async () => {
    await sendEmailVerification(user.user);
    alert("Verification link sent successfully");
    setVerifyEmail(false);
  };

  const forgotPassword = async () => {
    if (!loginEmail) {
      alert("Please enter email");
      return;
    }
    await sendPasswordResetEmail(auth, loginEmail);
    alert("Password reset link sent successfully");
    setForgotPasswordState(false);
  };
  const logout = async () => {
    await signOut(auth);
    setIslogin(false);
  };

  return (
    <>
      {islogin ? (
        <div>
          <p>logged in successfully</p>
          <p> user Email : {user.user.email}</p>
         
          <button
            className="border-2 border-orange-700  hover:bg-slate-700 m-4 p-1 px-3 rounded-xl text-white bg-orange-500"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <div className="border-2 p-4 rounded-2xl flex flex-col items-center justify-center">
            <h3> Register User </h3>

            <input
              className="border-2 rounded-xl px-4 mt-2 py-1"
              type="email"
              placeholder="Email..."
              onChange={(event) => {
                setRegisterEmail(event.target.value);
              }}
            />
            <input
              className="border-2 rounded-xl px-4 mt-2 py-1"
              type="password"
              placeholder="Password..."
              onChange={(event) => {
                setRegisterPassword(event.target.value);
              }}
            />

            <button
              className="border-2 border-orange-700  hover:bg-slate-700 m-4 p-1 px-3 rounded-xl text-white bg-orange-500"
              onClick={register}
            >
              Create User
            </button>
          </div>

          <div className="border-2 mt-6 p-4 rounded-2xl flex flex-col items-center justify-center">
            <h3> Login </h3>
            <input
              className="border-2 rounded-xl px-4 mt-2 py-1"
              type="email"
              placeholder="Email..."
              onChange={(event) => {
                setLoginEmail(event.target.value);
              }}
            />
            <input
              className="border-2 rounded-xl px-4 mt-2 py-1"
              type="password"
              placeholder="Password..."
              onChange={(event) => {
                setLoginPassword(event.target.value);
              }}
            />
            {verifyEmail ? (
              <button
                className="border-2 border-orange-700  hover:bg-slate-700 m-4 p-1 px-3 rounded-xl text-white bg-orange-500"
                onClick={verifyEmailHandle}
              >
              
                verify email
              </button>
            ) : null}
            <button
              onClick={() => {
                setForgotPasswordState(true);
                console.log(forgotPasswordState);
              }}
              className="text-orange-600 text-sm hover:text-orange-400 cursor-default"
            >
           
              forgot password
            </button>
            {forgotPasswordState ? (
              <div>
                <input
                  className="border-2 rounded-xl px-4 mt-2 py-1"
                  type="email"
                  placeholder="Email..."
                  onChange={(event) => {
                    setLoginEmail(event.target.value);
                  }}
                />
                <button
                  onClick={forgotPassword}
                  className="bg-orange-600 text-white border-2 border-orange-700  hover:bg-slate-700 m-4 p-1 px-3 rounded-xl "
                >
                 
                  send link
                </button>
              </div>
            ) : null}

            <button
              className="border-2 border-orange-700  hover:bg-slate-700 m-4 p-1 px-3 rounded-xl text-white bg-orange-500"
              onClick={login}
            >
              Login
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
