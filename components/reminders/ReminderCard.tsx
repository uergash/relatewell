import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { Check, Clock, Calendar } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import type { Reminder } from '@/types/models';
import { useContacts } from '@/hooks/useContacts';
import { useReminders } from '@/hooks/useReminders';

interface ReminderCardProps {
  reminder: Reminder;
}

export function ReminderCard({ reminder }: ReminderCardProps) {
  const { getContactById } = useContacts();
  const { updateReminder } = useReminders();
  const [contact, setContact] = useState<any>(null);

  useEffect(() => {
    loadContact();
  }, [reminder.contactId]);

  const loadContact = async () => {
    if (reminder.contactId) {
      const contactData = await getContactById(reminder.contactId);
      setContact(contactData);
    }
  };

  const handleComplete = async () => {
    try {
      await updateReminder(reminder.id, { status: 'completed' });
    } catch (error) {
      console.error('Failed to complete reminder:', error);
    }
  };

  const handleSnooze = async () => {
    try {
      const snoozeDate = new Date();
      snoozeDate.setHours(snoozeDate.getHours() + 24); // Snooze for 24 hours
      await updateReminder(reminder.id, { 
        status: 'snoozed',
        snoozedUntil: snoozeDate
      });
    } catch (error) {
      console.error('Failed to snooze reminder:', error);
    }
  };

  return (
    <Pressable style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{reminder.title}</Text>
          {contact && (
            <Text style={styles.contactName}>for {contact.name}</Text>
          )}
        </View>
        <View style={styles.actions}>
          <Pressable 
            style={styles.actionButton}
            onPress={handleComplete}>
            <Check size={20} color={Colors.success} />
          </Pressable>
          <Pressable 
            style={styles.actionButton}
            onPress={handleSnooze}>
            <Clock size={20} color={Colors.warning} />
          </Pressable>
        </View>
      </View>

      {reminder.description && (
        <Text style={styles.description}>{reminder.description}</Text>
      )}

      <View style={styles.footer}>
        <View style={styles.dateContainer}>
          <Calendar size={16} color={Colors.text} />
          <Text style={styles.date}>
            {new Date(reminder.date).toLocaleDateString()}
            {reminder.time && ` at ${reminder.time}`}
          </Text>
        </View>
        <View style={[
          styles.statusBadge,
          { backgroundColor: getStatusColor(reminder.status) }
        ]}>
          <Text style={styles.statusText}>
            {reminder.status.charAt(0).toUpperCase() + reminder.status.slice(1)}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

function getStatusColor(status: string): string {
  switch (status) {
    case 'pending':
      return Colors.warning;
    case 'completed':
      return Colors.success;
    case 'snoozed':
      return Colors.primaryLight;
    default:
      return Colors.text;
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  titleContainer: {
    flex: 1,
    marginRight: 8,
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.text,
    marginBottom: 4,
  },
  contactName: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.textSecondary,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 4,
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  date: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.textSecondary,
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  statusText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: Colors.card,
  },
});