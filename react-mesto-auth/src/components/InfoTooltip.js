import React from "react";
import SuccessIcon from "../images/success-icon.svg";
import ErrorIcon from "../images/error-icon.svg";

const ICONS = {
  success: SuccessIcon,
  error: ErrorIcon
}

function InfoTooltip({ isOpen, onClose, status: {iconType, text} = {} }) {
  return (
    <div className={`overlay ${isOpen && "overlay_active"}`}>
        <form className='popup popup_form' noValidate>
          <button type='button' className='popup__close' onClick={onClose}>
          </button>
          <div>
            <img className='popup__icon' src={ICONS[iconType]} alt={text} />
            <p className='popup__status-message'>{text}</p>
          </div>
        </form>
      </div>
  );
}

export default InfoTooltip;
