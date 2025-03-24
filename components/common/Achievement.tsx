import { useEffect } from 'react';
import { StyleSheet, View, Text, Pressable, Platform } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { Trophy } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';

interface AchievementProps {
  title: string;
  description: string;
  visible: boolean;
  onDismiss: () => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function Achievement({ title, description, visible, onDismiss }: AchievementProps) {
  useEffect(() => {
    if (visible && Platform.OS !== 'web') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: withSequence(
          withSpring(-100),
          withTiming(0, { duration: 3000 }),
          withSpring(100, undefined, (finished) => {
            if (finished) {
              runOnJS(onDismiss)();
            }
          })
        ),
      },
    ],
    opacity: withSequence(
      withSpring(1),
      withTiming(1, { duration: 2500 }),
      withSpring(0)
    ),
  }));

  if (!visible) return null;

  return (
    <AnimatedPressable
      style={[styles.container, animatedStyle]}
      onPress={onDismiss}>
      <View style={styles.iconContainer}>
        <Trophy size={24} color={Colors.warning} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 16,
    right: 16,
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.warning + '20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: Colors.text,
    marginBottom: 4,
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.textSecondary,
  },
});