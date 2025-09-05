import SideBar from "../SideBar/SideBar";
import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";

const Profile = ({ onCardClick }) => {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
      </section>
      <section className="profile__clothing-Items">
        <ClothesSection onCardClick={onCardClick} />
      </section>
    </div>
  );
};

export default Profile;
