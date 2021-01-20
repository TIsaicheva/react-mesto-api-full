import React from 'react';
import PopupWithForm from './PopupWithForm';

function ConfirmationPopup(props) {
    function hadleSubmit(e) {
        e.preventDefault();
        props.onConfirm();
    }

    return (
        <PopupWithForm
            name='confirm'
            title='Вы уверены?'
            buttonName='Да'
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={hadleSubmit}
        />
    );
}

export default ConfirmationPopup;