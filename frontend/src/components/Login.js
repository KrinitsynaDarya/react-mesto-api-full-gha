// Login.js

import React, { useState } from "react";

const Login = ({ onLogin }) => {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formValue.email || !formValue.password) {
      return;
    }
    const { email, password } = formValue;
    onLogin(email, password);
  };

  return (
    <div className="login">
      <p className="login__title">Вход</p>
      <form onSubmit={handleSubmit} className="login__form">
        <input
          className="login__input"
          required
          id="email"
          name="email"
          type="text"
          value={formValue.email || ""}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          className="login__input"
          required
          id="password"
          name="password"
          type="password"
          value={formValue.password || ""}
          onChange={handleChange}
          placeholder="Пароль"
        />
        <div className="login__button-container">
          <button type="submit" className="login__button">
            Войти
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
