import "./App.css";
import Chat from "./components/chat/chat";
import Detail from "./components/detail/detail";
import List from "./components/list/list";

import Auth from "./components/Auth/auth";
import ToastNotification from "./components/notification/toastnotification";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import { useUserStore } from "./lib/userStore";

function App() {
  const {currentUser, isLoading, fetchUserInfo} = useUserStore();
  useEffect(()=>{
    const unSub = onAuthStateChanged(auth, (user)=>{
     fetchUserInfo(user?.uid)

    })
    return()=>unSub();
 
  }, [fetchUserInfo])
  console.log(currentUser);
  if(isLoading) return <div className="loading">Loading...</div>
  return (
    <div className="container">
      {currentUser ? (
        <>
         <List/>
         <Chat/>
          <Detail />
        </>
      ) : (
        <Auth />
      )}
     <ToastNotification/>
    </div>
  );
}

export default App;
