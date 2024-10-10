import "./App.css";
import Chat from "./components/chat/chat";
import Detail from "./components/detail/detail";
import List from "./components/list/list";

import Auth from "./components/Auth/auth";

function App() {
  const user = false;

  return (
    <div className="container">
      {user ? (
        <>
          <List />
          <Chat />
          <Detail />
        </>
      ) : (
        <Auth />
      )}
    </div>
  );
}

export default App;
