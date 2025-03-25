import { Stack } from 'expo-router';
import { MessageCircle } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';

export default function InteractionsLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MessageCircle size={size} color={color} />
          ),
        }} 
      />
      <Stack.Screen 
        name="new" 
        options={{
          presentation: 'modal',
          title: 'New Interaction',
        }}
      />
      <Stack.Screen 
        name="[id]" 
        options={{
          title: 'Interaction Details',
        }}
      />
    </Stack>
  );
}