import { StyleSheet, Text, View, ScrollView, Pressable, Platform } from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { format } from 'date-fns';
import { Screen } from '@/components/common/Screen';
import { DashboardCard } from '@/components/home/DashboardCard';
import { QuickActions } from '@/components/home/QuickActions';
import { Colors } from '@/constants/Colors';

// Temporary mock data
const upcomingBirthdays = [
  {
    id: '1',
    name: 'Sarah Chen',
    birthday: new Date(2024, 2, 15),
    profilePicture: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
  },
  {
    id: '2',
    name: 'Michael Rodriguez',
    birthday: new Date(2024, 2, 18),
    profilePicture: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
  },
];

const recentInteractions = [
  {
    id: '1',
    contactName: 'Emma Wilson',
    type: 'life_event',
    date: new Date(2024, 2, 10),
    notes: 'Got promoted at work',
  },
  {
    id: '2',
    contactName: 'James Thompson',
    type: 'relationship_event',
    date: new Date(2024, 2, 9),
    notes: 'Coffee meetup',
  },
];

const upcomingReminders = [
  {
    id: '1',
    title: "Send birthday card to Mom",
    date: new Date(2024, 2, 20),
    contactName: 'Mom',
  },
  {
    id: '2',
    title: "Call David about his new job",
    date: new Date(2024, 2, 16),
    contactName: 'David Miller',
  },
];

export default function HomeScreen() {
  const navigateToContact = (id: string) => {
    router.push(`/contacts/${id}`);
  };

  const navigateToInteraction = (id: string) => {
    router.push(`/interactions/${id}`);
  };

  const navigateToReminder = (id: string) => {
    router.push(`/reminders/${id}`);
  };

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>RelateWell</Text>
          <Text style={styles.subtitle}>Manage your relationships with care</Text>
        </View>

        <DashboardCard 
          title="Upcoming Birthdays"
          action={{ label: 'See all', onPress: () => router.push('/birthdays') }}>
          <View style={styles.birthdayList}>
            {upcomingBirthdays.map((contact) => (
              <Pressable
                key={contact.id}
                style={styles.birthdayItem}
                onPress={() => navigateToContact(contact.id)}>
                <Image
                  source={{ uri: contact.profilePicture }}
                  style={styles.avatar}
                  contentFit="cover"
                  transition={200}
                />
                <View>
                  <Text style={styles.contactName}>{contact.name}</Text>
                  <Text style={styles.birthdayDate}>
                    {format(contact.birthday, 'MMMM d')}
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>
        </DashboardCard>

        <DashboardCard 
          title="Recent Interactions"
          action={{ label: 'Add new', onPress: () => router.push('/interactions/new') }}>
          <View style={styles.interactionList}>
            {recentInteractions.map((interaction) => (
              <Pressable
                key={interaction.id}
                style={styles.interactionItem}
                onPress={() => navigateToInteraction(interaction.id)}>
                <View style={styles.interactionHeader}>
                  <Text style={styles.contactName}>{interaction.contactName}</Text>
                  <Text style={styles.interactionDate}>
                    {format(interaction.date, 'MMM d')}
                  </Text>
                </View>
                <Text style={styles.interactionNotes}>{interaction.notes}</Text>
              </Pressable>
            ))}
          </View>
        </DashboardCard>

        <DashboardCard 
          title="Upcoming Reminders"
          action={{ label: 'View all', onPress: () => router.push('/reminders') }}>
          <View style={styles.reminderList}>
            {upcomingReminders.map((reminder) => (
              <Pressable
                key={reminder.id}
                style={styles.reminderItem}
                onPress={() => navigateToReminder(reminder.id)}>
                <View style={styles.reminderContent}>
                  <Text style={styles.reminderTitle}>{reminder.title}</Text>
                  <Text style={styles.reminderContact}>with {reminder.contactName}</Text>
                </View>
                <Text style={styles.reminderDate}>
                  {format(reminder.date, 'MMM d')}
                </Text>
              </Pressable>
            ))}
          </View>
        </DashboardCard>
      </ScrollView>

      <QuickActions />
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 24,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    color: Colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.textSecondary,
  },
  birthdayList: {
    gap: 12,
  },
  birthdayItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.border,
  },
  contactName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.text,
  },
  birthdayDate: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.textSecondary,
  },
  interactionList: {
    gap: 12,
  },
  interactionItem: {
    gap: 4,
  },
  interactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  interactionDate: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.textSecondary,
  },
  interactionNotes: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.text,
  },
  reminderList: {
    gap: 12,
  },
  reminderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reminderContent: {
    flex: 1,
  },
  reminderTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 15,
    color: Colors.text,
  },
  reminderContact: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.textSecondary,
  },
  reminderDate: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.primary,
  },
});