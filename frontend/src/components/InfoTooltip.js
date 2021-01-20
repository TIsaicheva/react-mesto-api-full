import React from "react";

export default function InfoTooltip({ isOpen, onClose, title, name, icon }) {
  return (
    <div className={`popup popup-${name} ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <button
          type="button"
          aria-label="Закрыть попап"
          className="popup__close"
          onClick={onClose}
        ></button>
        <div className="popup__content">
          <img className="popup__icon" alt="icon" src={icon} />
          <h2 className="popup__title">{title}</h2>
        </div>
      </div>
    </div>
  );
}
