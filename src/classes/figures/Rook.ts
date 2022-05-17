import { Figure } from '../Figure';

import { Cell } from '../Cell';
import blackLogo from '@/assets/figures/black-rook.png';
import whiteLogo from '@/assets/figures/white-rook.png';
import { Colors, FigureNames } from '@/constants';

export class Rook extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FigureNames.ROOK;
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) return false;
    if (this.cell.isEmptyVertical(target)) return true;
    if (this.cell.isEmptyHorizontal(target)) return true;
    return false;
  }
}
