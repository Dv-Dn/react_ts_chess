import { Figure } from '@/classes/Figure';
import styles from './RLostFigures.module.css';

interface LostFiguresProps {
  title: string;
  figures: Figure[];
}

export const RLostFigures = ({ title, figures }: LostFiguresProps) => {
  return (
    <div className={styles.lost}>
      <h3>{title}</h3>
      {figures.map((figure) => (
        <div key={figure.id}>
          {figure.name}{' '}
          {figure.logo && (
            <img width={20} height={20} src={figure.logo} alt={figure.name} />
          )}
        </div>
      ))}
    </div>
  );
};
