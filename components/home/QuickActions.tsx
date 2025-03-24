import { StyleSheet, Pressable, View } from 'react-native';
import { Platform } from 'react-native';
import { router } from 'expo-router';
import { Plus, UserPlus, CalendarPlus, Bell } from 'lucide-react-native';
import Animated, { 
  useAnimatedStyle, 
  withSpring, 
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Colors } from '@/constants/Colors';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function QuickActions() {
  const isExpanded = useSharedValue(false);

  const mainButtonStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: withSpring(isExpanded.value ? '45deg' : '0deg') }],
  }));

  const actionButtonStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: withSpring(isExpanded.value ? 1 : 0) },
      { translateY: withSpring(isExpanded.value ? 0 : 20) },
    ],
    opacity: withTiming(isExpanded.value ? 1 : 0),
  }));

  const toggleExpanded = () => {
    isExpanded.value = !isExpanded.value;
  };

  const handleActionPress = (route: string) => {
    isExpanded.value = false;
    router.push(route);
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.actionsContainer, actionButtonStyle]}>
        <AnimatedPressable
          style={styles.actionButton}
          onPress={() => handleActionPress('/contacts/new')}>
          <UserPlus color={Colors.primary} size={24} />
        </AnimatedPressable>
        <AnimatedPressable
          style={styles.actionButton}
          onPress={() => handleActionPress('/interactions/new')}>
          <CalendarPlus color={Colors.primary} size={24} />
        </AnimatedPressable>
        <AnimatedPressable
          style={styles.actionButton}
          onPress={() => handleActionPress('/reminders/new')}>
          <Bell color={Colors.primary} size={24} />
        </AnimatedPressable>
      </Animated.View>
      <AnimatedPressable style={[styles.mainButton, mainButtonStyle]} onPress={toggleExpanded}>
        <Plus color="white" size={24} />
      </AnimatedPressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 100 : 80,
    right: 16,
    alignItems: 'center',
  },
  mainButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  actionsContainer: {
    position: 'absolute',
    bottom: 72,
    gap: 16,
    alignItems: 'center',
  },
  actionButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    borderWidth: 1,
    borderColor: Colors.border,
  },
});