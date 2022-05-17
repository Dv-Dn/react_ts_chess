const BOARD_SIZE = 8;

const VERTICAL_AXIS = [1, 2, 3, 4, 5, 6, 7, 8];
const HORIZONTAL_AXIS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

enum CheckmateStatus {
  CHECKMATE = 'CHECKMATE',
  STALEMATE = 'STALEMATE',
  CHECK = 'CHECK',
  NOT_CHECKMATE = 'NOT_CHECKMATE',
}

export {
  BOARD_SIZE,
  //
  CheckmateStatus,
  VERTICAL_AXIS,
  HORIZONTAL_AXIS,
};
