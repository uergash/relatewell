import { StyleSheet, View, Text, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { format, isToday, isTomorrow, differenceInDays } from 'date-fns';
import { Bell, Calendar, CircleCheck as CheckCircle2, Clock, Gift, RotateCcw, Users } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import type { Reminder, Contact } from '@/types/models';

interface ReminderCardProps {
  reminder: Reminder;
  contact: Contact;
  onComplete: (id: string) => void;
  onSnooze: (id: string) => void;
}

const typeConfig = {
  birthday: {
    icon: Gift,
    color: Colors.accent,
  },
  check_in: {
    icon: Users,
    color: Colors.primary,
  },
  follow_up: {
    icon: RotateCcw,
    color: Colors.success,
  },
  custom: {
    icon: Bell,
    color: Colors.textSecondary,
  },
} as const;

function getDateLabel(date: Date) {
  if (isToday(date)) return 'Today';
  if (isTomorrow(date)) return 'Tomorrow';
  
  const daysUntil = differenceInDays(date, new Date());
  if (daysUntil < 0) return format(date, 'MMM d, yyyy');
  if (daysUntil < 7) return format(date, 'EEEE');
  return format(date, 'MMM d');
}

export function ReminderCard({ reminder, contact, onComplete, onSnooze }: ReminderCardProps) {
  const type = typeConfig[reminder.type];
  const isPast = new Date(reminder.date) < new Date();
  const isCompleted = reminder.status === 'completed';
  const isSnoozed = reminder.status === 'snoozed';

  return (
    <Pressable 
      style={[
        styles.container,
        isCompleted && styles.completedContainer,
      ]}
      onPress={() => router.push(`/reminders/${reminder.id}`)}>
      <View style={styles.header}>
        <View style={styles.typeContainer}>
          <View style={[styles.iconContainer, { backgroundColor: type.color + '20' }]}>
            <type.icon size={16} color={type.color} />
          </View>
          <Text style={[styles.type, { color: type.color }]}>
            {reminder.type.charAt(0).toUpperCase() + reminder.type.slice(1).replace('_', ' ')}
          </Text>
        </View>
        {!isCompleted && (
          <View style={styles.actions}>
            <Pressable 
              style={styles.actionButton}
              onPress={() => onComplete(reminder.id)}>
              <CheckCircle2 size={20} color={Colors.success} />
            </Pressable>
            <Pressable 
              style={styles.actionButton}
              onPress={() => onSnooze(reminder.id)}>
              <Clock size={20} color={Colors.primary} />
            </Pressable>
          </View>
        )}
      </View>

      <Text style={styles.title}>{reminder.title}</Text>
      {reminder.description && (
        <Text style={styles.description} numberOfLines={2}>
          {reminder.description}
        </Text>
      )}

      <View style={styles.footer}>
        <Pressable 
          style={styles.contact}
          onPress={() => router.push(`/contacts/${contact.id}`)}>
          <Image
            source={{ uri: contact.profilePicture }}
            style={styles.avatar}
            contentFit="cover"
            transition={200}
          />
          <Text style={styles.contactName}>{contact.name}</Text>
        </Pressable>

        <View style={styles.dateContainer}>
          <Calendar size={14} color={Colors.textSecondary} />
          <Text style={[
            styles.date,
            isPast && !isCompleted && styles.pastDate
          ]}>
            {getDateLabel(new Date(reminder.date))}
            {reminder.time && ` at ${reminder.time}`}
          </Text>
        </View>
      </View>

      {isSnoozed && reminder.snoozedUntil && (
        <View style={styles.snoozeBadge}>
          <Clock size={12} color={Colors.primary} />
          <Text style={styles.snoozeText}>
            Snoozed until {format(new Date(reminder.snoozedUntil), 'MMM d')}
          </Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  completedContainer: {
    opacity: 0.6,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconContainer: {
    padding: 6,
    borderRadius: 8,
  },
  type: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    padding: 4,
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.text,
    marginBottom: 4,
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
  contact: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.border,
  },
  contactName: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.text,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  date: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.textSecondary,
  },
  pastDate: {
    color: Colors.error,
  },
  snoozeBadge: {
    position: 'absolute',
    top: -6,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: Colors.primary + '20',
    borderRadius: 12,
  },
  snoozeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 10,
    color: Colors.primary,
  },
});