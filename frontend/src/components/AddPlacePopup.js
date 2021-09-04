import PopupWithForm from './PopupWithForm'
import React, { useEffect } from "react";
import {UseFormValidation} from "../components/UseFormValidation";

function AddPlacePopup({isOpen, onAddPlace, onClose, isSending}) {
  const {values, handleChange, resetFrom, errors, isValid} = UseFormValidation();

  useEffect(() => {
    resetFrom()
  }, [isOpen, resetFrom]);

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace(values);
  }
     return (
   
        <PopupWithForm isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} text={isSending ? "Сохранение..." : "Создать"} name="addcard" title="Новое Место" isDisabled={!isValid || isSending}>
        <input  value={values.name || ""} onChange={handleChange} type="text" className="form__input form__input_title popup__input" id="input-mesto" name="name" placeholder="Название" minLength={2} maxLength={30} required />
              <span className="popup__error_visible" id='place-name-error'>{errors.name || ""}</span>
              <input type='url' value={values.link || ""} onChange={handleChange} className="form__input form__input_link popup__input" id="input-url" name="link" placeholder="Ссылка на картинку" required />
              <span className="popup__error_visible" id='place-link-error'>{errors.link || ""}</span>
        </PopupWithForm>
     )}
   
     export default AddPlacePopup;