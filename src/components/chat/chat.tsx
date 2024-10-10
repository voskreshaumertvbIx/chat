import EmojiPicker from "emoji-picker-react";
import styles from "./style.module.css";
import { useEffect, useRef, useState } from "react";

type EmojiObj = {
  emoji: string;
};

const Chat = () => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  const endRef = useRef<HTMLDivElement | null>(null);  

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleEmoji = (e: EmojiObj) => {
    setText((prev) => prev + e.emoji);
    setOpen(false);
  };

  return (
    <div className={styles.chat}>
      <div className={styles.top}>
        <div className={styles.user}>
          <img src="./img/user.png" alt="" />
          <div className={styles.texts}>
            <span>Bond TYTY</span>
            <p>Lorem ipsum dolor sit amet consectetur</p>
          </div>
        </div>

        <div className={styles.icons}>
          <img src="./img/phone.png" alt="" />
          <img src="/img/camera.png" alt="" />
          <img src="/img/info.png" alt="" />
        </div>
      </div>
      <div className={styles.center}>
        <div className={styles.message}>
          <img src="./img/user.png" alt="" />
          <div className={styles.texts}>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi officia asperiores sequi blanditiis exercitationem labore cum omnis ex facilis debitis, veniam quod voluptate distinctio beatae repellendus ratione, rerum deserunt cupiditate?</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className={styles.message_own}>
          <div className={styles.texts}>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum sint incidunt alias, laboriosam molestiae quos eum aliquam facere quam consequuntur maxime placeat? Sit numquam quibusdam perferendis praesentium impedit ullam ea.
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div ref={endRef}></div>  
      </div>
      <div className={styles.bottom}>
        <div className={styles.icons}>
          <img src="./img/image.png" alt="upload image" />
          <img src="./img/chatcamera.png" alt="camera" />
          <img src="./img/microphone.png" alt="microfone" />
        </div>
        <input
          type="text"
          value={text}
          placeholder="Type a messge..."
          onChange={(e) => setText(e.target.value)}
        />
        <div className={styles.emoji}>
          <img src="./img/emoji.png" alt="" onClick={() => setOpen(!open)} />
          <div className={styles.picker}>
            <EmojiPicker open={open} onEmojiClick={handleEmoji} />
          </div>
        </div>
        <button className={styles.sendButton}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
