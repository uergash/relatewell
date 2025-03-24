import { useState } from 'react';
import { StyleSheet, View, Text, Pressable, Switch } from 'react-native';
import { router } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { Screen } from '@/components/common/Screen';
import { Colors } from '@/constants/Colors';

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}

export default function NotificationsScreen() {
  const [settings, setSettings] = useState<NotificationSetting[]>([
    {
      id: 'birthdays',
      title: 'Birthday Reminders',
      description: 'Get notified about upcoming birthdays',
      enabled: true,
    },
    {
      id: 'interactions',
      title: 'Interaction Reminders',
      description: 'Reminders for scheduled interactions and follow-ups',
      enabled: true,
    },
    {
      id: 'checkins',
      title: 'Regular Check-ins',
      description: 'Reminders to stay in touch with your contacts',
      enabled: true,
    },
    {
      id: 'gifts',
      title: 'Gift Ideas',
      description: 'Suggestions for gift-giving occasions',
      enabled: false,
    },
    {
      id: 'updates',
      title: 'App Updates',
      description: 'Stay informed about new features and improvements',
      enabled: true,
    },
  ]);

  const toggleSetting = (id: string) => {
    setSettings(current =>
      current.map(setting =>
        setting.id === id
          ? { ...setting, enabled: !setting.enabled }
          : setting
      )
    );
  };

  return (
    <Screen>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <ChevronLeft size={24} color={Colors.text} />
        </Pressable>
        <Text style={styles.title}>Notifications</Text>
      </View>

      <Text style={styles.description}>
        Choose which notifications you'd like to receive and how you'd like to be notified.
      </Text>

      <View style={styles.settingsList}>
        {settings.map((setting) => (
          <View key={setting.id} style={styles.settingItem}>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>{setting.title}</Text>
              <Text style={styles.settingDescription}>{setting.description}</Text>
            </View>
            <Switch
              value={setting.enabled}
              onValueChange={() => toggleSetting(setting.id)}
              trackColor={{ false: Colors.border, true: Colors.primary + '50' }}
              thumbColor={setting.enabled ? Colors.primary : Colors.textSecondary}
            />
          </View>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: Colors.text,
    marginLeft: 8,
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 32,
    lineHeight: 24,
  },
  settingsList: {
    gap: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  settingContent: {
    flex: 1,
    marginRight: 16,
  },
  settingTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.text,
    marginBottom: 4,
  },
  settingDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
});