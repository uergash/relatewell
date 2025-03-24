import { Stack } from 'expo-router';

export default function InteractionsLayout() {
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