import { StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Screen } from '@/components/common/Screen';
import { TopicsTab } from '@/components/contacts/detail/TopicsTab';
import type { Contact, Interaction } from '@/types/models';

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

const mockInteractions: Interaction[] = [
  {
    id: '1',
    date: new Date(2024, 2, 10),
    contactId: '1',
    type: 'life_event',
    notes: "Sarah got promoted at work! We celebrated at La Piazza restaurant. She was really excited about the new responsibilities and team she'll be leading.",
    location: 'La Piazza Restaurant',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    date: new Date(2024, 2, 1),
    contactId: '1',
    type: 'relationship_event',
    notes: 'Discussed her recent trip to Japan. She loved the food and architecture. Planning to go back next year.',
    location: 'Coffee Shop',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function TopicsScreen() {
  const { id } = useLocalSearchParams();

  return (
    <Screen>
      <TopicsTab 
        contact={mockContact}
        recentInteractions={mockInteractions}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});