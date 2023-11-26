import { useState } from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    email: "",
    fullName: "",
  });

  const handelInput = (ev) => {
    const { name, value } = ev.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const signup = (ev) => {
    ev.preventDefault();
  };

  return (
    <>
      <div className="Login smallFrame">
        <h2>create user </h2>

        <form onSubmit={signup}>
          <label>
            full name :
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handelInput}
            />
          </label>

          <label>
            email :
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handelInput}
            />
          </label>

          <label>
            user name :
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handelInput}
            />
          </label>

          <label>
            password :
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handelInput}
            />
          </label>

          <button>SignUp</button>
        </form>
      </div>

      <p className="signup">
        <Link to="/">SignUp Here ! </Link>
      </p>
    </>
  );
}
