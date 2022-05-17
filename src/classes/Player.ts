import { Colors } from '@/constants';
import { Cell } from './Cell';

export class Player {
  color: Colors;
  cells: Cell[][];
  constructor(color: Colors, cells: Cell[][]) {
    this.color = color;
    this.cells = cells;
  }
}
