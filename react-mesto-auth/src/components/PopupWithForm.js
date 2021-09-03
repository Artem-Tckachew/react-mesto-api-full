import React from 'react';



const PopupWithForm = ({title, name, isOpen, text, onSubmit, onClose, children, isDisabled = false }) => {
  React.useEffect(() => {
    if (!isOpen) return;
    const handleEscapeClose = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscapeClose);
    return () => {
      document.removeEventListener("keydown", handleEscapeClose);
    };
  }, [isOpen, onClose]);

  const handleOverlayClose = (event) => {
    if (event.target === event.currentTarget && isOpen) {
      onClose();
    }
  };

  return (
    <section className={isOpen ? `overlay overlay_${name} overlay_active` : `overlay overlay_${name}`} onMouseDown={handleOverlayClose}>
      <form className="popup popup_form" name={name} onSubmit={onSubmit}>
        <fieldset className="form"> 
          <legend className="popup__title">{title}</legend>
          {children}
          <button type="submit" className={`popup__button form__submit ${ isDisabled && "popup__button_disabled"
            }`} disabled={isDisabled}>{text}</button>
        </fieldset>
        <button type="button" className="popup__close popup__close_profile" onClick={onClose} />
      </form>
    </section>
  );
}
  
export default PopupWithForm;