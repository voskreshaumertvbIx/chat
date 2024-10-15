import { React, useState } from "react";
import styles from "./style.module.css";
import { collection, query, where, getDocs, setDoc, serverTimestamp, doc, arrayUnion,updateDoc, getDoc } from "firebase/firestore";
import { db } from "../../../../lib/firebase";
import { useUserStore } from "../../../../lib/userStore";



const AddUser = () => {
  const [user, setUser] = useState(null);

  const { currentUser }= useUserStore()
  const handleSearch = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");

    try {
      const userRef = collection(db, "users");
      const q = query(userRef, where("username", "==", username));
      const querySnapShot = await getDocs(q);
      if (!querySnapShot.empty) {
        setUser(querySnapShot.docs[0].data());
      }
    } catch (err) {
      console.log(err);
    }
  };

const handleAdd = async () =>{

  const chatRef = collection(db, 'chats');
  const userChatsRef = collection(db, 'userchats')

  try{
    const newChatRef = doc(chatRef);

    await setDoc(newChatRef,{
      createdAt: serverTimestamp(),
      messages:[],
    })
    await updateDoc(doc(userChatsRef, user.id),{
      chats:arrayUnion({
        chatId: newChatRef.id,
        lastMessage:"",
        receiverId: currentUser.id,
        updateAt: Date.now(),
      })
    })
    await updateDoc(doc(userChatsRef, currentUser.id),{
      chats:arrayUnion({
        chatId: newChatRef.id,
        lastMessage:"",
        receiverId: user.id,
        updateAt: Date.now(),
      })
    })
    console.log(newChatRef.id)
  } catch(err){
    console.log(err)
  }
}


  return (
    <div className={styles.addUser}>
      <form onSubmit={handleSearch} className={styles.form}>
        <input
          type="text"
          placeholder="Username"
          name="username"
          className={styles.input}
        />
        <button className={styles.searchButton}>Search</button>
      </form>
      {user && (
        <div className={styles.user}>
          <div className={styles.detail}>
            <img
              src={user.avatar || "./img/user.png"}
              alt="user"
              className={styles.userImage}
            />
            <span className={styles.username}>{user.username}</span>
          </div>
          <button onClick={handleAdd}  className={styles.addUserButton}>Add User</button>
        </div>
      )}
    </div>
  );
};

export default AddUser;
