import styles from './RNotification.module.css';
import { useAtom } from 'jotai';
import { notification } from '@/store/notifications';

import { CSSTransition } from 'react-transition-group';

export const RNotification = () => {
  const [notf] = useAtom(notification);

  return (
    <CSSTransition
      in={notf.isVisible}
      classNames="fade"
      timeout={500}
      mountOnEnter
      unmountOnExit
    >
      <div className={styles.notification}>
        <div className={styles.border} />
        <div className={styles.wrapper}>
          <div className={styles.content}>{notf.text}</div>
        </div>
      </div>
    </CSSTransition>
  );
};
