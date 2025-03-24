import { useState, useMemo } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Plus } from 'lucide-react-native';
import { Screen } from '@/components/common/Screen';
import { InteractionCard } from '@/components/interactions/InteractionCard';
import { InteractionFilters } from '@/components/interactions/InteractionFilters';
import { Colors } from '@/constants/Colors';
import type { Contact, Interaction } from '@/types/models';

// Temporary mock data
const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    phone: '+1 (555) 123-4567',
    email: 'sarah.chen@example.com',
    relationshipType: 'Friend',
    birthday: new Date(1990, 2, 15),
    profilePicture: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'Michael Rodriguez',
    phone: '+1 (555) 987-6543',
    email: 'michael.r@example.com',
    relationshipType: 'Colleague',
    birthday: new Date(1988, 5, 22),
    profilePicture: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

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
    date: new Date(2024, 2, 9),
    contactId: '2',
    type: 'relationship_event',
    notes: 'Coffee meetup with Michael to discuss the new project collaboration. He shared some interesting insights about market trends.',
    location: 'Starbucks Downtown',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function InteractionsScreen() {
  const [selectedContact, setSelectedContact] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<'all' | 'life_event' | 'relationship_event'>('all');
  const [dateRange, setDateRange] = useState<{ start: Date; end: Date } | null>(null);

  const filteredInteractions = useMemo(() => {
    let interactions = mockInteractions;

    if (selectedContact) {
      interactions = interactions.filter(i => i.contactId === selectedContact);
    }

    if (selectedType !== 'all') {
      interactions = interactions.filter(i => i.type === selectedType);
    }

    if (dateRange) {
      interactions = interactions.filter(i => {
        const date = new Date(i.date);
        return date >= dateRange.start && date <= dateRange.end;
      });
    }

    return interactions.sort((a, b) => b.date.getTime() - a.date.getTime());
  }, [selectedContact, selectedType, dateRange]);

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={styles.title}>Interactions</Text>
        <Plus
          size={24}
          color={Colors.primary}
          onPress={() => router.push('/interactions/new')}
        />
      </View>

      <InteractionFilters
        contacts={mockContacts}
        selectedContact={selectedContact}
        selectedType={selectedType}
        dateRange={dateRange}
        onSelectContact={setSelectedContact}
        onSelectType={setSelectedType}
        onSelectDateRange={setDateRange}
      />

      <ScrollView 
        style={styles.list}
        showsVerticalScrollIndicator={false}>
        {filteredInteractions.map((interaction) => (
          <InteractionCard
            key={interaction.id}
            interaction={interaction}
            contact={mockContacts.find(c => c.id === interaction.contactId)!}
          />
        ))}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    color: Colors.text,
  },
  list: {
    flex: 1,
    marginTop: 16,
  },
});