import { useLoaderData } from "react-router-dom";
import GameForm from "../components/GameForm";
import { submitGameToServer } from "../helpers/game.helper";

export const updateGameAction = async ({ params, request }) => {
  return await submitGameToServer(
    request,
    import.meta.env.VITE_API_URL + `/game/${params.gameId}`,
    "PUT"
  );
};

const UpdateGame = () => {
  const gameData = useLoaderData();

  return <GameForm title="Update Game" game={gameData} />;
};

export default UpdateGame;