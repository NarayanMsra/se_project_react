import "./DeleteModal.css";
import closebutton from "../../assets/closebutton.svg";

const DeleteModal = ({
  activeModal,
  closeActiveModal,
  handleDeleteCard,
  card,
}) => {
  if (activeModal !== "delete-modal") return null;
  const onCardDelete = () => {
    handleDeleteCard(card);
  };

  return (
    <div
      className={`modal ${activeModal === "delete-modal" && "modal__opened"}`}
    >
      <div className="modal__form modal__content delete__modal_content">
        <button
          className="modal__close"
          type="button"
          onClick={closeActiveModal}
        >
          <img src={closebutton} alt="close icon" />
        </button>

        <p className="delete__modal_text">
          Are you sure you want to delete {card.name}. This action is
          irreversible.
        </p>
        <div className="delete__modal_button">
          <button className="delete__confirm_modal" onClick={onCardDelete}>
            Yes, delete item
          </button>
          <button className="delete__cancel_modal" onClick={closeActiveModal}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
