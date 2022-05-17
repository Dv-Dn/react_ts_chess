import { useEffect, useState } from 'react';

import { RBoard, RLostFigures, RTimer, RGameResult } from '@/components/base';
import {
  Colors,
  GameStatus,
  HORIZONTAL_AXIS,
  VERTICAL_AXIS,
} from '@/constants';

import { Board, Player } from '@/classes';

import { gameStatus as gameStatusAtom } from '@/store';

import styles from '@/styles/pages/indexPage.module.css';

import { DefaultLayout } from '@/layouts';
import { useAtom } from 'jotai';

function PageIndex() {
  const [gameStatus, setGameStatus] = useAtom(gameStatusAtom);
  const [board, setBoard] = useState(new Board());
  const [whitePlayer, _setWhitePlayer] = useState(new Player(Colors.WHITE, []));
  const [blackPlayer, _setBlackPlayer] = useState(new Player(Colors.BLACK, []));
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

  useEffect(() => {
    restart();
    setCurrentPlayer(whitePlayer);
  }, []);

  function restart() {
    const newBoard = new Board();
    newBoard.generateCells();
    newBoard.initFigures();
    setGameStatus(GameStatus.IN_PROGRESS);
    setCurrentPlayer(whitePlayer);
    setBoard(newBoard);
  }

  function swapPlayer() {
    setCurrentPlayer(
      currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer
    );
  }

  if (gameStatus === GameStatus.IN_PROGRESS) {
    return (
      <DefaultLayout>
        <div className={styles.head_container}>
          <h1 className={styles.title}>
            Current player - {currentPlayer?.color}
          </h1>

          <RTimer
            restart={restart}
            currentPlayer={currentPlayer}
            setGameStatus={setGameStatus}
          />
        </div>
        <div className={styles.container}>
          <div className={styles.grid}>
            <div className={styles.board_box}>
              <RBoard
                board={board}
                setBoard={setBoard}
                currentPlayer={currentPlayer}
                setGameStatus={setGameStatus}
                swapPlayer={swapPlayer}
              />
            </div>
            <div className={styles.h_axis}>
              {HORIZONTAL_AXIS.map((axis) => (
                <div key={axis}>{axis}</div>
              ))}
            </div>
            <div className={styles.v_axis}>
              {VERTICAL_AXIS.map((axis) => (
                <div key={axis}>{axis}</div>
              ))}
            </div>
          </div>
          <div>
            <div>
              <RLostFigures
                title="Black figures"
                figures={board.lostBlackFigures}
              />
              <RLostFigures
                title="White figures"
                figures={board.lostWhiteFigures}
              />
            </div>
          </div>
        </div>
      </DefaultLayout>
    );
  } else {
    return <RGameResult gameStatus={gameStatus} restartGame={restart} />;
  }
}
export default PageIndex;
