import { atom } from 'jotai';

const notificationDuration = 7 * 1000;

const notification = atom({
  text: '',
  isVisible: false,
});

const setNotification = atom(null, (_get, set, text: string) => {
  set(notification, { isVisible: true, text });
  setTimeout(() => {
    set(notification, { isVisible: false, text: '' });
  }, notificationDuration);
});

export { notification, setNotification };
