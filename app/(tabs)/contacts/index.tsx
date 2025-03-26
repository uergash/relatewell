import { useState, useMemo } from 'react';
import { StyleSheet, View, ScrollView, Text, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { UserPlus } from 'lucide-react-native';
import { Screen } from '@/components/common/Screen';
import { SearchBar } from '@/components/contacts/SearchBar';
import { GroupFilter } from '@/components/contacts/GroupFilter';
import { ContactCard } from '@/components/contacts/ContactCard';
import { Colors } from '@/constants/Colors';
import { useContacts } from '@/hooks/useContacts';
import type { Contact, Group } from '@/types/models';

// Temporary mock data for groups until we implement group functionality
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
  const { contacts, loading, error, refreshContacts } = useContacts();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  const filteredContacts = useMemo(() => {
    let filtered = contacts;

    if (selectedGroup) {
      const group = mockGroups.find(g => g.id === selectedGroup);
      filtered = filtered.filter(contact => group?.contacts.includes(contact.id));
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(contact =>
        contact.name.toLowerCase().includes(query) ||
        contact.email?.toLowerCase().includes(query) ||
        contact.phone?.toLowerCase().includes(query)
      );
    }

    return filtered.sort((a, b) => a.name.localeCompare(b.name));
  }, [contacts, searchQuery, selectedGroup]);

  const handleAddInteraction = (contactId: string) => {
    router.push(`/interactions/new?contactId=${contactId}`);
  };

  if (loading) {
    return (
      <Screen>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      </Screen>
    );
  }

  if (error) {
    return (
      <Screen>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error loading contacts: {error.message}</Text>
          <Text style={styles.retryText} onPress={refreshContacts}>Tap to retry</Text>
        </View>
      </Screen>
    );
  }

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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: Colors.error,
    textAlign: 'center',
    marginBottom: 12,
  },
  retryText: {
    color: Colors.primary,
    textDecorationLine: 'underline',
  },
});