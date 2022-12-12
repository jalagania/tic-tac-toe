import React, { useState, useEffect, useContext } from "react";

const AppContext = React.createContext();

function AppProvider(props) {
  const [showMenu, setShowMenu] = useState(true);
  const [showGame, setShowGame] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [gameAgainstCPU, setGameAgainstCPU] = useState(false);
  const [playerPickedX, setPlayerPickedX] = useState(true);
  const [turnIsX, setTurnIsX] = useState(true);
  const [restarting, setRestarting] = useState(false);
  const [userMoves, setUserMoves] = useState([]);
  const [computerMoves, setComputerMoves] = useState([]);
  const [P1moves, setP1moves] = useState([]);
  const [P2moves, setP2moves] = useState([]);
  const [playerX, setPlayerX] = useState("");
  const [playerO, setPlayerO] = useState("");
  const [modalResultText, setModalResultText] = useState("");
  const [scoreX, setScoreX] = useState(0);
  const [scoreO, setScoreO] = useState(0);
  const [scoreT, setScoreT] = useState(0);
  const [winner, setWinner] = useState("");

  let gameIsOver = false;

  let winnerSet;
  let moveIndex;
  const winningSets = ["123", "456", "789", "147", "258", "369", "159", "357"];
  const cornerSet = "1379";
  const sideSet = "2468";

  const x = {
    color: "#31c3bd",
    mark: "x",
  };

  const o = {
    color: "#f2b137",
    mark: "o",
  };

  // ---------- Functions ----------

  // Checks If One String Includes Characters Of Another
  function firstIncludesSecond(str) {
    const myArray = [];

    for (let char of str) {
      if (userMoves.join("").includes(char)) {
        myArray.push("0");
      } else {
        myArray.push("1");
      }
    }

    if (myArray.join("").includes("0")) {
      return true;
    }
    return false;
  }

  // Makes Player's Move
  function playerMakesMove(box, mark, setArray, array) {
    setArray([...array, box.classList[0]]);
    box.querySelector(`.board-icon-${mark}`).classList.remove("hidden");
    box.querySelector(`.icon-${mark}-outline`).classList.add("hidden");
    box.classList.add("marked");
  }

  // Makes Optimal Computer Move
  function makeOptimalMove(array) {
    let indexFound = false;
    let truthArray = [];
    let tempArray = [];

    for (let i = 0; i < 8; i++) {
      for (let char of winningSets[i].split("")) {
        if (array.join("").includes(char)) {
          tempArray.push("0");
        } else {
          tempArray.push("1");
        }
        if (tempArray.length === 3) {
          truthArray.push(tempArray);
          tempArray = [];
        }
      }

      if (truthArray[i].filter((char) => char === "0").length === 2) {
        winningSets[i].split("").forEach((el) => {
          if (!userMoves.concat(computerMoves).join("").includes(el)) {
            moveIndex = el;
            indexFound = true;
          }
        });
      }
    }

    if (!indexFound) {
      moveIndex = undefined;
    }
  }

  // Makes Computer's Move
  function makeComputerMove(mark) {
    const boxes = document.querySelectorAll(".mark-box");

    if (
      !playerPickedX &&
      userMoves.length === 0 &&
      computerMoves.length === 0
    ) {
      moveIndex = "13579"[Math.floor(Math.random() * 5)];
    }

    if (userMoves.length > 0) {
      if (computerMoves.length === 0) {
        if (userMoves[0] === "5") {
          moveIndex = cornerSet[Math.floor(Math.random() * 4)];
        } else {
          moveIndex = "5";
        }
      }

      if (userMoves.length === 2) {
        if (computerMoves.length === 1) {
          if (userMoves.concat(computerMoves).sort().join("") === "159") {
            moveIndex = "37"[Math.floor(Math.random() * 2)];
          }
          if (userMoves.concat(computerMoves).sort().join("") === "357") {
            moveIndex = "19"[Math.floor(Math.random() * 2)];
          }
        }

        if (computerMoves[0] === "5") {
          if (
            userMoves.sort().join("") === "19" ||
            userMoves.sort().join("") === "37"
          ) {
            moveIndex = sideSet[Math.floor(Math.random() * 4)];
          }
          if (
            userMoves.sort().join("") === "24" ||
            userMoves.sort().join("") === "26" ||
            userMoves.sort().join("") === "68"
          ) {
            moveIndex = "3";
          }
          if (userMoves.sort().join("") === "48") {
            moveIndex = "179"[Math.floor(Math.random() * 3)];
          }
        }
      }

      if (moveIndex === undefined) {
        makeOptimalMove(computerMoves);
      }

      if (moveIndex === undefined) {
        makeOptimalMove(userMoves);
      }

      if (moveIndex === undefined) {
        winningSets.forEach((set) => {
          if (set.includes(computerMoves[0]) && !firstIncludesSecond(set)) {
            moveIndex = set
              .split("")
              .filter((char) => char !== computerMoves[0])[0];
          }
        });
      }

      if (moveIndex === undefined) {
        boxes.forEach((box) => {
          if (!box.classList.contains("marked")) {
            moveIndex = box.classList[0];
          }
        });
      }
    }

    boxes[moveIndex - 1]
      .querySelector(`.board-icon-${mark}`)
      .classList.remove("hidden");
    boxes[moveIndex - 1].classList.add("marked");
    setComputerMoves([...computerMoves, moveIndex]);

    moveIndex = undefined;
  }

  // Determines Which Player Has Winner Moves
  function winnerMovesAre(array) {
    let truthArray = [];
    let tempArray = [];

    for (let i = 0; i < 8; i++) {
      for (let char of winningSets[i].split("")) {
        if (array.join("").includes(char)) {
          tempArray.push("0");
        } else {
          tempArray.push("1");
        }
        if (tempArray.length === 3) {
          truthArray.push(tempArray);
          tempArray = [];
        }
      }

      if (!truthArray[i].join("").includes("1")) {
        winnerSet = winningSets[i];
        return true;
      }
    }
  }

  // Makes DOM Changes After Win
  function makeChangesAfterWin(obj) {
    const boxes = document.querySelectorAll(".mark-box");
    for (let char of winnerSet.split("")) {
      boxes.forEach((box) => {
        if (box.classList[0] === char) {
          box.classList.add(`winner-${obj.mark}-bg`);
          box
            .querySelector(`.board-icon-${obj.mark}`)
            .classList.add(`winner-${obj.mark}-icon`);
        }
      });
    }
  }

  // Does Universal Reset
  function resetAll(boxes) {
    boxes.forEach((box) => {
      [...box.children].forEach((child) => child.classList.add("hidden"));
      box.classList.remove("marked");
      box.classList.remove("winner-x-bg");
      box.classList.remove("winner-o-bg");
      box.querySelector(".board-icon-x").classList.remove("winner-x-icon");
      box.querySelector(".board-icon-o").classList.remove("winner-o-icon");
    });

    setUserMoves([]);
    setComputerMoves([]);
    setP1moves([]);
    setP2moves([]);
    gameIsOver = false;
    setTurnIsX(true);
  }

  // ---------- useEffects ----------

  // Checks If Round Is Tied
  useEffect(() => {
    if (
      !gameIsOver &&
      (userMoves.length === 5 ||
        computerMoves.length === 5 ||
        P1moves.length === 5 ||
        P2moves.length === 5)
    ) {
      setShowModal(true);
      setModalResultText("");
      setWinner("");
      setScoreT(scoreT + 1);
      gameIsOver = true;
    }
  }, [userMoves, computerMoves, P1moves, P2moves]);

  // Determines Game Winner
  useEffect(() => {
    if (
      winnerMovesAre(userMoves) ||
      winnerMovesAre(computerMoves) ||
      winnerMovesAre(P1moves) ||
      winnerMovesAre(P2moves)
    ) {
      setShowModal(true);
      gameIsOver = true;
    }

    if (winnerMovesAre(userMoves)) {
      setModalResultText("You won!");
      if (playerPickedX) {
        makeChangesAfterWin(x);
        setScoreX(scoreX + 1);
        setWinner("x");
      } else {
        makeChangesAfterWin(o);
        setScoreO(scoreO + 1);
        setWinner("o");
      }
    }

    if (winnerMovesAre(computerMoves)) {
      setModalResultText("Oh no, you lost...");
      if (playerPickedX) {
        makeChangesAfterWin(o);
        setScoreO(scoreO + 1);
        setWinner("o");
      } else {
        makeChangesAfterWin(x);
        setScoreX(scoreX + 1);
        setWinner("x");
      }
    }

    if (winnerMovesAre(P1moves)) {
      setModalResultText("Player 1 wins!");
      if (playerPickedX) {
        makeChangesAfterWin(x);
        setScoreX(scoreX + 1);
        setWinner("x");
      } else {
        makeChangesAfterWin(o);
        setScoreO(scoreO + 1);
        setWinner("o");
      }
    }

    if (winnerMovesAre(P2moves)) {
      setModalResultText("Player 2 wins!");
      if (playerPickedX) {
        makeChangesAfterWin(o);
        setScoreO(scoreO + 1);
        setWinner("o");
      } else {
        makeChangesAfterWin(x);
        setScoreX(scoreX + 1);
        setWinner("x");
      }
    }
  }, [userMoves, computerMoves, P1moves, P2moves]);

  // Makes Computer's Move
  useEffect(() => {
    if (gameAgainstCPU && !gameIsOver) {
      if (playerPickedX && !turnIsX) {
        setTimeout(() => {
          makeComputerMove("o");
          setTurnIsX(true);
        }, 1000);
      }
      if (!playerPickedX && turnIsX) {
        setTimeout(() => {
          makeComputerMove("x");
          setTurnIsX(false);
        }, 1000);
      }
    }
  }, [gameAgainstCPU, playerPickedX, turnIsX]);

  return (
    <AppContext.Provider
      value={{
        showMenu,
        setShowMenu,
        showGame,
        setShowGame,
        showModal,
        setShowModal,
        gameAgainstCPU,
        setGameAgainstCPU,
        playerPickedX,
        setPlayerPickedX,
        turnIsX,
        setTurnIsX,
        restarting,
        setRestarting,
        userMoves,
        setUserMoves,
        computerMoves,
        setComputerMoves,
        P1moves,
        setP1moves,
        P2moves,
        setP2moves,
        playerX,
        setPlayerX,
        playerO,
        setPlayerO,
        modalResultText,
        setModalResultText,
        scoreX,
        setScoreX,
        scoreO,
        setScoreO,
        scoreT,
        setScoreT,
        winner,
        setWinner,
        gameIsOver,
        playerMakesMove,
        resetAll,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}

export default AppProvider;

export function useGlobalContext() {
  return useContext(AppContext);
}
