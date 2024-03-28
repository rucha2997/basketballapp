import { Form, useActionData } from "react-router-dom";

const GameForm = ({ title, game }) => {
  const formErrors = useActionData();
  let gametimeDefault;
  if (game?.gametime) {
    let gametime = new Date(game.gametime);
    gametime.setMinutes(gametime.getMinutes() - gametime.getTimezoneOffset());
    gametimeDefault = gametime.toISOString().slice(0, 16);
  }

  return (
    <>
      <div className="row">
        <div className="col">
          <h1>{title}</h1>
        </div>
      </div>
      <Form method="POST">
        <div className="row">
          <div className="col-6">
            <label htmlFor="hometeam" className="form-label">
              Home Team
            </label>
            <input
              name="hometeam"
              type="text"
              id="hometeam"
              defaultValue={game?.hometeam}
              className={
                !formErrors?.hometeam
                  ? "form-control"
                  : "form-control is-invalid"
              }
            />
            {formErrors?.hometeam && (
              <div className="invalid-feedback">{formErrors.hometeam}</div>
            )}
          </div>
          <div className="col-6">
            <label htmlFor="awayteam" className="form-label">
              Away Team
            </label>
            <input
              name="awayteam"
              type="text"
              id="awayteam"
              defaultValue={game?.awayteam}
              className={
                !formErrors?.awayteam
                  ? "form-control"
                  : "form-control is-invalid"
              }
            />
            {formErrors?.awayteam && (
              <div className="invalid-feedback">{formErrors.awayteam}</div>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label htmlFor="gametime" className="form-label">
              Game Time
            </label>
            <input
              name="gametime"
              defaultValue={gametimeDefault}
              className={
                !formErrors?.gametime
                  ? "form-control"
                  : "form-control is-invalid"
              }
              type="datetime-local"
              id="gametime"
            />
            {formErrors?.gametime && (
              <div className="invalid-feedback">{formErrors.gametime}</div>
            )}
          </div>
        </div>
        <div className="row mt-3 mb-3">
          <div className="col">
            <button type="submit" className="btn btn-success w-100">
              {title}
            </button>
          </div>
        </div>
      </Form>
    </>
  );
};

export default GameForm;