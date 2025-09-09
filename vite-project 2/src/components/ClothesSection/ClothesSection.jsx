import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

const ClothesSection = ({
  clothingItems = [],
  onCardClick,
  handleAddClick,
}) => {
  return (
    <div className="cloths__section">
      <div>
        <p>Your Items</p>
        <button className="cloths__section_button" onClick={handleAddClick}>
          + Add New
        </button>
      </div>
      <ul className="cloths-section__items">
        {clothingItems.map((item) => (
          <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
        ))}
      </ul>
    </div>
  );
};

export default ClothesSection;
