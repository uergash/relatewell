import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import { Chrome as Home, Users, Settings, MessageCircle, Bell } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import Animated, { withTiming, useAnimatedStyle } from 'react-native-reanimated';
import { FontAwesome } from '@expo/vector-icons';

export default function TabLayout() {
  const createTabIcon = (Icon: typeof Home) => {
    return ({ focused, color, size }: { focused: boolean; color: string; size: number }) => {
      const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: withTiming(focused ? 1.1 : 1, { duration: 300 }) }],
      }));

      return Platform.OS === 'web' ? (
        <Icon size={size} color={color} />
      ) : (
        <Animated.View style={animatedStyle}>
          <Icon size={size} color={color} />
        </Animated.View>
      );
    };
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.card,
          borderTopColor: Colors.border,
          height: Platform.OS === 'ios' ? 88 : 68,
          paddingBottom: Platform.OS === 'ios' ? 28 : 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textSecondary,
        tabBarLabelStyle: {
          fontFamily: 'Inter-Medium',
          fontSize: 12,
          marginTop: 4,
        },
        tabBarItemStyle: {
          gap: 4,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: createTabIcon(Home),
        }}
      />
      <Tabs.Screen
        name="contacts"
        options={{
          title: 'Contacts',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="users" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="interactions"
        options={{
          title: 'Interactions',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="comments" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="reminders"
        options={{
          title: 'Reminders',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="bell" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="topics"
        options={{
          title: 'Topics',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="list" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: createTabIcon(Settings),
        }}
      />
    </Tabs>
  );
}