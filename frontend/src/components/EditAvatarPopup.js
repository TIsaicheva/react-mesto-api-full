import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useFormValidation } from "../hooks/useFormValidation";

function EditAvatarPopup(props) {
  const { values, isValid, handleChange, resetForm } = useFormValidation();

  React.useEffect(() => {
    resetForm();
  }, [props.isOpen, resetForm]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar(values);
  }

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      buttonName="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      isDisabled={!isValid}
      onSubmit={handleSubmit}
      children={
        <>
          <input
            className="popup__input popup__input_avatarUrl"
            id="avatarUrl"
            type="url"
            placeholder="Ссылка на аватар"
            name="avatar"
            value={values.avatar || ''}
            onChange={handleChange}
            required
          />
          <span className="popup__form-error" id="avatarUrl-error"></span>
        </>
      }
    />
  );
}

export default EditAvatarPopup;
