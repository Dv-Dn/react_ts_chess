import logo from '@/assets/figures/white-king.png';
import { Cell } from './Cell';
import { FigureNames, Colors } from '@/constants';

export abstract class Figure {
  color: Colors;
  logo: typeof logo | null;
  cell: Cell;
  name: FigureNames;
  id: number;
  underAttack: boolean;

  constructor(color: Colors, cell: Cell) {
    this.color = color;
    this.cell = cell;
    this.cell.figure = this;
    this.logo = null;
    this.name = FigureNames.FIGURE;
    this.id = Math.random();
    this.underAttack = false;
  }

  canMove(target: Cell): boolean {
    if (target.figure?.color === this.color) return false;

    return true;
  }

  moveFigure(target: Cell) {}
}
