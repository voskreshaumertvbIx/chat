
import ChatList from './chatList/chatList';
import styles from './style.module.css'
import UserInfo from './userInfo/userInfo';
const List = () => {
  return (
    <div className={styles.list}>
      <UserInfo/>
      <ChatList/>
    </div>
  );
}

export default List;
