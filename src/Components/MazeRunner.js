import React, { useState, useEffect, useCallback } from "react";
import "./MazeRunner.css";

const MAZE_SIZE = 15;
const PLAYER = "P";
const WALL = "█";
const PATH = " ";
const EXIT = "E";

function MazeRunner() {
  const [maze, setMaze] = useState([]);
  const [playerPosition, setPlayerPosition] = useState({ x: 1, y: 1 });
  const [gameWon, setGameWon] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [bestTime, setBestTime] = useState(localStorage.getItem("mazeRunnerBestTime") || Infinity);

  const generateMaze = useCallback(() => {
    let newMaze = Array(MAZE_SIZE).fill().map(() => Array(MAZE_SIZE).fill(WALL));
    const stack = [{ x: 1, y: 1 }];
    newMaze[1][1] = PATH;

    while (stack.length > 0) {
      const current = stack.pop();
      const neighbors = getUnvisitedNeighbors(current, newMaze);

      if (neighbors.length > 0) {
        stack.push(current);
        const chosen = neighbors[Math.floor(Math.random() * neighbors.length)];
        newMaze[chosen.y][chosen.x] = PATH;
        newMaze[(current.y + chosen.y) / 2][(current.x + chosen.x) / 2] = PATH;
        stack.push(chosen);
      }
    }

    newMaze[MAZE_SIZE - 2][MAZE_SIZE - 2] = EXIT;
    setMaze(newMaze);
    setPlayerPosition({ x: 1, y: 1 });
  }, []);

  useEffect(() => {
    generateMaze();
  }, [generateMaze]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!gameWon) {
        setTimeElapsed((prevTime) => prevTime + 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [gameWon]);

  const getUnvisitedNeighbors = (cell, maze) => {
    const neighbors = [];
    const directions = [
      { dx: 0, dy: -2 },
      { dx: 2, dy: 0 },
      { dx: 0, dy: 2 },
      { dx: -2, dy: 0 },
    ];

    for (const dir of directions) {
      const newX = cell.x + dir.dx;
      const newY = cell.y + dir.dy;
      if (
        newX > 0 &&
        newX < MAZE_SIZE - 1 &&
        newY > 0 &&
        newY < MAZE_SIZE - 1 &&
        maze[newY][newX] === WALL
      ) {
        neighbors.push({ x: newX, y: newY });
      }
    }
    return neighbors;
  };

  const movePlayer = (dx, dy) => {
    if (gameWon) return;

    const newX = playerPosition.x + dx;
    const newY = playerPosition.y + dy;

    if (
      newX >= 0 &&
      newX < MAZE_SIZE &&
      newY >= 0 &&
      newY < MAZE_SIZE &&
      maze[newY][newX] !== WALL
    ) {
      setPlayerPosition({ x: newX, y: newY });

      if (maze[newY][newX] === EXIT) {
        setGameWon(true);
        if (timeElapsed < bestTime) {
          setBestTime(timeElapsed);
          localStorage.setItem("mazeRunnerBestTime", timeElapsed);
        }
      }
    }
  };

  const handleKeyDown = useCallback(
    (e) => {
      if (gameWon) return;

      switch (e.key) {
        case "ArrowUp":
          movePlayer(0, -1);
          break;
        case "ArrowRight":
          movePlayer(1, 0);
          break;
        case "ArrowDown":
          movePlayer(0, 1);
          break;
        case "ArrowLeft":
          movePlayer(-1, 0);
          break;
        default:
          break;
      }
    },
    [gameWon, movePlayer]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const resetGame = () => {
    generateMaze();
    setGameWon(false);
    setTimeElapsed(0);
  };

  return (
    <div className="maze-runner">
      <h2>Maze Runner</h2>
      <div className="maze-info">
        <span>Time: {timeElapsed}s</span>
        <span>Best Time: {bestTime === Infinity ? "N/A" : `${bestTime}s`}</span>
        <button onClick={resetGame}>New Maze</button>
      </div>
      <div className="maze" tabIndex="0">
        {maze.map((row, y) => (
          <div key={y} className="maze-row">
            {row.map((cell, x) => (
              <div
                key={`${x}-${y}`}
                className={`maze-cell ${cell === WALL ? "wall" : "path"} ${
                  x === playerPosition.x && y === playerPosition.y ? "player" : ""
                } ${cell === EXIT ? "exit" : ""}`}
              >
                {x === playerPosition.x && y === playerPosition.y
                  ? PLAYER
                  : cell === EXIT
                  ? EXIT
                  : ""}
              </div>
            ))}
          </div>
        ))}
      </div>
      {gameWon && (
        <div className="win-message">
          <p>You've escaped! Time: {timeElapsed}s</p>
          <button onClick={resetGame}>Play Again</button>
        </div>
      )}
    </div>
  );
}

export default MazeRunner;
