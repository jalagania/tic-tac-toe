import "./Menu.css";
import { useGlobalContext } from "../context";
import logo from "../images/logo.svg";

function Menu() {
  const ctx = useGlobalContext();

  function handleButtonX() {
    ctx.setPlayerPickedX(true);
  }

  function handleButtonO() {
    ctx.setPlayerPickedX(false);
  }

  function handleButtonCPU() {
    ctx.setGameAgainstCPU(true);
    ctx.setShowMenu(false);
    ctx.setShowGame(true);
    ctx.setPlayerX(ctx.playerPickedX ? "(You)" : "(CPU)");
    ctx.setPlayerO(ctx.playerPickedX ? "(CPU)" : "(You)");
  }

  function handleButtonPlayer() {
    ctx.setGameAgainstCPU(false);
    ctx.setShowMenu(false);
    ctx.setShowGame(true);
    ctx.setPlayerX(ctx.playerPickedX ? "(P1)" : "(P2)");
    ctx.setPlayerO(ctx.playerPickedX ? "(P2)" : "(P1)");
  }

  return (
    <div className="menu-box">
      <img src={logo} alt="logo" className="logo" />
      <div className="pick-player-box">
        <p className="pick-player-text">Pick player 1's mark</p>
        <div className="player-sign-box">
          <div
            className={`x-sign-box ${ctx.playerPickedX ? "selected" : ""}`}
            onClick={handleButtonX}
          >
            <svg
              viewBox="0.27 0.27 63.46 63.46"
              className="player-sign"
              width="64"
              height="64"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z"
                fillRule="evenodd"
              />
            </svg>
          </div>
          <div
            className={`o-sign-box ${ctx.playerPickedX ? "" : "selected"}`}
            onClick={handleButtonO}
          >
            <svg
              viewBox="0.27 0.27 63.46 63.46"
              className="player-sign"
              width="64"
              height="64"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z" />
            </svg>
          </div>
        </div>
        <p className="remember-text">Remember: X goes first</p>
      </div>
      <button className="btn-game-cpu" onClick={handleButtonCPU}>
        New Game (vs CPU)
      </button>
      <button className="btn-game-player" onClick={handleButtonPlayer}>
        New Game (vs player)
      </button>
    </div>
  );
}

export default Menu;
