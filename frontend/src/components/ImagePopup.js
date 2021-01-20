import React from 'react';

function ImagePopup({ onClose, card, isOpen }) {
    return (
        <div className={`popup popup-image ${isOpen && 'popup_opened'}`}>
            <div className="popup__image-container">
                <div className="popup__content">
                    <img src={isOpen ? card.link : ''} alt={isOpen ? card.name : '' } className="popup__image" />
                    <p className="popup__place-name">{isOpen ? card.name : ''}</p>
                </div>
                <button type="button" aria-label="Закрыть попап"
                    className="popup__close popup__close_image" onClick={onClose}></button>
            </div>
        </div>
    );
}

export default ImagePopup;