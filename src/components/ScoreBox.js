import "./ScoreBox.css";

function ScoreBox(props) {
  return (
    <div className={props.className}>
      <p className="score-text">
        {props.mark}{" "}
        {props.player && <span className="player">{props.player}</span>}
      </p>
      <p className="score">{props.score}</p>
    </div>
  );
}

export default ScoreBox;
