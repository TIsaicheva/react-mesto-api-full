import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useFormValidation } from "../hooks/useFormValidation";

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);  
  const {
    values,
    errors,
    isValid,
    handleChange,
    resetForm,
  } = useFormValidation();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser(values);
  }

  /* установка значений в форму по умолчанию */
  React.useEffect(() => {
    if (currentUser) {
      resetForm(currentUser);
    }
  }, [props.isOpen, currentUser, resetForm]);

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      buttonName="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isDisabled={!isValid}
      children={
        <>
          <input
            className="popup__input popup__input_userName"
            id="userName"
            type="text"
            placeholder="Имя"
            name="name"
            minLength="2"
            maxLength="40"
            required
            value={values.name || ''}
            onChange={handleChange}
          />
          <span
            className={`popup__form-error ${
              errors.name && "popup__form-error_visible"
            }`}
            id="userName-error"
          >
            {errors.name || ''}
          </span>
          <input
            className="popup__input popup__input_userDescription"
            id="userDescription"
            type="text"
            placeholder="О себе"
            name="about"
            minLength="2"
            maxLength="200"
            required
            value={values.about || ''}
            onChange={handleChange}
          />
          <span
            className={`popup__form-error ${
              errors.about && "popup__form-error_visible"
            }`}
            id="userDescription-error"
          >
            {errors.about || ''}
          </span>
        </>
      }
    />
  );
}

export default EditProfilePopup;
