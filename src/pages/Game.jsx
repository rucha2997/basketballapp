import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { GameContext } from "../../context/game.context";

const Game = () => {
  let game = useLoaderData();
  const updateGame = useContext(GameContext);
  if (updateGame?.id == game.id) {
    game = updateGame;
  }
  game.gametimeDisplay = new Date(game.gametime).toLocaleString();
  return (
    <>
      <div className="row">
        <div className="col">
          <h1>
            BasketBall Game - {game.hometeam} vs {game.awayteam}
          </h1>
        </div>
      </div>
      <hr />
      {!game.isOver && !game.isLive && (
        <>
          <div className="row">
            <div className="col">
              <h2>Game Starts: {game.gametimeDisplay}</h2>
            </div>
          </div>
          <hr />
        </>
      )}

      <div className="row">
        <div className="col">
          <h2>Home Team: {game.hometeam}</h2>
        </div>
        <div className="col">
          <h2>Away Team: {game.awayteam}</h2>
        </div>
      </div>

      {(game.isOver || game.isLive) && (
        <>
          <hr />
          <div className="row">
            <div className="col">
              <h2>Score</h2>
            </div>
            <div className="col">
              <h2>
                {game.hometeam} - {game.hometeamScore}
              </h2>
            </div>
            <div className="col">
              <h2>
                {game.awayteam}- {game.awayteamScore}
              </h2>
            </div>
          </div>
          <hr />
        </>
      )}

      {game.isOver && (
        <div className="row">
          <div className="col">
            <h2>Game Over</h2>
          </div>
        </div>
      )}

      {game.isLive && (
        <div className="row">
          <div className="col">
            <h2>Quarter: {game.quarter}</h2>
          </div>
          <div className="col">
            <h2>
              Time: {game.minutes}:{game.seconds}
            </h2>
          </div>
        </div>
      )}
    </>
  );
};

export default Game;