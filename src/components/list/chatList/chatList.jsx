import { useEffect, useState } from "react";
import styles from "./style.module.css";
import AddUser from "./addUser/addUser";
import { useUserStore } from "../../../lib/userStore";
import { onSnapshot } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useChatStore } from "../../../lib/chatStore";
const ChatList = () => {
  const [addVersion, setAddVersion] = useState(false);
  const [chats, setChats] = useState([]);
  const [search, setSearch] = useState('')

  const { currentUser } = useUserStore();
  const { changeChat } = useChatStore();
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

  const handleSelect = async (selectedChat) => {
    const userChats = chats.map((item) => {
      const { user, ...rest } = item;
      return rest;
    });
  
    const chatIndex = userChats.findIndex(
      (item) => item.chatId === selectedChat.chatId
    );
    
    if (chatIndex !== -1) {
      userChats[chatIndex].isSeen = true;
    }
  
    const userChatsRef = doc(db, "userchats", currentUser.id);
  
    try {
      await updateDoc(userChatsRef, {
        chats: userChats,
      });
      changeChat(selectedChat.chatId, selectedChat.user);
    } catch (err) {
      console.log(err);
    }
  };
  
  const filteredChats = chats.filter(e=>e.user.username.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className={styles.chatList}>
      <div className={styles.search}>
        <div className={styles.searchBar}>
          <img src="./img/search.png" alt="search" />
          <input type="text" placeholder="Search" onChange={(e)=>setSearch(e.target.value)}/>
        </div>
        <img
          src={addVersion ? "./img/minus.png" : "./img/add.png"}
          alt="add"
          className={styles.add}
          onClick={() => setAddVersion(!addVersion)}
        />
      </div>
      {filteredChats.map((chat) => (
        <div
          className={styles.item}
          key={chat.chatId}
          onClick={() => handleSelect(chat)}
          style={{ backgroundColor: chat?.isSeen ? "transparent" : "#5183fe" }}
        >
          <img
            className={styles.avatar}
            src={chat.user.avatar || "./img/user.png"}
            alt=""
          />
          <div className={styles.texts}>
            <span>{chat.user.blocked.includes(currentUser.id) ? 'user': chat.user.username}</span>
            <p className={styles.lastmessage}>{chat.lastMessage}</p>
          </div>
        </div>
      ))}

      {addVersion && <AddUser />}
    </div>
  );
};

export default ChatList;
