import { createContext, useEffect, useRef, useState } from "react";

export const GameContext = createContext();

const GameProvider = ({ children }) => {
  const [updatedGame, setUpdateGame] = useState(null);
  const ws = useRef(null);

  useEffect(() => {
    if (ws.current == null || ws.current.readyState != WebSocket.OPEN) {
      ws.current = new WebSocket(import.meta.env.VITE_WEB_SOCKET_URL);
    }
    ws.current.onopen = function () {
      console.log("open connection");
    };
    ws.current.onmessage = function (ev) {
      console.log("message received");
      setUpdateGame(JSON.parse(ev.data));
    };

    return () => {
      ws.current?.close();
    };
  }, []);

  return (
    <GameContext.Provider value={updatedGame}>{children}</GameContext.Provider>
  );
};

export default GameProvider;