import React from 'react';
import PopupWithForm from './PopupWithForm'
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import {UseFormValidation} from "../components/UseFormValidation";


function EditProfilePopup({isOpen, onUpdateUser, onClose,  isSending}) {
  const currentUser = React.useContext(CurrentUserContext);
  const {values, handleChange, resetFrom, errors, isValid} = UseFormValidation();

  React.useEffect(() => {
    if (currentUser) {
      resetFrom(currentUser, {}, true);
    }
  }, [currentUser, resetFrom]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser(values);
  }
  return (

<PopupWithForm onSubmit={handleSubmit}  isOpen={isOpen} onClose={onClose} text={isSending ? "Сохранение..." : "Сохранить"} name="name" title="Редактировать профиль" isDisabled={!isValid || isSending}>
    <input  value={values.name || ""} onChange={handleChange} type="text" className="form__input form__input_name popup__input" id="name" name="name" placeholder="Имя" minLength={2} maxLength={40} required />
          <span className="popup__error_visible" id='name-error'>{errors.name || ""}</span>
          <input value={values.about || ""} onChange={handleChange} type="text" className="form__input form__input_job popup__input" id="about" name="about" placeholder="Профессия" minLength={2} maxLength={200} required />
          <span className="popup__error_visible" id='about-error'>{errors.about || ""}</span>
    </PopupWithForm>
  )}

  export default EditProfilePopup;