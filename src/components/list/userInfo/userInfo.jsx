import { useUserStore } from "../../../lib/userStore";
import styles from "./styles.module.css";
const UserInfo = () => {
  const {currentUser} = useUserStore();
  return (
    <section className={styles.userInfo}>
      <div className={styles.user}>
        <img src={currentUser.avatar || "./img/user.png"} alt="user" />
        <h2>{currentUser.username}</h2>
      </div>
      <div className={styles.icons}>
        <img src="./img/more.png" alt="more" />
        <img src="./img/camera.png" alt="camera" />
        <img src="./img/edit.png" alt="" />
      </div>
    </section>
  );
};

export default UserInfo;
