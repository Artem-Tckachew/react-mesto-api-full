import React, {useEffect} from 'react';
import PopupWithForm from './PopupWithForm'
import {UseFormValidation} from './UseFormValidation'

function EditAvatarPopup({isOpen, onUpdateAvatar, onClose, isSending }) {
  const {values, handleChange, resetFrom, errors, isValid} = UseFormValidation();
 
  useEffect(() => {
    resetFrom({});
  }, [isOpen, resetFrom]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(values);
  }

  return (

    <PopupWithForm isOpen={isOpen} onSubmit={handleSubmit} onClose={onClose} name="avatar" title="Обновить аватар" text={isSending ? "Сохранение..." : "Сохранить" } isDisabled={!isValid}>
    <input type="url" value={values.avatar || ''} onChange={handleChange} className="form__input form__input_avatar popup__input" id="avatar" name="avatar" placeholder="Ссылка на аватар" required />
    <span className="popup__error_visible" id='avatar-error'>{errors.avatar || ""}</span>
</PopupWithForm>
  )}

  export default EditAvatarPopup;