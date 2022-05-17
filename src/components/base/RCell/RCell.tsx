import { Cell } from '../../../classes/Cell';
import { clsx } from 'clsx';
// import { DragEvent } from 'react';

import styles from './RCell.module.css';

interface CellProps {
  cell: Cell;
  selected: boolean;
  bordered: boolean;
  click: (cell: Cell) => void;
}

export function RCell({ cell, selected, bordered, click }: CellProps) {
  return (
    <div
      className={clsx(styles.cell, cell.color, {
        [styles.selected]: selected,
        [styles.bordered]: bordered,
        [styles.attack_available]: cell.available && cell.figure,
      })}
      onClick={() => click(cell)}
    >
      {cell.available && !cell.figure && (
        <div className={styles.cell_available} />
      )}
      {cell.figure?.logo && (
        <img src={cell.figure.logo} draggable alt={cell.figure.name} />
      )}
    </div>
  );
}
