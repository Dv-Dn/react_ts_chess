import { useEffect, useRef, useState } from 'react';
import { Player } from '@/classes/Player';
import { Colors } from '@/constants';

import { GameStatus } from '@/constants';
import { SetStateAction } from 'jotai';

interface TimerProps {
  currentPlayer: Player | null;
  restart: () => void;
  setGameStatus: (update: SetStateAction<GameStatus>) => void;
}

export const RTimer = ({
  restart,
  currentPlayer,
  setGameStatus,
}: TimerProps) => {
  const [blackTime, setBlackTime] = useState(300);
  const [whiteTime, setWhiteTime] = useState(300);
  const [timerIsActive, setTimerIsActive] = useState(true);

  const timer = useRef<null | ReturnType<typeof setInterval>>(null);

  useEffect(() => {
    startTimer();
    if (!timerIsActive && timer.current) clearInterval(timer.current);
  }, [currentPlayer, timerIsActive]);

  useEffect(() => {
    if (blackTime === 0 || whiteTime === 0) setTimerIsActive(false);
    if (blackTime === 0) setGameStatus(GameStatus.WHITE_WIN);
    if (whiteTime === 0) setGameStatus(GameStatus.BLACK_WIN);
  }, [blackTime, whiteTime]);

  function startTimer() {
    if (timer.current) {
      clearInterval(timer.current);
    }
    const callback =
      currentPlayer?.color === Colors.WHITE
        ? decrementWhiteTimer
        : decrementBlackTimer;
    timer.current = setInterval(callback, 1000);
  }

  function decrementBlackTimer() {
    setBlackTime((prev) => prev - 1);
  }
  function decrementWhiteTimer() {
    setWhiteTime((prev) => prev - 1);
  }

  const handleRestart = () => {
    setWhiteTime(300);
    setBlackTime(300);
    restart();
  };

  return (
    <div>
      <div>
        <button onClick={handleRestart}>Restart game</button>
      </div>
      <h2>Black - {blackTime}</h2>
      <h2>White - {whiteTime}</h2>
    </div>
  );
};
