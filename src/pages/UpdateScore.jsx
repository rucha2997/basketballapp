import { useContext, useEffect, useState } from "react";
import {
  useLoaderData,
  useNavigate,
  useParams,
} from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import { toast } from "react-toastify";
import { serverErrorCheck } from "../helpers/error.helper";



const UpdateScore = () => {
  const gameData = useLoaderData();
  const { userId } = useContext(AuthContext);
  const { gameId } = useParams();
  const navigate = useNavigate();
  const [hideForm, setHideForm] = useState(false);
  const [formData, setSetFormData] = useState({
    minutes: "",
    seconds: "",
    quarter: "",
    hometeamScore: "",
    awayteamScore: "",
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (!gameData || !userId) return;

    if (+gameData.userId !== +userId) {
      navigate("/logout");
      return;
    }

    setSetFormData({
      minutes: gameData.minutes ?? "",
      seconds: gameData.seconds ?? "",
      quarter: gameData.quarter ?? "",
      hometeamScore: gameData.hometeamScore ?? "",
      awayteamScore: gameData.awayteamScore ?? "",
    });
    setHideForm(!gameData.isOver && !gameData.isLive);
  }, [gameData, userId]);

  function setSingleFormData(value, property) {
    setSetFormData((prev) => {
      prev[property] = value;
      return { ...prev };
    });
  }

  async function onStartGame() {
    await updateGame(
      `http://localhost:3000/game/${gameId}/start`,
      "Game Started!"
    );
    setHideForm(false);
  }

  async function onEndGame() {
    await updateGame(`http://localhost:3000/game/${gameId}/end`, "Game Ended!");
  }

  async function onSubmit() {
    await updateGame(
      `http://localhost:3000/game/${gameId}/updatescore`,
      "Game updated!",
      formData
    );
  }

  async function updateGame(url, successMessage, postData = null) {
    setFormErrors({});
    const requestOptions = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
    };

    if (postData) {
      requestOptions["body"] = JSON.stringify(postData);
    }
    const response = await fetch(url, requestOptions);

    if (response.status === 200) {
      toast(successMessage);
    }

    if (response.status === 400) {
      const json = await response.json();
      setFormErrors(json.errors);
    }

    await serverErrorCheck(response);

    if (response.status == 403) {
      navigate("/logout");
    }
  }

  if (hideForm) {
    return (
      <>
        <div className="row">
          <div className="col">
            <h1>Update Score</h1>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <button onClick={onStartGame} className="w-100 btn btn-success">
              Start Game
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="row">
        <div className="col">
          <h1>Update Score</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <label htmlFor="hometeamScore" className="form-label">
            Home Team Score
          </label>
          <input
            onChange={(e) => setSingleFormData(e.target.value, "hometeamScore")}
            value={formData.hometeamScore}
            type="number"
            id="hometeamScore"
            className={
              !formErrors?.hometeamScore
                ? "form-control"
                : "form-control is-invalid"
            }
          />
          {formErrors?.hometeamScore && (
            <div className="invalid-feedback">{formErrors.hometeamScore}</div>
          )}
        </div>
        <div className="col-6">
          <label htmlFor="awayteamScore" className="form-label">
            Away Team Score
          </label>
          <input
            onChange={(e) => setSingleFormData(e.target.value, "awayteamScore")}
            type="number"
            value={formData.awayteamScore}
            id="awayteamScore"
            className={
              !formErrors?.awayteamScore
                ? "form-control"
                : "form-control is-invalid"
            }
          />
          {formErrors?.awayteamScore && (
            <div className="invalid-feedback">{formErrors.awayteamScore}</div>
          )}
        </div>
      </div>
      <div className="row">
        <div className="col">
          <label htmlFor="quarter" className="form-label">
            Quater
          </label>
          <input
            onChange={(e) => setSingleFormData(e.target.value, "quarter")}
            type="number"
            value={formData.quarter}
            id="quarter"
            className={
              !formErrors?.quarter ? "form-control" : "form-control is-invalid"
            }
          />
          {formErrors?.quarter && (
            <div className="invalid-feedback">{formErrors.quarter}</div>
          )}
        </div>
        <div className="col">
          <label htmlFor="minutes" className="form-label">
            Minutes
          </label>
          <input
            onChange={(e) => setSingleFormData(e.target.value, "minutes")}
            value={formData.minutes}
            type="number"
            id="minutes"
            className={
              !formErrors?.minutes ? "form-control" : "form-control is-invalid"
            }
          />
          {formErrors?.minutes && (
            <div className="invalid-feedback">{formErrors.minutes}</div>
          )}
        </div>
        <div className="col">
          <label htmlFor="seconds" className="form-label">
            Seconds
          </label>
          <input
            onChange={(e) => setSingleFormData(e.target.value, "seconds")}
            value={formData.seconds}
            type="number"
            id="seconds"
            className={
              !formErrors?.seconds ? "form-control" : "form-control is-invalid"
            }
          />
          {formErrors?.seconds && (
            <div className="invalid-feedback">{formErrors.seconds}</div>
          )}
        </div>
      </div>
      <div className="row mt-3">
        <div className="col">
          <button onClick={onSubmit} className="btn btn-primary w-100">
            Update Score
          </button>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col">
          <button onClick={onEndGame} className="btn btn-danger w-100">
            End Game
          </button>
        </div>
      </div>
    </>
  );
};

export default UpdateScore;