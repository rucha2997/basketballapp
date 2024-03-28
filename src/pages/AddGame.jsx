import GameForm from "../components/GameForm";
import { submitGameToServer } from "../helpers/game.helper";

/**
 *
 * @param {{request: Request}} param0
 */
export const addGameAction = async ({ request }) => {
  return await submitGameToServer(
    request,
    import.meta.env.VITE_API_URL +"/game",
    "POST"
  );
};

const AddGame = () => {
  return <GameForm title="Add Game" />;
};

export default AddGame;