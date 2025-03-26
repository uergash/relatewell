import { useState, useMemo } from 'react';
import { StyleSheet, View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { Plus } from 'lucide-react-native';
import { Screen } from '@/components/common/Screen';
import { InteractionCard } from '@/components/interactions/InteractionCard';
import { InteractionFilters } from '@/components/interactions/InteractionFilters';
import { Colors } from '@/constants/Colors';
import { useInteractions } from '@/hooks/useInteractions';
import { useContacts } from '@/hooks/useContacts';
import type { Interaction } from '@/types/models';

export default function InteractionsScreen() {
  const { interactions, loading: interactionsLoading, error: interactionsError, refreshInteractions } = useInteractions();
  const { contacts, loading: contactsLoading, error: contactsError } = useContacts();
  const [selectedContact, setSelectedContact] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<'all' | 'life_event' | 'relationship_event'>('all');
  const [dateRange, setDateRange] = useState<{ start: Date; end: Date } | null>(null);

  const filteredInteractions = useMemo(() => {
    let filtered = interactions;

    if (selectedContact) {
      filtered = filtered.filter(i => i.contactId === selectedContact);
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter(i => i.type === selectedType);
    }

    if (dateRange) {
      filtered = filtered.filter(i => {
        const date = new Date(i.date);
        return date >= dateRange.start && date <= dateRange.end;
      });
    }

    return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [interactions, selectedContact, selectedType, dateRange]);

  if (interactionsLoading || contactsLoading) {
    return (
      <Screen>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      </Screen>
    );
  }

  if (interactionsError || contactsError) {
    return (
      <Screen>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            Error loading data: {interactionsError?.message || contactsError?.message}
          </Text>
          <Text style={styles.retryText} onPress={refreshInteractions}>Tap to retry</Text>
        </View>
      </Screen>
    );
  }

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
        contacts={contacts}
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
            contact={contacts.find(c => c.id === interaction.contactId)!}
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