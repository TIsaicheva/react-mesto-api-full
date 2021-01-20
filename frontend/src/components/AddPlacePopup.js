import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useFormValidation } from "../hooks/useFormValidation";

function AddPlacePopup(props) {  
  const {
    values,
    errors,
    isValid,
    handleChange,
    resetForm,
  } = useFormValidation();

  React.useEffect(() => {
    resetForm();
  }, [props.isOpen, resetForm]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace(values);
  }

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      buttonName="Сохранить"
      isOpen={props.isOpen}      
      onClose={props.onClose}
      isDisabled={!isValid}
      onSubmit={handleSubmit}
      children={
        <>
          <input
            className="popup__input popup__input_placeName"
            id="placeName"
            type="text"
            placeholder="Название"
            name="name"
            minLength="2"
            maxLength="30"
            required
            onChange={handleChange}
            value={values.name || ""}
          />
          <span 
          className={`popup__form-error ${errors.name && 'popup__form-error_visible'}`} 
          id="placeName-error">
            {errors.name || ""}
          </span>
          <input
            className="popup__input popup__input_placeImageUrl"
            id="placeImageUrl"
            type="url"
            placeholder="Ссылка на картинку"
            name="link"
            required
            onChange={handleChange}
            value={values.link || ""}            
          />
          <span 
          className={`popup__form-error ${errors.link && 'popup__form-error_visible'}`} 
          id="placeImageUrl-error">
            {errors.link || ""}
          </span>
        </>
      }
    />
  );
}

export default AddPlacePopup;
