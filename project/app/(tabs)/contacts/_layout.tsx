import { Stack } from 'expo-router';

export default function ContactsLayout() {
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
          title: 'New Contact',
        }}
      />
      <Stack.Screen 
        name="[id]" 
        options={{
          title: 'Contact Details',
        }}
      />
      <Stack.Screen 
        name="edit/[id]"
        options={{
          presentation: 'modal',
          title: 'Edit Contact',
        }}
      />
    </Stack>
  );
}