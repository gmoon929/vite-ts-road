import { useState } from "react";

// 棋盘大小
const BOARD_SIZE = 15;

// 初始化棋盘
const createBoard = () => {
  return Array(BOARD_SIZE)
    .fill(null)
    .map(() => Array(BOARD_SIZE).fill(null));
};

// 判断是否有五子连珠
const checkWin = (board: any[][], x: number, y: number, player: any) => {
  const directions = [
    [1, 0], // 水平
    [0, 1], // 垂直
    [1, 1], // 对角线（右下）
    [1, -1], // 对角线（右上）
  ];

  for (let [dx, dy] of directions) {
    let count = 1;
    // 向一个方向搜索
    for (let i = 1; i < 5; i++) {
      const nx = x + dx * i;
      const ny = y + dy * i;
      if (nx >= 0 && nx < BOARD_SIZE && ny >= 0 && ny < BOARD_SIZE && board[nx][ny] === player) {
        count++;
      } else {
        break;
      }
    }
    // 向相反方向搜索
    for (let i = 1; i < 5; i++) {
      const nx = x - dx * i;
      const ny = y - dy * i;
      if (nx >= 0 && nx < BOARD_SIZE && ny >= 0 && ny < BOARD_SIZE && board[nx][ny] === player) {
        count++;
      } else {
        break;
      }
    }
    // 如果五子连珠，返回 true
    if (count >= 5) {
      return true;
    }
  }
  return false;
};

const Gomoku = () => {
  const [board, setBoard] = useState(createBoard());
  const [isBlackTurn, setIsBlackTurn] = useState(true);
  const [winner, setWinner] = useState(null);

  const handleClick = (x: number, y: number) => {
    if (board[x][y] || winner) return; // 如果已经有棋子或者有赢家，直接返回

    const newBoard = board.map((row) => [...row]);
    newBoard[x][y] = isBlackTurn ? "black" : "white"; // 设置当前玩家的棋子
    setBoard(newBoard);

    if (checkWin(newBoard, x, y, newBoard[x][y])) {
      setWinner(newBoard[x][y]); // 设置赢家
    } else {
      setIsBlackTurn(!isBlackTurn); // 切换玩家
    }
  };

  const resetGame = () => {
    setBoard(createBoard());
    setIsBlackTurn(true);
    setWinner(null);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>五子棋游戏</h1>
      <div style={{ marginBottom: "20px" }}>
        {winner ? (
          <h2>恭喜！{winner === "black" ? "黑棋" : "白棋"}获胜！</h2>
        ) : (
          <h2>当前玩家：{isBlackTurn ? "黑棋" : "白棋"}</h2>
        )}
      </div>
      <div
        style={{
          display: "inline-grid",
          gridTemplateColumns: `repeat(${BOARD_SIZE}, 30px)`,
          gridTemplateRows: `repeat(${BOARD_SIZE}, 30px)`,
          gap: "1px",
          backgroundColor: "#ccc",
        }}
      >
        {board.map((row, x) =>
          row.map((cell, y) => (
            <div
              key={`${x}-${y}`}
              style={{
                backgroundColor: "#fff",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => handleClick(x, y)}
            >
              {cell && (
                <div
                  style={{
                    width: "80%",
                    height: "80%",
                    borderRadius: "50%",
                    backgroundColor: cell === "black" ? "#000" : "#fff",
                    border: cell === "white" ? "1px solid #000" : "none",
                  }}
                />
              )}
            </div>
          ))
        )}
      </div>
      <div style={{ marginTop: "20px" }}>
        <button onClick={resetGame}>重新开始</button>
      </div>
    </div>
  );
};

export default Gomoku;