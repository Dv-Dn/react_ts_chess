import {
  FigureNames,
  Colors,
  BOARD_SIZE,
  CheckmateStatus,
  HORIZONTAL_AXIS,
  VERTICAL_AXIS,
} from '@/constants';

import { Cell } from './Cell';
import { Figure } from './Figure';
import { King, Knight, Pawn, Queen, Rook } from './figures';
import { Bishop } from './figures/Bishop';

export class Board {
  cells: Cell[][] = [];

  lostBlackFigures: Figure[] = [];
  lostWhiteFigures: Figure[] = [];

  generateCells() {
    for (let x = 0; x < BOARD_SIZE; x++) {
      const row: Cell[] = [];
      for (let y = 0; y < BOARD_SIZE; y++) {
        const c = (x + y) % 2 !== 0;
        row.push(
          new Cell({
            board: this,
            x,
            y,
            color: c ? Colors.BLACK : Colors.WHITE,
            key: HORIZONTAL_AXIS[x] + VERTICAL_AXIS[y],
            figure: null,
          })
        );
      }

      this.cells.push(row);
    }
  }

  public getCopyBoard(): Board {
    const newBoard = new Board();
    newBoard.cells = this.cells;

    newBoard.lostWhiteFigures = this.lostWhiteFigures;
    newBoard.lostBlackFigures = this.lostBlackFigures;
    return newBoard;
  }

  private iterateCellsWithCallback(callback: (cell: Cell) => void) {
    this.cells.forEach((el) => el.forEach(callback));
  }

  public highlightCells(selectedCell: Cell | null) {
    this.iterateCellsWithCallback((target) => {
      if (target.figure?.name != FigureNames.KING)
        target.available = !!selectedCell?.figure?.canMove(target);
    });
  }

  public isCheckmate(color: Colors | undefined): CheckmateStatus {
    const king = this.getKingByColor(color);
    if (!king) return CheckmateStatus.NOT_CHECKMATE;

    const enemyColor = color === Colors.WHITE ? Colors.BLACK : Colors.WHITE;

    const enemyFiguresCells = this.getFiguresByColor(enemyColor).flat();

    const kingMovesCells = this.cells
      .flat()
      .filter((cell) => king.figure?.canMove(cell));

    // const isSomeFigureCanMoveOnKing = enemyFiguresCells.some((enemy) => {
    //   return enemy.figure?.canMove(king);
    // });
    const isSomeFigureCanMoveOnKing = this.isSomeFigureCanMove(
      enemyFiguresCells,
      king
    );

    const isEveryFigureCanMoveOnKingMoves = kingMovesCells.every((cell) => {
      return enemyFiguresCells.some((enemy) => enemy.figure?.canMove(cell));
    });

    if (isSomeFigureCanMoveOnKing && isEveryFigureCanMoveOnKingMoves) {
      return CheckmateStatus.CHECKMATE;
    }
    if (isSomeFigureCanMoveOnKing) {
      return CheckmateStatus.CHECK;
    }

    return CheckmateStatus.NOT_CHECKMATE;
  }

  public isSomeFigureCanMove(figures: Cell[], target: Cell) {
    return figures.some(
      (cell) =>
        cell.figure?.name !== FigureNames.KING && !!cell.figure?.canMove(target)
    );
  }

  public getKingByColor(color: Colors | undefined): Cell | undefined {
    return this.cells
      .flat()
      .find(
        (cell) =>
          cell.figure?.name === FigureNames.KING && cell.figure?.color === color
      );
  }

  public getFiguresByColor(color: Colors | undefined) {
    return this.cells.map((column) =>
      column.filter((cell) => cell.figure?.color === color)
    );
  }

  public getCell(x: number, y: number) {
    return this.cells[x][y];
  }

  private addPawns() {
    for (let i = 0; i < BOARD_SIZE; i++) {
      new Pawn(Colors.WHITE, this.getCell(i, 1));
      new Pawn(Colors.BLACK, this.getCell(i, 6));
    }
  }

  private addBishops() {
    new Bishop(Colors.WHITE, this.getCell(2, 0));
    new Bishop(Colors.WHITE, this.getCell(5, 0));
    new Bishop(Colors.BLACK, this.getCell(2, 7));
    new Bishop(Colors.BLACK, this.getCell(5, 7));
  }

  private addKings() {
    new King(Colors.WHITE, this.getCell(4, 0));
    new King(Colors.BLACK, this.getCell(4, 7));
  }

  private addKnights() {
    new Knight(Colors.WHITE, this.getCell(1, 0));
    new Knight(Colors.WHITE, this.getCell(6, 0));
    new Knight(Colors.BLACK, this.getCell(1, 7));
    new Knight(Colors.BLACK, this.getCell(6, 7));
  }

  private addQueens() {
    new Queen(Colors.WHITE, this.getCell(3, 0));
    new Queen(Colors.BLACK, this.getCell(3, 7));
  }

  private addRooks() {
    new Rook(Colors.WHITE, this.getCell(0, 0));
    new Rook(Colors.WHITE, this.getCell(7, 0));
    new Rook(Colors.BLACK, this.getCell(0, 7));
    new Rook(Colors.BLACK, this.getCell(7, 7));
  }

  public initFigures() {
    this.addKings();
    this.addKnights();
    this.addQueens();
    this.addRooks();
    this.addBishops();
    this.addPawns();
  }
}
