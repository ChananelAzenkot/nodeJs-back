import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handelInput = (ev) => {
    const { name, value } = ev.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const login = (ev) => {
    ev.preventDefault();
    fetch("http://localhost:4000/login", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((res) => {
      if (res.ok) {
        console.log("user logged in");
        alert("user logged in");
      } else {
        console.log("user not logged in");
        alert("user not logged in");
      }
    });
  };

  return (
    <>
      <div className="Login smallFrame">
        <h2>Login in → </h2>

        <form onSubmit={login}>
          <label>
            Email:
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handelInput}
            />
          </label>

          <label>
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handelInput}
            />
          </label>

          <button>login</button>
        </form>
      </div>

      <p className="signup">
        <Link to="/signup">Signup Here ! </Link>
      </p>
    </>
  );
}
