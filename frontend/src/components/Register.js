import React from 'react';
import { Link } from 'react-router-dom';

function Register ({ onRegister }){
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');

  function handlePasswordChange(evt) {
    setPassword(evt.target.value)
  }

  function handleEmailChange(evt) {
    setEmail(evt.target.value)
  }

  function handleSubmit(e){
    e.preventDefault();
    onRegister({ email, password });
  }
  
  return (
    <div className="auth">
      <form className="auth__form" onSubmit={handleSubmit}>
        <div className="auth__wrapper">
          <h3 className="auth__title">Регистрация</h3>
          <label className="auth__input">
            <input type="email" name="email" id="email" className="auth__textfield" placeholder="Email" onChange={handleEmailChange} required  />
          </label>
          <label className="auth__input">
            <input type="password" name="password" id="password" className="auth__textfield" placeholder="Пароль" onChange={handlePasswordChange} required  />
          </label>
        </div>
        <div className="auth__wrapper">
          <button className="auth__button" type="submit">Зарегистрироваться</button>
          <p className="auth__text">Уже зарегистрированы? <Link className="auth__link" to="/signin">Войти</Link></p>
        </div>
      </form>
    </div>
  )
}

export default Register;