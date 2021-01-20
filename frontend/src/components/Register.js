import React from "react";
import { Link, useHistory } from "react-router-dom";
import Header from "./Header";
import { useFormValidation } from "../hooks/useFormValidation";

function Register({ onRegister, onClose }) {
  const history = useHistory();  
  const {
    values,
    errors,
    handleChange
  } = useFormValidation();

  function handleSubmit(e) {
    e.preventDefault();    
    onRegister(values.email, values.password);
  }

  return (
    <>
      <Header
        email=""
        onClick={() => {
          history.push("/sign-in");
        }}
        menuText="Войти"
      />
      <div className="popup__container popup__container_dark_theme">
        <h2 className="popup__title popup__title_dark_theme">Регистрация</h2>
        <form
          className="popup__form"
          name="registerForm"
          noValidate
          onSubmit={handleSubmit}
        >
          <input
            className="popup__input popup__input_dark_theme popup__input_email"
            id="email"
            type="email"
            placeholder="Email"
            name="email"
            minLength="2"
            maxLength="40"
            required
            value={values.email || ''}
            onChange={handleChange}
          />
          <span
            className={`popup__form-error ${
                errors.email && "popup__form-error_visible"
            }`}
            id="email-error"
          >
            {errors.email || ''}
          </span>
          <input
            className="popup__input popup__input_dark_theme popup__input_password"
            id="password"
            type="password"
            placeholder="Пароль"
            name="password"
            required
            value={values.password || ''}
            onChange={handleChange}
          />
          <span
            className={`popup__form-error ${
                errors.password && "popup__form-error_visible"
            }`}
            id="password-error"
          >
            {errors.password || ''}
          </span>
          <button
            type="submit"
            className="popup__submit popup__submit_dark_theme"
          >
            Зарегистрироваться
          </button>
        </form>
        <Link to="/sign-in" className="popup__link">
          Уже зарегистрированы? Войти
        </Link>
      </div>   
    </>
  );
}

export default Register;
