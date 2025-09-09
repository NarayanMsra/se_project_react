import "./ModalWithForm.css";
import closebutton from "../../assets/closebutton.svg";
import useModalClose from "../../hooks/useModalClose";

const ModalWithForm = ({
  children,
  name,
  title,
  buttonText = "save",
  isOpen,
  closeActiveModal,
  onSubmit,
  isLoading = false,
}) => {
  useModalClose(isOpen, closeActiveModal);
  return (
    <div className={`modal ${isOpen ? "modal__opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={closeActiveModal}
          type="button"
          className="modal__close"
        >
          <img src={closebutton} alt="close icon" />
        </button>
        <form onSubmit={onSubmit} className="modal__form" name={name}>
          {children}
          <button type="submit" className="modal__submit" disabled={isLoading}>
            {isLoading ? "Saving..." : buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalWithForm;
