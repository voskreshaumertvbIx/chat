import EmojiPicker from "emoji-picker-react";
import styles from "./style.module.css";
import { useEffect, useRef, useState } from "react";
import {
  onSnapshot,
  doc,
  arrayUnion,
  updateDoc,
  getDoc,
} from "firebase/firestore"; 
import { db } from "../../lib/firebase";
import { useChatStore } from "../../lib/chatStore";
import { useUserStore } from "../../lib/userStore";
import upload from "../../lib/uload";

const Chat = () => {
  const [chat, setChats] = useState(null);
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [img, setImg] = useState({
    file: null,
    url: "",
  });

  const endRef = useRef(null);
  const { currentUser } = useUserStore();
  const { chatId, user , currentBlock, recieverBlock} = useChatStore();

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (chatId) {
      const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
        setChats(res.data());
      });
      return () => unSub();
    }
  }, [chatId]);

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
    setOpen(false);
  };
  const handleImage = (e) => {
    if (e.target.files[0]) {
      setImg({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleSend = async () => {
    if (text === "") return;
    let imgUrl = null;
    try {
      if (img.file) {
        imgUrl = await upload(img.file);
      }

      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          text,
          createdAt: new Date(),
          ...(imgUrl && { img: imgUrl }),
        }),
      });

      const userIDs = [currentUser.id, user.id];
      userIDs.forEach(async (id) => {
        const userChatref = doc(db, "userchats", id);
        const userChatsSnapshot = await getDoc(userChatref);
        if (userChatsSnapshot.exists()) {
          const userChatsData = userChatsSnapshot.data().chats || [];

          const chatIndex = userChatsData.findIndex((c) => c.chatId === chatId);
          if (chatIndex !== -1) {
            userChatsData[chatIndex].lastMessage = text;
            userChatsData[chatIndex].isSeen = id === currentUser.id;
            userChatsData[chatIndex].updatedAt = Date.now();

            await updateDoc(userChatref, {
              chats: userChatsData,
            });
          }
        }
      });
    } catch (err) {
      console.log(err);
    }
    setImg({
      file: null,
      url: "",
    });
    setText("");
  };

  return (
    <div className={styles.chat}>
      <div className={styles.top}>
        <div className={styles.user}>
          <img src={user?.avatar || "./img/user.png"} alt="" />
          <div className={styles.texts}>
            <span>{user?.username}</span>
            <p>Chat description</p>
          </div>
        </div>
        <div className={styles.icons}>
          <img src="./img/phone.png" alt="" />
          <img src="/img/camera.png" alt="" />
          <img src="/img/info.png" alt="" />
        </div>
      </div>
      <div className={styles.center}>
        {chat?.messages?.map((message) => (
          <div className={
            message.senderId === currentUser.id
              ? styles.message_own 
              : styles.message 
          } key={message.createdAt}>
            <div className={styles.texts}>
              {message.img && <img src={message.img} alt="" />}
              <p>{message.text}</p>
            </div>
          </div>
        ))}
        {img.url && (
          <div className={styles.message_own}>
            <div className={styles.texts}>
              <img src={img.url} alt="" />
            </div>
          </div>
        )}
        <div ref={endRef}></div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.icons}>
          <label htmlFor="file">
            <img src="./img/image.png" alt="upload image" />
          </label>

          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={handleImage}
          />
          <img src="./img/chatcamera.png" alt="camera" />
          <img src="./img/microphone.png" alt="microphone" />
        </div>
        <input
          type="text"
          value={text}
          placeholder={ (currentBlock || recieverBlock)? 'You cannot send a message' : "Type a message..."}
          onChange={(e) => setText(e.target.value)}
          disabled={currentBlock || recieverBlock}
        />
        <div className={styles.emoji}>
          <img src="./img/emoji.png" alt="" onClick={() => setOpen(!open)} />
          {open && (
            <div className={styles.picker}>
              <EmojiPicker onEmojiClick={handleEmoji} />
            </div>
          )}
        </div>
        <button className={styles.sendButton} onClick={handleSend} disabled={currentBlock || recieverBlock}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
