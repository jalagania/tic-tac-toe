import "./MarkBox.css";
import { useGlobalContext } from "../context";
import x from "../images/icon-x.svg";
import o from "../images/icon-o.svg";
import xLine from "../images/icon-x-outline.svg";
import oLine from "../images/icon-o-outline.svg";

function MarkBox(props) {
  const ctx = useGlobalContext();

  function handleMouseEnter(event) {
    if (!event.target.classList.contains("marked")) {
      if (ctx.playerPickedX && ctx.turnIsX) {
        event.target.children[1].classList.remove("hidden");
      }
      if (!ctx.playerPickedX && !ctx.turnIsX) {
        event.target.children[3].classList.remove("hidden");
      }

      if (!ctx.gameAgainstCPU) {
        if (ctx.turnIsX) {
          event.target.children[1].classList.remove("hidden");
        } else {
          event.target.children[3].classList.remove("hidden");
        }
      }
    }
  }

  function handleMouseLeave(event) {
    event.target.closest(".mark-box").children[1].classList.add("hidden");
    event.target.closest(".mark-box").children[3].classList.add("hidden");
  }

  function handleClick(event) {
    if (!event.target.closest(".mark-box").classList.contains("marked")) {
      if (ctx.gameAgainstCPU) {
        if (ctx.playerPickedX && ctx.turnIsX) {
          ctx.playerMakesMove(
            event.target.closest(".mark-box"),
            "x",
            ctx.setUserMoves,
            ctx.userMoves
          );
          if (!ctx.gameIsOver) {
            ctx.setTurnIsX(false);
          }
        }

        if (!ctx.playerPickedX && !ctx.turnIsX) {
          ctx.playerMakesMove(
            event.target.closest(".mark-box"),
            "o",
            ctx.setUserMoves,
            ctx.userMoves
          );
          if (!ctx.gameIsOver) {
            ctx.setTurnIsX(true);
          }
        }
      } else {
        if (ctx.playerPickedX) {
          if (ctx.turnIsX) {
            ctx.playerMakesMove(
              event.target.closest(".mark-box"),
              "x",
              ctx.setP1moves,
              ctx.P1moves
            );
            if (!ctx.gameIsOver) {
              ctx.setTurnIsX(false);
            }
          } else {
            ctx.playerMakesMove(
              event.target.closest(".mark-box"),
              "o",
              ctx.setP2moves,
              ctx.P2moves
            );
            if (!ctx.gameIsOver) {
              ctx.setTurnIsX(true);
            }
          }
        } else {
          if (ctx.turnIsX) {
            ctx.playerMakesMove(
              event.target.closest(".mark-box"),
              "x",
              ctx.setP2moves,
              ctx.P2moves
            );
            if (!ctx.gameIsOver) {
              ctx.setTurnIsX(false);
            }
          } else {
            ctx.playerMakesMove(
              event.target.closest(".mark-box"),
              "o",
              ctx.setP1moves,
              ctx.P1moves
            );
            if (!ctx.gameIsOver) {
              ctx.setTurnIsX(true);
            }
          }
        }
      }
    }
  }
  return (
    <div
      className={`${props.className} mark-box`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <img src={x} alt="x icon" className="board-icon-x hidden" />
      <img src={xLine} alt="x icon" className="icon-x-outline hidden" />
      <img src={o} alt="o icon" className="board-icon-o hidden" />
      <img src={oLine} alt="o icon" className="icon-o-outline hidden" />
    </div>
  );
}

export default MarkBox;
