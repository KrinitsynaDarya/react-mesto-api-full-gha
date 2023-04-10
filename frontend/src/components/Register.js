import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = ({ onRegister }) => {
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

  function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = formValue;
    onRegister(email, password);
  }

  return (
    <div className="register">
      <p className="register__title">Регистрация</p>
      <form onSubmit={handleSubmit} className="register__form">
        <input
          className="register__input"
          id="email"
          name="email"
          type="email"
          value={formValue.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          className="register__input"
          id="password"
          name="password"
          type="password"
          value={formValue.password}
          onChange={handleChange}
          placeholder="Пароль"
        />

        <div className="register__button-container">
          <button
            type="submit"
            onSubmit={handleSubmit}
            className="register__button"
          >
            Зарегистрироваться
          </button>
        </div>
      </form>
      <div className="register__signin">
        <p>
          Уже зарегистрированы?{" "}
          <Link to="/sign-in" className="register__login-link">
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
