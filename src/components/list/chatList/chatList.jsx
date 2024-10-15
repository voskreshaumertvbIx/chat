import { useEffect, useState } from "react";
import styles from "./style.module.css";
import AddUser from "./addUser/addUser";
import { useUserStore } from "../../../lib/userStore";
import { onSnapshot } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
const ChatList = () => {
  const [addVersion, setAddVersion] = useState(false);
  const [chats, setChats] = useState([]);

  const { currentUser } = useUserStore();
  useEffect(() => {
    const unSub = onSnapshot(
      doc(db, "userchats", currentUser.id),
      async (res) => {
        const items = res.data().chats;

        const promisses = items.map(async (item) => {
          const userDocRef = doc(db, "users", item.receiverId);
          const userDocSnap = await getDoc(userDocRef);
          const user = userDocSnap.data();

          return { ...item, user };
        });
        const chatData = await Promise.all(promisses);

        setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
      }
    );
    return () => unSub();
  }, [currentUser.id]);
  return (
    <div className={styles.chatList}>
      <div className={styles.search}>
        <div className={styles.searchBar}>
          <img src="./img/search.png" alt="search" />
          <input type="text" placeholder="Search" />
        </div>
        <img
          src={addVersion ? "./img/minus.png" : "./img/add.png"}
          alt="add"
          className={styles.add}
          onClick={() => setAddVersion(!addVersion)}
        />
      </div>
      {chats.map((chat) => (
        <div className={styles.item} key={chat.chatId}>
          <img
            className={styles.avatar}
            src={chat.user.avatar || "./img/user.png"}
            alt=""
          />
          <div className={styles.texts}>
            <span>{chat.user.username}</span>
            <p className={styles.lastmessage}>{chat.lastMessage}</p>
          </div>
        </div>
      ))}

      {addVersion && <AddUser />}
    </div>
  );
};

export default ChatList;
