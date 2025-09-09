import "./ItemModal.css";
import closebutton from "../../assets/closebutton.svg";
import useModalClose from "../../hooks/useModalClose";

const ItemModal = ({ activeModal, closeActiveModal, card, handleDelete }) => {
  const isOpen = activeModal === "preview";
  useModalClose(isOpen, closeActiveModal);

  return (
    <div className={`modal ${isOpen ? "modal__opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={closeActiveModal}
          type="button"
          className="modal__close"
        >
          <img src={closebutton} alt="close icon" />
        </button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>

          <button className="modal__delete-button" onClick={handleDelete}>
            Delete Item
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
