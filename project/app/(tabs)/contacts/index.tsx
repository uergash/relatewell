import { useState, useMemo } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { router } from 'expo-router';
import { UserPlus } from 'lucide-react-native';
import { Screen } from '@/components/common/Screen';
import { SearchBar } from '@/components/contacts/SearchBar';
import { GroupFilter } from '@/components/contacts/GroupFilter';
import { ContactCard } from '@/components/contacts/ContactCard';
import { Colors } from '@/constants/Colors';
import type { Contact, Group } from '@/types/models';

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

const mockGroups: Group[] = [
  {
    id: '1',
    name: 'Close Friends',
    description: 'My closest friends',
    contacts: ['1'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'Work',
    description: 'Professional contacts',
    contacts: ['2'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function ContactsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  const filteredContacts = useMemo(() => {
    let contacts = mockContacts;

    if (selectedGroup) {
      const group = mockGroups.find(g => g.id === selectedGroup);
      contacts = contacts.filter(contact => group?.contacts.includes(contact.id));
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      contacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(query) ||
        contact.email?.toLowerCase().includes(query) ||
        contact.phone?.toLowerCase().includes(query)
      );
    }

    return contacts.sort((a, b) => a.name.localeCompare(b.name));
  }, [searchQuery, selectedGroup]);

  const handleAddInteraction = (contactId: string) => {
    router.push(`/interactions/new?contactId=${contactId}`);
  };

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={styles.title}>Contacts</Text>
        <UserPlus
          size={24}
          color={Colors.primary}
          onPress={() => router.push('/contacts/new')}
        />
      </View>

      <View style={styles.filters}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <GroupFilter
          groups={mockGroups}
          selectedGroup={selectedGroup}
          onSelectGroup={setSelectedGroup}
        />
      </View>

      <ScrollView 
        style={styles.list}
        showsVerticalScrollIndicator={false}>
        {filteredContacts.map((contact) => (
          <ContactCard
            key={contact.id}
            contact={contact}
            onAddInteraction={handleAddInteraction}
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
  filters: {
    gap: 12,
    marginBottom: 24,
  },
  list: {
    flex: 1,
  },
});