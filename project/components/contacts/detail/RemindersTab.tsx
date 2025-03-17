import { useState, useMemo } from 'react';
import { StyleSheet, View, Text, ScrollView, Pressable } from 'react-native';
import { Plus } from 'lucide-react-native';
import { router } from 'expo-router';
import { ReminderCard } from '@/components/reminders/ReminderCard';
import { Colors } from '@/constants/Colors';
import type { Contact, Reminder } from '@/types/models';

interface RemindersTabProps {
  contact: Contact;
}

// Temporary mock data
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
];

export function RemindersTab({ contact }: RemindersTabProps) {
  const [showCompleted, setShowCompleted] = useState(false);

  const filteredReminders = useMemo(() => {
    return mockReminders
      .filter(r => r.contactId === contact.id)
      .filter(r => showCompleted || r.status !== 'completed')
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [contact.id, showCompleted]);

  const handleComplete = (id: string) => {
    // Handle completing reminder
  };

  const handleSnooze = (id: string) => {
    // Handle snoozing reminder
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Reminders</Text>
        <Pressable 
          style={styles.addButton}
          onPress={() => router.push(`/reminders/new?contactId=${contact.id}`)}>
          <Plus size={20} color={Colors.primary} />
          <Text style={styles.addButtonText}>Add Reminder</Text>
        </Pressable>
      </View>

      <Pressable
        style={styles.toggleButton}
        onPress={() => setShowCompleted(!showCompleted)}>
        <Text style={styles.toggleText}>
          {showCompleted ? 'Hide' : 'Show'} completed reminders
        </Text>
      </Pressable>

      <View style={styles.list}>
        {filteredReminders.map((reminder) => (
          <ReminderCard
            key={reminder.id}
            reminder={reminder}
            contact={contact}
            onComplete={handleComplete}
            onSnooze={handleSnooze}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: Colors.text,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: Colors.primary + '20',
  },
  addButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.primary,
  },
  toggleButton: {
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  toggleText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.primary,
  },
  list: {
    gap: 12,
  },
});