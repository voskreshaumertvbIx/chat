import styles from "./style.module.css";
const Detail = () => {
  return (
    <div className={styles.detail}>
      <div className={styles.user}>
        <img src="./img/user.png" alt="" />
        <h2>Pes Pes</h2>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas ea
          quis ab ipsa facilis aspernatur{" "}
        </p>
      </div>
      <div className={styles.info}>
        <div className={styles.option}>
          <div className={styles.title}>
            <span>Chat Settings</span>
            <img src="./img/slideup.png" alt="" />
          </div>
        </div>
        <div className={styles.option}>
          <div className={styles.title}>
            <span>Chat Settings</span>
            <img src="./img/slideup.png" alt="" />
          </div>
        </div>
        <div className={styles.option}>
          <div className={styles.title}>
            <span>Privacy & help</span>
            <img src="./img/slideup.png" alt="" />
          </div>
        </div>
        <div className={styles.option}>
          <div className={styles.title}>
            <span>Shared Photos</span>
            <img src="./img/arrowdown.png" alt="" />
          </div>
          <div className={styles.photos}>
            <div className={styles.photoItem}>
              <div className={styles.photodetails}>
                <img src="" alt="" />
                <span>photoName</span>
              </div>
              <img src="./img/download.png" alt="" className={styles.icon} />
            </div>
          </div>
        </div>
        <div className={styles.option}>
          <div className={styles.title}>
            <span>Shared Files</span>
            <img src="./img/slideup.png" alt="" />
          </div>  
        <button>Block User</button>
        </div>
      </div> 
     
    </div>
  );
};

export default Detail;
