import React from 'react';
import styles from './style.module.css';

const AddUser = () => {
  return (
    <div className={styles.addUser}>
      <form className={styles.form}>
        <input type="text" placeholder="Username" name="username" className={styles.input} />
        <button className={styles.searchButton}>Search</button>
      </form>
      <div className={styles.user}>
        <div className={styles.detail}>
          <img src="./img/user.png" alt="user" className={styles.userImage} />
          <span className={styles.username}>Jonh Doe</span>
        </div>
        <button className={styles.addUserButton}>Add User</button>
      </div>
    </div>
  );
};

export default AddUser;
