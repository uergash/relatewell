import { useState, useMemo } from 'react';
import { StyleSheet, View, Text, ScrollView, Pressable } from 'react-native';
import { router } from 'expo-router';
import { Plus, ChevronDown } from 'lucide-react-native';
import { Screen } from '@/components/common/Screen';
import { ReminderCard } from '@/components/reminders/ReminderCard';
import { Colors } from '@/constants/Colors';
import type { Contact, Reminder } from '@/types/models';

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

const mockReminders: Reminder[] = [
  {
    id: '1',
    title: 'Birthday Celebration',
    description: 'Remember to wish Sarah a happy birthday and send the gift',
    type: 'birthday',
    date: new Date(2024, 2, 15),
    time: '09:00',
    contactId: '1',
    status: 'pending',
    recurrence: 'yearly',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    title: 'Follow up on promotion',
    description: 'Check how Sarah is doing with her new team and responsibilities',
    type: 'follow_up',
    date: new Date(2024, 2, 20),
    contactId: '1',
    status: 'pending',
    recurrence: 'none',
    interactionId: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    title: 'Monthly check-in',
    type: 'check_in',
    date: new Date(2024, 3, 1),
    contactId: '2',
    status: 'pending',
    recurrence: 'monthly',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

type FilterStatus = 'all' | 'pending' | 'completed' | 'snoozed';

export default function RemindersScreen() {
  const [showCompleted, setShowCompleted] = useState(false);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('pending');
  const [selectedContact, setSelectedContact] = useState<string | null>(null);

  const filteredReminders = useMemo(() => {
    let reminders = mockReminders;

    if (selectedContact) {
      reminders = reminders.filter(r => r.contactId === selectedContact);
    }

    if (filterStatus !== 'all') {
      reminders = reminders.filter(r => r.status === filterStatus);
    }

    return reminders.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [selectedContact, filterStatus]);

  const handleComplete = (id: string) => {
    // Handle completing reminder
  };

  const handleSnooze = (id: string) => {
    // Handle snoozing reminder
  };

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

      <View style={styles.filters}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScroll}>
          {(['all', 'pending', 'snoozed', 'completed'] as const).map((status) => (
            <Pressable
              key={status}
              style={[
                styles.filterChip,
                filterStatus === status && styles.filterChipActive
              ]}
              onPress={() => setFilterStatus(status)}>
              <Text style={[
                styles.filterText,
                filterStatus === status && styles.filterTextActive
              ]}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        <Pressable 
          style={styles.contactFilter}
          onPress={() => {
            // Handle contact filter
          }}>
          <Text style={styles.contactFilterText}>
            {selectedContact 
              ? mockContacts.find(c => c.id === selectedContact)?.name 
              : 'All Contacts'}
          </Text>
          <ChevronDown size={16} color={Colors.text} />
        </Pressable>
      </View>

      <ScrollView 
        style={styles.list}
        showsVerticalScrollIndicator={false}>
        {filteredReminders.map((reminder) => (
          <ReminderCard
            key={reminder.id}
            reminder={reminder}
            contact={mockContacts.find(c => c.id === reminder.contactId)!}
            onComplete={handleComplete}
            onSnooze={handleSnooze}
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
    marginBottom: 16,
  },
  filterScroll: {
    gap: 8,
    paddingRight: 16,
  },
  filterChip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  filterChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.text,
  },
  filterTextActive: {
    color: Colors.card,
  },
  contactFilter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  contactFilterText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.text,
  },
  list: {
    flex: 1,
  },
});