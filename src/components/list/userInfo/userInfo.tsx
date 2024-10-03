import styles from "./styles.module.css";
const UserInfo = () => {
  return (
    <section className={styles.userInfo}>
      <div className={styles.user}>
        <img src="./img/user.png" alt="" />
        <h2>James Bond</h2>
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
