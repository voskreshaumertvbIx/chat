
import { useState } from 'react';
import styles from './style.module.css'
import AddUser from './addUser/addUser';
const ChatList = () => {
  const [addVersion, setAddVersion] = useState(false);
  return (
    <div className={styles.chatList}>

      <div className={styles.search}>
        <div className={styles.searchBar}>
          <img src="./img/search.png" alt="search" />
          <input type="text" placeholder='Search' />
        </div>
        <img src={addVersion ?  './img/minus.png' : './img/add.png' } alt="add"  className={styles.add} onClick={()=>setAddVersion(!addVersion)}/>
      </div>
      <div className={styles.item}>
        <img className={styles.avatar} src="./img/user.png" alt="" />
        <div className={styles.texts}>
          <span>James Bond</span>
          <p className={styles.lastmessage}>hello</p>
        </div>
      </div>
     {addVersion && <AddUser/>}
    </div>
  );
}

export default ChatList;
