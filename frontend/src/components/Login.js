import React from 'react';

function Login (props){
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');

  function handlePasswordChange(evt) {
    setPassword(evt.target.value)
  }

  function handleEmailChange(evt) {
    setEmail(evt.target.value)
  }

  function handleSubmit(evt){
    evt.preventDefault();
    props.onSubmit({
      email,
      password
    })
  }

  return (
    <div className="auth">
      <form className="auth__form" onSubmit={handleSubmit}>
        <div className="auth__wrapper">
          <h3 className="auth__title">{props.title}</h3>
          <label className="auth__input">
            <input type="email" name="email" id="email" className="auth__textfield" placeholder="Email" onChange={handleEmailChange} required  />
          </label>
          <label className="auth__input">
            <input type="password" name="password" id="password" className="auth__textfield" placeholder="Пароль" onChange={handlePasswordChange} required  />
          </label>
        </div>
        <button className="auth__button" type="submit">{props.button}</button>
      </form>
    </div>
  )
}

export default Login;