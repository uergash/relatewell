import { useState, useMemo } from 'react';
import { StyleSheet, View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { Plus } from 'lucide-react-native';
import { Screen } from '@/components/common/Screen';
import { ReminderCard } from '@/components/reminders/ReminderCard';
import { ReminderFilters } from '@/components/reminders/ReminderFilters';
import { Colors } from '@/constants/Colors';
import { useReminders } from '@/hooks/useReminders';
import type { Reminder } from '@/types/models';

export default function RemindersScreen() {
  const { reminders, loading, error, refreshReminders } = useReminders();
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'pending' | 'completed' | 'snoozed'>('all');
  const [selectedType, setSelectedType] = useState<'all' | 'birthday' | 'follow_up' | 'custom'>('all');

  const filteredReminders = useMemo(() => {
    let filtered = reminders;

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(r => r.status === selectedStatus);
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter(r => r.type === selectedType);
    }

    return filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [reminders, selectedStatus, selectedType]);

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
          <Text style={styles.errorText}>Error loading reminders: {error.message}</Text>
          <Text style={styles.retryText} onPress={refreshReminders}>Tap to retry</Text>
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={styles.title}>Reminders</Text>
        <Plus
          size={24}
          color={Colors.primary}
          onPress={() => router.push('/reminders/new')}
        />
      </View>

      <ReminderFilters
        selectedStatus={selectedStatus}
        selectedType={selectedType}
        onSelectStatus={setSelectedStatus}
        onSelectType={setSelectedType}
      />

      <ScrollView 
        style={styles.list}
        showsVerticalScrollIndicator={false}>
        {filteredReminders.map((reminder) => (
          <ReminderCard
            key={reminder.id}
            reminder={reminder}
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