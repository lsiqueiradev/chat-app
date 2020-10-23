import { useCallback } from 'react';
import { StatusBar } from 'react-native';

export default function useStatusBar(style, animated = true) {
  useCallback(() => {
    StatusBar.setBarStyle(style, animated);
  }, [animated, style]);
}
