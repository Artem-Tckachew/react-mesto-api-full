import { PopupWithForm } from './PopupWithForm.js';
import React from 'react';

export function EditAvatarPopup(props) {

  const avaLinkInput = React.useRef()

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avaLinkInput.current.value,
    }
    )
    avaLinkInput.current.value = "";

  }

  return (

    <PopupWithForm onSubmit={handleSubmit} onClose={props.onClose} isOpen={props.isOpen} name="avatar" title="Обновить аватар" text={isSending ? "Сохранение..." : "Сохранить" } isDisabled={!isValid}>
    <input ref={avaLinkInput}  className="form__input form__input_avatar popup__input" id="avatar" name="avatar" placeholder="Ссылка на аватар" required />
    <span className="popup__error_visible" id='avatar-error'>{errors.avatar || ""}</span>
</PopupWithForm>
  )}

  export default EditAvatarPopup;