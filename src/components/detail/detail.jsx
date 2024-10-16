import { arrayRemove, arrayUnion, updateDoc, doc } from "firebase/firestore";

import { useChatStore } from "../../lib/chatStore";
import { auth, db } from "../../lib/firebase";
import { useUserStore } from "../../lib/userStore";
import styles from "./style.module.css";
const Detail = () => {
const{chatId, user, currentBlock, recieverBlock, changeBlock } = useChatStore();
const {currentUser} = useUserStore()
  const handleBlock =  async () =>{
    if(!user) return;
    const userDocRef = doc(db, 'users', currentUser.id)
    try {
      await updateDoc(userDocRef,{
        blocked:recieverBlock? arrayRemove(user.id) : arrayUnion(user.id),

      })
      changeBlock();
    } catch (error) {
      
    }
  }
  return (
    <div className={styles.detail}>
      <div className={styles.user}>
        <img src={user?.avatar ||"./img/user.png"} alt="user" />
        <h2>{user?.name}</h2>
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
        <button className={styles.block} onClick={handleBlock}>{currentBlock ? 'You are Blocked' : recieverBlock ?  'User block' : 'Bloc User' }</button>
        
        <button onClick={()=>auth.signOut()} className={styles.logout}>Log out</button>
        </div>
      </div> 
     
    </div>
  );
};

export default Detail;
