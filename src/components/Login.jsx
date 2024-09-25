import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [isEmail, setEmail] = useState("");
  const [isPassword, setPassword] = useState("");
  const [isSuccessMessage, setSuccessMessage] = useState("");
  const [isFailedMessage, setFailedMessage] = useState("");
  const [tokenVariable, setToken] = useState(null);

  useEffect(() => {
    if (isSuccessMessage !== "") {
      alert(isSuccessMessage);
      // navigate("/create", { state: { token: tokenVariable } });
    }

    if (isFailedMessage !== "") {
      alert(isFailedMessage);
      // navigate("/home");
    }
  });

  const handleSubmit = (event) => {
    const instance = axios.create({
      baseURL: "https://dev.laundryaku.com",
      auth: {
        username: isEmail,
        password: isPassword,
      },
      headers: {
        "Access-Control-Allow-Origin": "",
      },
    });

    instance
      .post("/api/v1/security/login", {}, {})
      .then((response) => {
        const token = response.data.data.token;
        console.log("Token:", token);
        setToken(token);
        setSuccessMessage("Login Berhasil");
      })
      .catch((error) => {
        console.error(error);
        setFailedMessage("Login Gagal");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Email:</label>
          <input
            type="text"
            name="email"
            value={isEmail}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Password:
          </label>
          <input
            type="password"
            name="password"
            value={isPassword}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Login
        </button>
        <div className="text-green-500 text-center mt-4">
          {isSuccessMessage}
        </div>
        <div className="text-red-500 text-center mt-4">{isFailedMessage}</div>
      </div>
    </div>
  );
}

export default Login;
