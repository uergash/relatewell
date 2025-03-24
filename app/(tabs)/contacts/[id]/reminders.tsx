import { StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Screen } from '@/components/common/Screen';
import { RemindersTab } from '@/components/contacts/detail/RemindersTab';
import type { Contact } from '@/types/models';

// Temporary mock data
const mockContact: Contact = {
  id: '1',
  name: 'Sarah Chen',
  phone: '+1 (555) 123-4567',
  email: 'sarah.chen@example.com',
  relationshipType: 'Friend',
  birthday: new Date(1990, 2, 15),
  profilePicture: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
  createdAt: new Date(),
  updatedAt: new Date(),
};

export default function RemindersScreen() {
  const { id } = useLocalSearchParams();

  return (
    <Screen>
      <RemindersTab contact={mockContact} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});