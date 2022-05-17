import { memo } from 'react';
import { GameStatus } from '@/constants';
import styles from './RGameResult.module.css';
import { clsx } from 'clsx';

export interface GameResultProps {
  gameStatus: GameStatus;
  restartGame: () => void;
}

export const RGameResult = memo(
  ({ gameStatus, restartGame }: GameResultProps) => {
    //

    if (gameStatus === GameStatus.WHITE_WIN)
      return (
        <div className={clsx(styles.fullscreen, styles.white)}>
          <div className={styles.text}>The white player won!</div>
          <button onClick={restartGame} className={styles.button}>
            Restart game
          </button>
        </div>
      );

    if (gameStatus === GameStatus.BLACK_WIN)
      return (
        <div className={clsx(styles.fullscreen, styles.black)}>
          <div className={styles.text}>The black player won!</div>
          <button onClick={restartGame} className={styles.button}>
            Restart game
          </button>
        </div>
      );

    if (gameStatus === GameStatus.DRAW)
      return (
        <div className={clsx(styles.fullscreen, styles.draw)}>
          <div className={styles.text}>Draw :)</div>
          <button onClick={restartGame} className={styles.button}>
            Restart game
          </button>
        </div>
      );

    return <div></div>;
  }
);
