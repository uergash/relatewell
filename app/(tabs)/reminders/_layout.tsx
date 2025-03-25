import { Stack } from 'expo-router';
import { Bell } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';

export default function RemindersLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Bell size={size} color={color} />
          ),
        }} 
      />
      <Stack.Screen 
        name="new" 
        options={{
          presentation: 'modal',
          title: 'New Reminder',
        }}
      />
      <Stack.Screen 
        name="[id]" 
        options={{
          title: 'Reminder Details',
        }}
      />
    </Stack>
  );
}