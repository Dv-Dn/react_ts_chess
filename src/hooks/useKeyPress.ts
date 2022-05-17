import { DependencyList, useCallback, useEffect } from 'react';

export const Buttons = [
  'ArrowUp',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'Enter',
] as const;

type ButtonsType = typeof Buttons[number];

type KeysInterface = {
  [key in ButtonsType]?: Function;
};

export const useKeyPress = (
  keys: KeysInterface,
  dependencyList: DependencyList,
  node: Document | null = null
) => {
  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      const k = event.key;
      if (keys.hasOwnProperty(k)) keys[k as keyof KeysInterface]?.();
    },
    [...dependencyList]
  );

  useEffect(() => {
    const targetNode = node ?? document;

    targetNode && targetNode.addEventListener('keydown', handleKeyPress);

    return () =>
      targetNode && targetNode.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress, node]);
};
