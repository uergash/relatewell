import { useEffect } from 'react';
import { Platform } from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
import * as Haptics from 'expo-haptics';

interface ConfettiProps {
  active: boolean;
  onComplete?: () => void;
}

export function Confetti({ active, onComplete }: ConfettiProps) {
  useEffect(() => {
    if (active && Platform.OS !== 'web') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  }, [active]);

  if (!active) return null;

  return (
    <ConfettiCannon
      count={50}
      origin={{ x: -10, y: 0 }}
      autoStart={true}
      fadeOut={true}
      onAnimationEnd={onComplete}
    />
  );
}