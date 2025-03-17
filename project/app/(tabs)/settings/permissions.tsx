import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Pressable, Platform } from 'react-native';
import { router } from 'expo-router';
import * as Contacts from 'expo-contacts';
import { ChevronLeft, Users, Bell, Calendar, CircleAlert as AlertCircle } from 'lucide-react-native';
import { Screen } from '@/components/common/Screen';
import { Colors } from '@/constants/Colors';

interface Permission {
  id: string;
  title: string;
  description: string;
  icon: typeof Users;
  status: 'granted' | 'denied' | 'undetermined';
  onPress: () => void;
}

export default function PermissionsScreen() {
  const [permissions, setPermissions] = useState<Permission[]>([
    {
      id: 'contacts',
      title: 'Contacts',
      description: 'Access your contacts to import and sync them with RelateWell',
      icon: Users,
      status: 'undetermined',
      onPress: async () => {
        if (Platform.OS === 'web') {
          // Show web-specific message
          return;
        }
        const { status } = await Contacts.requestPermissionsAsync();
        updatePermissionStatus('contacts', status);
      },
    },
    {
      id: 'notifications',
      title: 'Notifications',
      description: 'Receive reminders for birthdays, check-ins, and important events',
      icon: Bell,
      status: 'undetermined',
      onPress: () => {
        // Handle notifications permission
      },
    },
    {
      id: 'calendar',
      title: 'Calendar',
      description: 'Sync reminders and events with your calendar',
      icon: Calendar,
      status: 'undetermined',
      onPress: () => {
        // Handle calendar permission
      },
    },
  ]);

  useEffect(() => {
    checkPermissions();
  }, []);

  const checkPermissions = async () => {
    if (Platform.OS === 'web') {
      // Handle web permissions differently
      return;
    }

    // Check contacts permission
    const contactsStatus = await Contacts.getPermissionsAsync();
    updatePermissionStatus('contacts', contactsStatus.status);

    // Add other permission checks here
  };

  const updatePermissionStatus = (id: string, status: 'granted' | 'denied' | 'undetermined') => {
    setPermissions(current =>
      current.map(permission =>
        permission.id === id ? { ...permission, status } : permission
      )
    );
  };

  return (
    <Screen>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <ChevronLeft size={24} color={Colors.text} />
        </Pressable>
        <Text style={styles.title}>Permissions</Text>
      </View>

      <Text style={styles.description}>
        RelateWell needs certain permissions to provide you with the best experience. 
        Here you can manage what features the app can access.
      </Text>

      {Platform.OS === 'web' && (
        <View style={styles.webNotice}>
          <AlertCircle size={20} color={Colors.warning} />
          <Text style={styles.webNoticeText}>
            Some features are limited in the web version. For full functionality, 
            please use the mobile app.
          </Text>
        </View>
      )}

      <View style={styles.permissionsList}>
        {permissions.map((permission) => (
          <Pressable
            key={permission.id}
            style={styles.permissionItem}
            onPress={permission.onPress}>
            <View style={styles.permissionHeader}>
              <View style={[
                styles.iconContainer,
                { backgroundColor: getStatusColor(permission.status) + '20' }
              ]}>
                <permission.icon
                  size={24}
                  color={getStatusColor(permission.status)}
                />
              </View>
              <View style={styles.permissionInfo}>
                <Text style={styles.permissionTitle}>{permission.title}</Text>
                <Text style={styles.permissionDescription}>
                  {permission.description}
                </Text>
              </View>
            </View>
            <View style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor(permission.status) + '20' }
            ]}>
              <Text style={[
                styles.statusText,
                { color: getStatusColor(permission.status) }
              ]}>
                {permission.status.charAt(0).toUpperCase() + permission.status.slice(1)}
              </Text>
            </View>
          </Pressable>
        ))}
      </View>
    </Screen>
  );
}

function getStatusColor(status: string): string {
  switch (status) {
    case 'granted':
      return Colors.success;
    case 'denied':
      return Colors.error;
    default:
      return Colors.textSecondary;
  }
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
    fontSize: 32,
    color: Colors.text,
    marginLeft: 8,
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 24,
    lineHeight: 24,
  },
  webNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    backgroundColor: Colors.warning + '10',
    borderRadius: 12,
    marginBottom: 24,
  },
  webNoticeText: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.text,
    lineHeight: 20,
  },
  permissionsList: {
    gap: 16,
  },
  permissionItem: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  permissionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 12,
  },
  iconContainer: {
    padding: 12,
    borderRadius: 12,
  },
  permissionInfo: {
    flex: 1,
  },
  permissionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: Colors.text,
    marginBottom: 4,
  },
  permissionDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  statusText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
  },
});