/*
Game 
  ->Board
      ->Squire
  ->History
*/

import { useState } from "react";

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [xIsNextSquire, setXIsNextSquire] = useState(true);
  const [currentMoves, setCurrentMoves] = useState(0);

  const currentSquire = history[currentMoves];

  function playHandle(nextSquire) {
    setXIsNextSquire(!xIsNextSquire);
    const nexHistory = [...history.slice(0, currentMoves + 1), nextSquire];
    setHistory(nexHistory);
    setCurrentMoves(nexHistory.length - 1);
  }

  function toMove(move) {
    setCurrentMoves(move);
    setXIsNextSquire(move % 2 === 0);
  }

  return (
    <div className=" flex justify-center p-3">
      <div>
        <Board
          squires={currentSquire}
          xIsNextSquire={xIsNextSquire}
          onPlay={playHandle}
        />
      </div>
      <History history={history} onMove={toMove} />
    </div>
  );
}

function Board({ squires, xIsNextSquire, onPlay }) {
  const winner = calculateWinner(squires);
  let status;

  if (winner) {
    status = `The winner is: ${winner}`;
  } else {
    status = "Next Player is: " + (xIsNextSquire ? "X" : "O");
  }

  function onClickHandler(index) {
    if (squires[index] || calculateWinner(squires)) {
      return;
    }

    const nextSquire = squires.slice();
    if (xIsNextSquire) {
      nextSquire[index] = "X";
    } else {
      nextSquire[index] = "O";
    }
    onPlay(nextSquire);
  }

  return (
    <>
      <h1 className=" text-xl font-bold">{status}</h1>
      <div className=" flex">
        <Squire value={squires[0]} onSquiresHandler={() => onClickHandler(0)} />
        <Squire value={squires[1]} onSquiresHandler={() => onClickHandler(1)} />
        <Squire value={squires[2]} onSquiresHandler={() => onClickHandler(2)} />
      </div>
      <div className=" flex">
        <Squire value={squires[3]} onSquiresHandler={() => onClickHandler(3)} />
        <Squire value={squires[4]} onSquiresHandler={() => onClickHandler(4)} />
        <Squire value={squires[5]} onSquiresHandler={() => onClickHandler(5)} />
      </div>
      <div className=" flex">
        <Squire value={squires[6]} onSquiresHandler={() => onClickHandler(6)} />
        <Squire value={squires[7]} onSquiresHandler={() => onClickHandler(7)} />
        <Squire value={squires[8]} onSquiresHandler={() => onClickHandler(8)} />
      </div>
    </>
  );
}

function Squire({ value, onSquiresHandler }) {
  function clickHandler() {}
  return (
    <button
      className=" bg-white border-2 border-gray-600 h-16 w-16 m-1 text-3xl font-bold leading-9"
      onClick={onSquiresHandler}
    >
      {value}
    </button>
  );
}

function History({ history, onMove }) {
  const moves = history.map((squire, move) => {
    let description;
    if (move > 0) {
      description = `Go To The Move #${move}`;
    } else {
      description = "Go To STart The Game";
    }

    return (
      <li
        key={move}
        className=" bg-gray-700 mb-1 p-2 text-white font-bold text-xl rounded "
      >
        <button onClick={() => onMove(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className=" m-8 border-2 border-gray-700">
      <ol className=" p-4 text-center">{moves}</ol>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
