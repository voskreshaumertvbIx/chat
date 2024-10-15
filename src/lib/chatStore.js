import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import { create } from "zustand";
import { useUserStore } from "./userStore";


export const useChatStore = create((set) => ({
  chatId: null,
  user: null,
  currentBlock: false,
  recieverBlock: false,
  changeChat: (chatId, user) => {
    const currentUser = useUserStore.getState().currentUser;

    if (user.blocked.includes(currentUser.id)) {
      return set({
        chatId,
        user: null,
        currentBlock: true,
        recieverBlock: false,
      });
    }
    if (user.blocked.includes(user.id)) {
      return set({
        chatId,
        user: null,
        currentBlock: false,
        recieverBlock: true,
      });
    }
  },
  changeBlock:()=>{
set((state)=>({...state, recieverBlock: !state.recieverBlock}))
  }
}));
