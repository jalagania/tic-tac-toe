import "./GameBoard.css";
import { useGlobalContext } from "../context";
import logo from "../images/logo.svg";
import MarkBox from "./MarkBox";
import ScoreBox from "./ScoreBox";

function GameBoard() {
  const ctx = useGlobalContext();

  const myArray = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

  function handleRestart() {
    ctx.setShowModal(true);
    ctx.setRestarting(true);
  }

  return (
    <div className="game-board">
      <img src={logo} alt="logo" className="logo" />
      <div className="player-turn-box">
        <svg
          viewBox="0.27 0.27 63.46 63.46"
          className={`icon-x ${ctx.turnIsX ? "" : "hidden"}`}
          width="64"
          height="64"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z"
            fillRule="evenodd"
          />
        </svg>

        <svg
          viewBox="0.27 0.27 63.46 63.46"
          className={`icon-o ${ctx.turnIsX ? "hidden" : ""}`}
          width="64"
          height="64"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z" />
        </svg>
        <p className="player-turn-text">turn</p>
      </div>
      <div className="btn-restart" onClick={handleRestart}>
        <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.524 0h-1.88a.476.476 0 0 0-.476.499l.159 3.284A9.81 9.81 0 0 0 9.835.317C4.415.317-.004 4.743 0 10.167.004 15.597 4.406 20 9.835 20a9.796 9.796 0 0 0 6.59-2.536.476.476 0 0 0 .019-.692l-1.348-1.349a.476.476 0 0 0-.65-.022 6.976 6.976 0 0 1-9.85-.63 6.987 6.987 0 0 1 .63-9.857 6.976 6.976 0 0 1 10.403 1.348l-4.027-.193a.476.476 0 0 0-.498.476v1.881c0 .263.213.476.476.476h7.944A.476.476 0 0 0 20 8.426V.476A.476.476 0 0 0 19.524 0Z" />
        </svg>
      </div>
      {myArray.map((item) => (
        <MarkBox key={item} className={item} />
      ))}
      <ScoreBox
        className="x-score-box"
        mark="X"
        player={ctx.playerX}
        score={ctx.scoreX}
      />
      <ScoreBox
        className="ties-score-box"
        mark="Ties"
        player={""}
        score={ctx.scoreT}
      />
      <ScoreBox
        className="o-score-box"
        mark="O"
        player={ctx.playerO}
        score={ctx.scoreO}
      />
    </div>
  );
}

export default GameBoard;
