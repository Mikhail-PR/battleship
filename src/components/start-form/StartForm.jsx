import React from "react";
import { Link } from "react-router-dom";

function StartForm({ setGameProps }) {
  const defaultName = "Player";
  const defaultSide = "right";

  const [name, setName] = React.useState(defaultName);
  const [side, setSide] = React.useState(defaultSide);

  const changeName = (e) => {
    const newName = e.target.value;
    setName(newName);
  };

  const clearDefaulName = (e) => {
    const name = e.target.value;

    if (name === defaultName) {
      setName("");
    }
  };

  const setDefaulName = (e) => {
    const name = e.target.value;

    if (name === "") {
      setName(defaultName);
    }
  };

  const changeSide = (e) => {
    const newSide = e.target.value;
    setSide(newSide);
  };

  const submit = () => setGameProps({ name, side });

  return (
    <form className="start-form">
      <div className="start-form__wrapper">
        <fieldset className="start-form__fieldset">
          <legend className="start-form__legend">
            <h2 className="start-form__title">Имя</h2>
          </legend>
          <input
            className="start-form__input-name"
            name="name"
            value={name}
            onChange={changeName}
            onClick={clearDefaulName}
            onBlur={setDefaulName}
          />
        </fieldset>

        <fieldset className="start-form__fieldset">
          <legend className="start-form__legend">
            <h2 className="start-form__title">Сторона</h2>
          </legend>

          <label className="start-form__radio-wrapper">
            <input
              className="start-form__input-side"
              type="radio"
              name="side"
              value={"left"}
              checked={side === "left"}
              onChange={changeSide}
            />
            <div className="start-form__input-side-text">левая😰</div>
          </label>

          <label className="start-form__radio-wrapper">
            <input
              className="start-form__input-side"
              type="radio"
              name="side"
              value={"right"}
              checked={side === "right"}
              onChange={changeSide}
            />
            <div className="start-form__input-side-text">правая😎</div>
          </label>
        </fieldset>
      </div>
      <div className="start-form__btn-wrapper">
        <Link to="/game">
          <button className="start-form__btn" onClick={submit}>
            Играть
          </button>
        </Link>
      </div>
    </form>
  );
}

export default StartForm;
