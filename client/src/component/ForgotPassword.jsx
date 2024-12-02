import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../redux/authSlice";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const { forgotPasswordStatus, loading, error } = useSelector(
    (state) => state.auth
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };
  useEffect(() => {
    if (forgotPasswordStatus === "success") {
      // navigate('/reset-password')
    }
  }, [forgotPasswordStatus, navigate]);

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-96 p-8 mt-10 bg-slate-300 ">
        <h1 className="text-xl py-4 font-bold">FORGOT PASSWORD</h1>
        <form action="" className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border-black"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-red-500 "
            disabled={loading}
          >
            {loading ? "loading......" : "Forgot Password"}
          </button>
          {forgotPasswordStatus === "success" && (
            <p className="text-green-500">
              Password reset link sent to your email.
            </p>
          )}
          {forgotPasswordStatus === "failed" && (
            <p className="text-red-500">
              Error: {error.message ? error.message : JSON.stringify(error)}{" "}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};
export default ForgotPassword;
