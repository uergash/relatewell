import { StyleSheet, View, Text, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { MessageSquare, Plus, Phone, Mail } from 'lucide-react-native';
import { format, differenceInDays } from 'date-fns';
import { Colors } from '@/constants/Colors';
import type { Contact } from '@/types/models';

interface ContactCardProps {
  contact: Contact;
  onAddInteraction: (contactId: string) => void;
}

export function ContactCard({ contact, onAddInteraction }: ContactCardProps) {
  const hasBirthdaySoon = contact.birthday && 
    differenceInDays(new Date(contact.birthday), new Date()) <= 30;

  return (
    <Pressable 
      style={styles.container}
      onPress={() => router.push(`/contacts/${contact.id}`)}>
      <View style={styles.header}>
        <View style={styles.profileSection}>
          <Image
            source={{ uri: contact.profilePicture || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330' }}
            style={styles.avatar}
            contentFit="cover"
            transition={200}
          />
          <View>
            <Text style={styles.name}>{contact.name}</Text>
            <Text style={styles.relationship}>{contact.relationshipType}</Text>
          </View>
        </View>
        {hasBirthdaySoon && (
          <View style={styles.birthdayBadge}>
            <Text style={styles.birthdayText}>
              🎂 {format(new Date(contact.birthday!), 'MMM d')}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.contactInfo}>
        {contact.phone && (
          <View style={styles.infoItem}>
            <Phone size={16} color={Colors.textSecondary} />
            <Text style={styles.infoText}>{contact.phone}</Text>
          </View>
        )}
        {contact.email && (
          <View style={styles.infoItem}>
            <Mail size={16} color={Colors.textSecondary} />
            <Text style={styles.infoText}>{contact.email}</Text>
          </View>
        )}
      </View>

      <View style={styles.footer}>
        <Pressable 
          style={styles.actionButton}
          onPress={() => {
            // Handle sending message
          }}>
          <MessageSquare size={20} color={Colors.primary} />
          <Text style={styles.actionText}>Message</Text>
        </Pressable>
        <Pressable 
          style={styles.actionButton}
          onPress={() => onAddInteraction(contact.id)}>
          <Plus size={20} color={Colors.primary} />
          <Text style={styles.actionText}>Interaction</Text>
        </Pressable>
      </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  profileSection: {
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
  name: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.text,
  },
  relationship: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.textSecondary,
  },
  birthdayBadge: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  birthdayText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: Colors.card,
  },
  contactInfo: {
    marginBottom: 12,
    gap: 4,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.textSecondary,
  },
  footer: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: Colors.background,
  },
  actionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.primary,
  },
});