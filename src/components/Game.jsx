import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GameContext } from "../../context/game.context";

const Game = ({ game }) => {
  const navigate = useNavigate();
  const updateGame = useContext(GameContext);
  if (updateGame?.id == game.id) {
    game = updateGame;
  }
  game.gametimeDisplay = new Date(game.gametime).toLocaleString();
  const gameTime = (
    <div className="col">
      GameTime Quarter: {game.quarter} - {game.minutes}:{game.seconds}
    </div>
  );
  let color = "#000";
  if (game.isOver) {
    color = "#0000AA";
  } else if (game.isLive) {
    color = "#00AA00";
  }

  function goToGame() {
    navigate(`/game/${game.id}`);
  }
  return (
    <article
      onClick={goToGame}
      className="mt-3 mb-3 p-3 text-center"
      style={{ border: `dotted 3px ${color}`, cursor: "pointer" }}
    >
      <div className="row ">
        <div className="col">Home Team: {game.hometeam}</div>
        <div className="col">Away Team: {game.awayteam}</div>
        {(game.isOver || game.isLive) && gameTime}
        {!(game.isOver || game.isLive) && (
          <div className="col">Start Time: {game.gametimeDisplay}</div>
        )}
      </div>
      <div className="row ">
        <div className="col">{game.hometeamScore}</div>
        <div className="col ">{game.awayteamScore}</div>
        <div className="col"></div>
      </div>
    </article>
  );
};

export default Game;