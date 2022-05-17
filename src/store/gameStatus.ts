import { GameStatus } from '@/constants';

import { atom } from 'jotai';

const gameStatus = atom<GameStatus>(GameStatus.IN_PROGRESS);

export { gameStatus };
