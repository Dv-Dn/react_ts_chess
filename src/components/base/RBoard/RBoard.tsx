import { useEffect, useState, Fragment } from 'react';
import { RCell } from '../RCell/RCell';
import { Cell, Player, Board } from '@/classes/';

import { useKeyPress } from '@/hooks/useKeyPress';
import { FigureNames, Colors, CheckmateStatus, GameStatus } from '@/constants';

import styles from './RBoard.module.css';
import { setNotification } from '@/store/notifications';
import { SetStateAction, useAtom } from 'jotai';

interface BoardProps {
  board: Board;
  setGameStatus: (update: SetStateAction<GameStatus>) => void;
  setBoard: (board: Board) => void;
  currentPlayer: Player | null;
  swapPlayer: () => void;
}

export const RBoard = ({
  board,
  setBoard,
  currentPlayer,
  swapPlayer,
  setGameStatus,
}: BoardProps) => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);
  const [, pushNotification] = useAtom(setNotification);
  // const [markerIsVisible, setMarkerIsVisible] = useState(false);
  const [enemyFigures, setEnemyFigures] = useState<Cell[]>([]);

  const [checkmateStatus, setCheckmateStatus] = useState<CheckmateStatus>(
    CheckmateStatus.NOT_CHECKMATE
  );

  const [pX, setpX] = useState(0);
  const [pY, setpY] = useState(0);

  useEffect(() => {
    highlightCells();
  }, [selectedCell]);

  useEffect(() => {
    const color = currentPlayer?.color;

    setCheckmateStatus(board.isCheckmate(color));

    const enemyColor =
      currentPlayer?.color === Colors.WHITE ? Colors.BLACK : Colors.WHITE;

    setEnemyFigures(board.getFiguresByColor(enemyColor).flat());
  }, [currentPlayer]);

  useEffect(() => {
    const enemyColor =
      currentPlayer?.color === Colors.WHITE ? Colors.BLACK : Colors.WHITE;

    if (checkmateStatus === CheckmateStatus.CHECKMATE) {
      const winner =
        currentPlayer?.color === Colors.WHITE
          ? GameStatus.BLACK_WIN
          : GameStatus.WHITE_WIN;
      pushNotification(`is Checkmate, player ${enemyColor.toUpperCase()} won!`);

      setTimeout(() => setGameStatus(winner), 3000);
    } else if (checkmateStatus === CheckmateStatus.CHECK) {
      pushNotification('is CHECK!');
    }
  }, [checkmateStatus]);

  useKeyPress(
    {
      ArrowUp: () => setpY(pY === 7 ? 0 : pY + 1),
      ArrowDown: () => setpY(pY === 0 ? 7 : pY - 1),
      ArrowLeft: () => setpX(pX === 0 ? 7 : pX - 1),
      ArrowRight: () => setpX(pX === 7 ? 0 : pX + 1),
      Enter: () => click(board.getCell(pX, pY)),
    },
    [pX, pY]
  );

  function click(cell: Cell) {
    const isMate = checkmateStatus === CheckmateStatus.CHECKMATE;
    const isCheck = checkmateStatus === CheckmateStatus.CHECK;

    if (isMate) return;

    const isKing =
      cell.figure?.name === FigureNames.KING &&
      cell.figure.color === currentPlayer?.color;
    const isKingSelected = selectedCell?.figure?.name === FigureNames.KING;

    if (isCheck && !isKing && !isKingSelected) {
      pushNotification('The king is in check!');
      return;
    }

    if (
      isCheck &&
      isKingSelected &&
      board.isSomeFigureCanMove(enemyFigures, cell) &&
      cell.figure?.name! !== FigureNames.KING
    ) {
      pushNotification('Good choice, but the king is in check!!');

      return;
    }

    return selectAndMoveFigure(cell);
  }

  function selectAndMoveFigure(cell: Cell) {
    if (
      selectedCell &&
      selectedCell !== cell &&
      !!selectedCell.figure?.canMove(cell)
    ) {
      selectedCell.moveFigure(cell);

      swapPlayer();
      setSelectedCell(null);
      updateBoard();
    } else if (cell.figure?.color === currentPlayer?.color) {
      setSelectedCell(cell);
    }
  }

  function highlightCells() {
    board.highlightCells(selectedCell);
    updateBoard();
  }

  function updateBoard() {
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  }

  return (
    <div className={styles.board}>
      {board.cells.map((column, index) => (
        <Fragment key={index}>
          {column.map((cell: Cell) => (
            <RCell
              click={click}
              cell={cell}
              key={cell.key}
              selected={
                cell.x === selectedCell?.x && cell.y === selectedCell?.y
              }
              bordered={cell.x === pX && cell.y === pY}
            />
          ))}
        </Fragment>
      ))}
    </div>
  );
};
