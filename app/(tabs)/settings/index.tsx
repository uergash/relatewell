import { StyleSheet, View, Text, ScrollView, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { 
  Settings as SettingsIcon, 
  Bell, 
  Users, 
  Shield, 
  CircleHelp as HelpCircle, 
  ExternalLink,
  User,
  KeyRound,
} from 'lucide-react-native';
import { Screen } from '@/components/common/Screen';
import { Colors } from '@/constants/Colors';

interface SettingItem {
  id: string;
  title: string;
  description: string;
  icon: typeof SettingsIcon;
  route?: string;
  external?: boolean;
}

const settings: SettingItem[] = [
  {
    id: 'profile',
    title: 'Profile Settings',
    description: 'Manage your personal information and preferences',
    icon: User,
    route: '/settings/profile',
  },
  {
    id: 'password',
    title: 'Change Password',
    description: 'Update your account password',
    icon: KeyRound,
    route: '/settings/password',
  },
  {
    id: 'notifications',
    title: 'Notifications',
    description: 'Configure how and when you receive notifications',
    icon: Bell,
    route: '/settings/notifications',
  },
  {
    id: 'permissions',
    title: 'Permissions',
    description: 'Manage app permissions for contacts, notifications, and more',
    icon: Shield,
    route: '/settings/permissions',
  },
  {
    id: 'contacts',
    title: 'Contact Sync',
    description: 'Import and manage phone contacts',
    icon: Users,
    route: '/settings/contacts',
  },
  {
    id: 'help',
    title: 'Help & Support',
    description: 'Get help, report issues, or suggest features',
    icon: HelpCircle,
    route: 'https://support.example.com',
    external: true,
  },
];

// Mock user data - replace with actual user data
const mockUser = {
  name: 'Sarah Chen',
  email: 'sarah.chen@example.com',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
};

export default function SettingsScreen() {
  const handlePress = async (item: SettingItem) => {
    if (item.external && item.route) {
      // Handle external links
    } else if (item.route) {
      router.push(item.route);
    }
  };

  return (
    <Screen>
      <Text style={styles.title}>Settings</Text>

      <Pressable 
        style={styles.profileCard}
        onPress={() => router.push('/settings/profile')}>
        <Image
          source={{ uri: mockUser.avatar }}
          style={styles.avatar}
          contentFit="cover"
          transition={200}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{mockUser.name}</Text>
          <Text style={styles.profileEmail}>{mockUser.email}</Text>
        </View>
        <Text style={styles.chevron}>›</Text>
      </Pressable>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {settings.map((item) => (
          <Pressable
            key={item.id}
            style={styles.settingItem}
            onPress={() => handlePress(item)}>
            <View style={styles.settingContent}>
              <View style={[
                styles.iconContainer,
                { backgroundColor: getIconColor(item.id) + '20' }
              ]}>
                <item.icon size={24} color={getIconColor(item.id)} />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.settingTitle}>{item.title}</Text>
                <Text style={styles.settingDescription}>{item.description}</Text>
              </View>
            </View>
            {item.external ? (
              <ExternalLink size={20} color={Colors.textSecondary} />
            ) : (
              <Text style={styles.chevron}>›</Text>
            )}
          </Pressable>
        ))}
      </ScrollView>
    </Screen>
  );
}

function getIconColor(id: string): string {
  switch (id) {
    case 'profile':
      return Colors.primary;
    case 'password':
      return Colors.accent;
    case 'notifications':
      return Colors.warning;
    case 'permissions':
      return Colors.success;
    case 'contacts':
      return Colors.primary;
    default:
      return Colors.textSecondary;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    color: Colors.text,
    marginBottom: 24,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.border,
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  profileName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: Colors.text,
  },
  profileEmail: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  settingContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconContainer: {
    padding: 12,
    borderRadius: 12,
  },
  textContainer: {
    flex: 1,
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
  },
  chevron: {
    fontFamily: 'Inter-Medium',
    fontSize: 24,
    color: Colors.textSecondary,
  },
});