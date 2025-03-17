import { StyleSheet, View, Text, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { MapPin, Calendar } from 'lucide-react-native';
import { format } from 'date-fns';
import { Colors } from '@/constants/Colors';
import type { Contact, Interaction } from '@/types/models';

interface InteractionCardProps {
  interaction: Interaction;
  contact: Contact;
}

export function InteractionCard({ interaction, contact }: InteractionCardProps) {
  return (
    <Pressable 
      style={styles.container}
      onPress={() => router.push(`/interactions/${interaction.id}`)}>
      <View style={styles.header}>
        <Pressable 
          style={styles.contactInfo}
          onPress={() => router.push(`/contacts/${contact.id}`)}>
          <Image
            source={{ uri: contact.profilePicture }}
            style={styles.avatar}
            contentFit="cover"
            transition={200}
          />
          <Text style={styles.contactName}>{contact.name}</Text>
        </Pressable>
        <View style={[
          styles.typeBadge,
          interaction.type === 'life_event' ? styles.lifeEventBadge : styles.relationshipEventBadge
        ]}>
          <Text style={styles.typeText}>
            {interaction.type === 'life_event' ? 'Life Event' : 'Relationship Event'}
          </Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.notes} numberOfLines={3}>
          {interaction.notes}
        </Text>
      </View>

      <View style={styles.footer}>
        <View style={styles.footerItem}>
          <Calendar size={16} color={Colors.textSecondary} />
          <Text style={styles.footerText}>
            {format(new Date(interaction.date), 'MMM d, yyyy')}
          </Text>
        </View>
        {interaction.location && (
          <View style={styles.footerItem}>
            <MapPin size={16} color={Colors.textSecondary} />
            <Text style={styles.footerText}>{interaction.location}</Text>
          </View>
        )}
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
    alignItems: 'center',
    marginBottom: 12,
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.border,
  },
  contactName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.text,
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  lifeEventBadge: {
    backgroundColor: Colors.accent + '20',
  },
  relationshipEventBadge: {
    backgroundColor: Colors.primary + '20',
  },
  typeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: Colors.text,
  },
  content: {
    marginBottom: 12,
  },
  notes: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.text,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    gap: 16,
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  footerText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.textSecondary,
  },
});