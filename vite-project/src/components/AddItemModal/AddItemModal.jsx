import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useForm from "../../hooks/useForm";

const AddItemModal = ({ isOpen, onAddItem, closeActiveModal, onClose }) => {
  const defaultValues = { name: "", link: "", weather: "" };
  const { values, handleChange, setValues } = useForm(defaultValues);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem(values);
    setValues(defaultValues);
    if (typeof handleClose === "function") handleClose();
  };

  return (
    <ModalWithForm
      title="New garment"
      name="add-card"
      isOpen={isOpen}
      closeActiveModal={closeActiveModal}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          type="text"
          name="name"
          className="modal__input modal__input_type_card-name"
          id="clothing-name"
          placeholder="Name"
          required
          minLength="2"
          maxLength="30"
          onChange={handleChange}
          value={values.name}
        />
      </label>

      <label htmlFor="imageUrl" className="modal__label">
        Image
        <input
          type="url"
          name="link"
          className="modal__input modal__input_type_url"
          id="imageUrl"
          placeholder="Image URL"
          required
          onChange={handleChange}
          value={values.link}
        />
      </label>

      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>

        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            id="hot"
            type="radio"
            value="hot"
            name="weather"
            className="modal__radio-input"
            onChange={handleChange}
            checked={values.weather === "hot"}
          />
          Hot
        </label>

        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            id="warm"
            type="radio"
            value="warm"
            name="weather"
            className="modal__radio-input"
            onChange={handleChange}
            checked={values.weather === "warm"}
          />
          Warm
        </label>

        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            id="cold"
            type="radio"
            value="cold"
            name="weather"
            className="modal__radio-input"
            onChange={handleChange}
            checked={values.weather === "cold"}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
