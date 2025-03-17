import { useState, useMemo } from 'react';
import { StyleSheet, View, Text, ScrollView, Pressable } from 'react-native';
import { router } from 'expo-router';
import { Plus } from 'lucide-react-native';
import { format } from 'date-fns';
import { InteractionCard } from '@/components/interactions/InteractionCard';
import { Colors } from '@/constants/Colors';
import type { Contact, Interaction } from '@/types/models';

interface InteractionsTabProps {
  contact: Contact;
}

// Temporary mock data
const mockInteractions: Interaction[] = [
  {
    id: '1',
    date: new Date(2024, 2, 10),
    contactId: '1',
    type: 'life_event',
    notes: "Sarah got promoted at work! We celebrated at La Piazza restaurant. She was really excited about the new responsibilities and team she'll be leading.",
    location: 'La Piazza Restaurant',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    date: new Date(2024, 2, 1),
    contactId: '1',
    type: 'relationship_event',
    notes: 'Discussed her recent trip to Japan. She loved the food and architecture. Planning to go back next year.',
    location: 'Coffee Shop',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export function InteractionsTab({ contact }: InteractionsTabProps) {
  const [selectedType, setSelectedType] = useState<'all' | 'life_event' | 'relationship_event'>('all');

  const filteredInteractions = useMemo(() => {
    let interactions = mockInteractions.filter(i => i.contactId === contact.id);
    
    if (selectedType !== 'all') {
      interactions = interactions.filter(i => i.type === selectedType);
    }

    return interactions.sort((a, b) => b.date.getTime() - a.date.getTime());
  }, [contact.id, selectedType]);

  const stats = useMemo(() => {
    const total = filteredInteractions.length;
    const thisMonth = filteredInteractions.filter(i => {
      const now = new Date();
      const interactionDate = new Date(i.date);
      return (
        interactionDate.getMonth() === now.getMonth() &&
        interactionDate.getFullYear() === now.getFullYear()
      );
    }).length;

    return { total, thisMonth };
  }, [filteredInteractions]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Interactions</Text>
        <Pressable 
          style={styles.addButton}
          onPress={() => router.push(`/interactions/new?contactId=${contact.id}`)}>
          <Plus size={20} color={Colors.primary} />
          <Text style={styles.addButtonText}>Add Interaction</Text>
        </Pressable>
      </View>

      <View style={styles.statsCard}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{stats.total}</Text>
          <Text style={styles.statLabel}>Total Interactions</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.stat}>
          <Text style={styles.statValue}>{stats.thisMonth}</Text>
          <Text style={styles.statLabel}>This Month</Text>
        </View>
      </View>

      <View style={styles.filters}>
        {(['all', 'life_event', 'relationship_event'] as const).map((type) => (
          <Pressable
            key={type}
            style={[
              styles.filterChip,
              selectedType === type && styles.filterChipActive
            ]}
            onPress={() => setSelectedType(type)}>
            <Text style={[
              styles.filterText,
              selectedType === type && styles.filterTextActive
            ]}>
              {type === 'all' ? 'All' : 
               type === 'life_event' ? 'Life Events' : 
               'Relationship Events'}
            </Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.timeline}>
        {filteredInteractions.map((interaction, index) => (
          <View key={interaction.id} style={styles.timelineItem}>
            <View style={styles.timelineLeft}>
              <View style={styles.timelineLine} />
              <View style={[
                styles.timelineDot,
                { backgroundColor: interaction.type === 'life_event' ? Colors.accent : Colors.primary }
              ]} />
            </View>
            <View style={styles.timelineContent}>
              <Text style={styles.timelineDate}>
                {format(new Date(interaction.date), 'MMMM d, yyyy')}
              </Text>
              <InteractionCard
                interaction={interaction}
                contact={contact}
              />
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: Colors.text,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: Colors.primary + '20',
  },
  addButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.primary,
  },
  statsCard: {
    flexDirection: 'row',
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: Colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.textSecondary,
  },
  statDivider: {
    width: 1,
    backgroundColor: Colors.border,
    marginHorizontal: 16,
  },
  filters: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 24,
  },
  filterChip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  filterChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.text,
  },
  filterTextActive: {
    color: Colors.card,
  },
  timeline: {
    gap: 8,
  },
  timelineItem: {
    flexDirection: 'row',
    gap: 16,
  },
  timelineLeft: {
    width: 24,
    alignItems: 'center',
  },
  timelineLine: {
    position: 'absolute',
    top: 24,
    bottom: 0,
    width: 2,
    backgroundColor: Colors.border,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginTop: 6,
  },
  timelineContent: {
    flex: 1,
  },
  timelineDate: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
});