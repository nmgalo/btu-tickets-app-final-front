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

    const response = await fetch(`http://localhost:8000/api/passenger/login`, {
      method: "POST",
      body: form,
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.token) {
          localStorage.setItem("token", response.token);
          window.location.href = "/";
        } else {
          alert(response.error);
        }
      });

    console.log(response);
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
          form {
            width: 350px;
            background: #ddd;
            padding: 20px;
            box-sizing: border-box;
          }
        `}</style>
      </div>
    </div>
  );
}
