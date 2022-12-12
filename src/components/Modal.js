import { useGlobalContext } from "../context";
import "./Modal.css";
import x from "../images/icon-x.svg";
import o from "../images/icon-o.svg";

function Modal() {
  const ctx = useGlobalContext();
  const boxes = document.querySelectorAll(".mark-box");

  function handleButtonGray() {
    ctx.setShowModal(false);
    if (ctx.restarting) {
      ctx.setRestarting(false);
    } else {
      ctx.setShowMenu(true);
      ctx.setShowGame(false);
      ctx.setPlayerPickedX(true);
      ctx.setGameAgainstCPU(false);
      ctx.setScoreX(0);
      ctx.setScoreO(0);
      ctx.setScoreT(0);
      ctx.resetAll(boxes);
    }
  }

  function handleButtonYellow() {
    if (ctx.restarting) {
      ctx.setRestarting(false);
    }
    ctx.setShowModal(false);
    ctx.resetAll(boxes);
  }

  return (
    <div className="modal-window">
      <div className="modal-text-box">
        {!ctx.restarting && (
          <p className="modal-result-text">{ctx.modalResultText}</p>
        )}
        {!ctx.restarting && (
          <div className="modal-winner-box">
            <img
              src={x}
              alt="icon"
              className={`winner-icon ${ctx.winner === "x" ? "" : "hidden"}`}
            />
            <img
              src={o}
              alt="icon"
              className={`winner-icon ${ctx.winner === "o" ? "" : "hidden"}`}
            />
            <p
              className={`modal-winner-text ${
                ctx.winner === "x" ? "x-color" : ""
              } ${ctx.winner === "o" ? "o-color" : ""} ${
                ctx.winner === "" ? "t-color" : ""
              }`}
            >
              {ctx.winner ? "takes the round" : "round tied"}
            </p>
          </div>
        )}
        {ctx.restarting && <p className="modal-restart-text">Restart game?</p>}
        <button className="btn-modal-gray" onClick={handleButtonGray}>
          {ctx.restarting ? "No, cancel" : "Quit"}
        </button>
        <button className="btn-modal-yellow" onClick={handleButtonYellow}>
          {ctx.restarting ? "Yes, restart" : "Next round"}
        </button>
      </div>
      <div className="modal-bg"></div>
    </div>
  );
}

export default Modal;
