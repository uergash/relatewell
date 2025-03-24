import { Stack } from 'expo-router';

export default function RemindersLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          headerShown: false,
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