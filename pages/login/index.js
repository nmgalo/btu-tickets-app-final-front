import { useState } from "react";

import Header from "../../components/Header";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const form = new FormData();
    form.append("email", email);
    form.append("password", password);

    const response = await fetch(
      `https://www.tickets-api.cloud.com.ge/api/passenger/login`,
      {
        method: "POST",
        body: form,
      }
    )
      .then((response) => response.json())
      .then((response) => {
        if (response.token) {
          localStorage.setItem("token", response.token);
          window.location.href = "/";
        } else {
          alert(response.error);
        }
      });
  }

  return (
    <div>
      <Header />
      <div className="container">
        <form onSubmit={handleSubmit}>
          <h1>Authorization</h1>
          <div>
            <input
              type="text"
              name="email"
              onChange={(it) => setEmail(it.target.value)}
              value={email}
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              onChange={(it) => setPassword(it.target.value)}
              value={password}
            />
          </div>
          <div>
            <button>Login</button>
          </div>
        </form>

        <style jsx>{`
          .container {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: calc(100vh - 82px);
          }
          h1 {
            padding: 0;
            margin: 0;
          }
          form {
            width: 350px;
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
            padding: 25px;
            margin: 80px 0;
            box-sizing: border-box;
          }
          form > div {
            margin: 15px 0;
          }
          form > div > input {
            width: 100%;
            outline: 0;
            border: 0.5px solid #ddd;
            padding: 10px;
            border-radius: 2px;
          }
          form > div > button {
            width: 100%;
            height: 40px;
            border-radius: 2px;
            outline: 0;
            cursor: pointer;
            border: 0.2px solid #ddd;
          }
        `}</style>
      </div>
    </div>
  );
}
