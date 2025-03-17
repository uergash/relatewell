import { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Screen } from '@/components/common/Screen';
import { ContactHeader } from '@/components/contacts/detail/ContactHeader';
import { ContactTabs } from '@/components/contacts/detail/ContactTabs';
import { InfoTab } from '@/components/contacts/detail/InfoTab';
import { InteractionsTab } from '@/components/contacts/detail/InteractionsTab';
import { TopicsTab } from '@/components/contacts/detail/TopicsTab';
import { GiftsTab } from '@/components/contacts/detail/GiftsTab';
import { RemindersTab } from '@/components/contacts/detail/RemindersTab';
import { Colors } from '@/constants/Colors';
import type { Contact } from '@/types/models';

// Temporary mock data - replace with actual data fetching
const mockContact: Contact = {
  id: '1',
  name: 'Sarah Chen',
  phone: '+1 (555) 123-4567',
  email: 'sarah.chen@example.com',
  relationshipType: 'Friend',
  birthday: new Date(1990, 2, 15),
  profilePicture: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
  createdAt: new Date(),
  updatedAt: new Date(),
};

export default function ContactDetailScreen() {
  const { id } = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState<'info' | 'interactions' | 'topics' | 'gifts' | 'reminders'>('info');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'info':
        return <InfoTab contact={mockContact} />;
      case 'interactions':
        return <InteractionsTab contact={mockContact} />;
      case 'topics':
        return <TopicsTab contact={mockContact} recentInteractions={[]} />;
      case 'gifts':
        return <GiftsTab contact={mockContact} />;
      case 'reminders':
        return <RemindersTab contact={mockContact} />;
      default:
        return null;
    }
  };

  return (
    <Screen style={styles.container}>
      <ContactHeader contact={mockContact} />
      <ContactTabs activeTab={activeTab} onChangeTab={setActiveTab} />
      <View style={styles.content}>
        {renderTabContent()}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 0,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    padding: 16,
  },
});