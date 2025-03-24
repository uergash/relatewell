import { StyleSheet, View, Text, Pressable, Platform, Linking } from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Phone, Mail, MessageSquare, Plus, ChevronLeft, CreditCard as Edit2, CircleAlert as AlertCircle } from 'lucide-react-native';
import { format, differenceInDays } from 'date-fns';
import { Colors } from '@/constants/Colors';
import type { Contact } from '@/types/models';

interface ContactHeaderProps {
  contact: Contact;
}

export function ContactHeader({ contact }: ContactHeaderProps) {
  const daysUntilBirthday = contact.birthday
    ? differenceInDays(new Date(contact.birthday), new Date())
    : null;

  const hasBirthdaySoon = daysUntilBirthday !== null && daysUntilBirthday <= 30;

  const handleCall = async () => {
    if (!contact.phone) return;

    const phoneUrl = Platform.select({
      ios: `tel:${contact.phone}`,
      android: `tel:${contact.phone}`,
      web: `tel:${contact.phone}`,
    });

    if (phoneUrl) {
      const supported = await Linking.canOpenURL(phoneUrl);
      if (supported) {
        await Linking.openURL(phoneUrl);
      }
    }
  };

  const handleMessage = async () => {
    if (!contact.phone) return;

    const messageUrl = Platform.select({
      ios: `sms:${contact.phone}`,
      android: `sms:${contact.phone}`,
      web: `sms:${contact.phone}`,
    });

    if (messageUrl) {
      const supported = await Linking.canOpenURL(messageUrl);
      if (supported) {
        await Linking.openURL(messageUrl);
      }
    }
  };

  const handleEmail = async () => {
    if (!contact.email) return;

    const emailUrl = `mailto:${contact.email}`;
    const supported = await Linking.canOpenURL(emailUrl);
    if (supported) {
      await Linking.openURL(emailUrl);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={24} color={Colors.text} />
        </Pressable>
        <Pressable 
          onPress={() => router.push(`/contacts/edit/${contact.id}`)}
          style={styles.editButton}>
          <Edit2 size={20} color={Colors.primary} />
        </Pressable>
      </View>

      <View style={styles.profileSection}>
        <View style={styles.profileInfo}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: contact.profilePicture || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330' }}
              style={styles.profileImage}
              contentFit="cover"
              transition={200}
            />
            <View style={styles.relationshipBadge}>
              <Text style={styles.relationshipText}>{contact.relationshipType}</Text>
            </View>
          </View>
          <View style={styles.nameSection}>
            <Text style={styles.name}>{contact.name}</Text>
            {hasBirthdaySoon && (
              <View style={styles.birthdayBadge}>
                <Text style={styles.birthdayText}>
                  🎂 {daysUntilBirthday} days
                </Text>
              </View>
            )}
          </View>
        </View>

        {Platform.OS === 'web' && (
          <View style={styles.webNotice}>
            <AlertCircle size={16} color={Colors.warning} />
            <Text style={styles.webNoticeText}>
              Call and message features are limited in the web version
            </Text>
          </View>
        )}

        <View style={styles.quickActions}>
          {contact.phone && (
            <Pressable 
              style={styles.actionButton}
              onPress={handleCall}>
              <Phone size={20} color={Colors.primary} />
              <Text style={styles.actionText}>Call</Text>
            </Pressable>
          )}
          {contact.phone && (
            <Pressable 
              style={styles.actionButton}
              onPress={handleMessage}>
              <MessageSquare size={20} color={Colors.primary} />
              <Text style={styles.actionText}>Message</Text>
            </Pressable>
          )}
          {contact.email && (
            <Pressable 
              style={styles.actionButton}
              onPress={handleEmail}>
              <Mail size={20} color={Colors.primary} />
              <Text style={styles.actionText}>Email</Text>
            </Pressable>
          )}
          <Pressable 
            style={styles.actionButton}
            onPress={() => router.push(`/interactions/new?contactId=${contact.id}`)}>
            <Plus size={20} color={Colors.primary} />
            <Text style={styles.actionText}>Add</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  editButton: {
    padding: 8,
    marginRight: -8,
  },
  profileSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  imageContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.border,
  },
  nameSection: {
    flex: 1,
  },
  relationshipBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: Colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  relationshipText: {
    fontFamily: 'Inter-Medium',
    fontSize: 10,
    color: Colors.card,
  },
  name: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: Colors.text,
    marginBottom: 4,
  },
  birthdayBadge: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  birthdayText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: Colors.card,
  },
  webNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 8,
    backgroundColor: Colors.warning + '10',
    borderRadius: 8,
  },
  webNoticeText: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.text,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 8,
    gap: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: Colors.background,
    borderRadius: 8,
  },
  actionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: Colors.primary,
  },
});