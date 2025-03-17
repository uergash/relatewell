import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { format } from 'date-fns';
import { Phone, Mail, Calendar, Users } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import type { Contact } from '@/types/models';

interface InfoTabProps {
  contact: Contact;
}

export function InfoTab({ contact }: InfoTabProps) {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Basic Information</Text>
        <View style={styles.card}>
          {contact.phone && (
            <View style={styles.infoItem}>
              <View style={[styles.iconContainer, { backgroundColor: Colors.primary + '20' }]}>
                <Phone size={20} color={Colors.primary} />
              </View>
              <View>
                <Text style={styles.label}>Phone Number</Text>
                <Text style={styles.value}>{contact.phone}</Text>
              </View>
            </View>
          )}
          {contact.email && (
            <View style={styles.infoItem}>
              <View style={[styles.iconContainer, { backgroundColor: Colors.accent + '20' }]}>
                <Mail size={20} color={Colors.accent} />
              </View>
              <View>
                <Text style={styles.label}>Email Address</Text>
                <Text style={styles.value}>{contact.email}</Text>
              </View>
            </View>
          )}
          {contact.birthday && (
            <View style={styles.infoItem}>
              <View style={[styles.iconContainer, { backgroundColor: Colors.success + '20' }]}>
                <Calendar size={20} color={Colors.success} />
              </View>
              <View>
                <Text style={styles.label}>Birthday</Text>
                <Text style={styles.value}>{format(new Date(contact.birthday), 'MMMM d, yyyy')}</Text>
              </View>
            </View>
          )}
          <View style={styles.infoItem}>
            <View style={[styles.iconContainer, { backgroundColor: Colors.warning + '20' }]}>
              <Users size={20} color={Colors.warning} />
            </View>
            <View>
              <Text style={styles.label}>Relationship</Text>
              <Text style={styles.value}>{contact.relationshipType}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact History</Text>
        <View style={styles.card}>
          <View style={styles.historyItem}>
            <Text style={styles.label}>First Added</Text>
            <Text style={styles.value}>
              {format(new Date(contact.createdAt), 'MMMM d, yyyy')}
            </Text>
          </View>
          <View style={styles.historyItem}>
            <Text style={styles.label}>Last Updated</Text>
            <Text style={styles.value}>
              {format(new Date(contact.updatedAt), 'MMMM d, yyyy')}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Relationship Stats</Text>
        <View style={styles.card}>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statLabel}>Interactions</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>3</Text>
              <Text style={styles.statLabel}>Topics</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>2</Text>
              <Text style={styles.statLabel}>Reminders</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>4</Text>
              <Text style={styles.statLabel}>Gift Ideas</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: Colors.text,
    marginBottom: 12,
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  value: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.text,
  },
  historyItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  statItem: {
    flex: 1,
    minWidth: '40%',
    alignItems: 'center',
    padding: 16,
    backgroundColor: Colors.background,
    borderRadius: 12,
  },
  statValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: Colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.textSecondary,
  },
});