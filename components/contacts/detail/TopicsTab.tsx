import { useState, useMemo } from 'react';
import { StyleSheet, View, Text, ScrollView, Pressable } from 'react-native';
import { Plus, MessageSquare, TriangleAlert as AlertTriangle } from 'lucide-react-native';
import { format } from 'date-fns';
import { Colors } from '@/constants/Colors';
import type { Topic, TopicCategory, Contact, Interaction } from '@/types/models';

interface TopicsTabProps {
  contact: Contact;
  recentInteractions: Interaction[];
}

// Temporary mock data
const mockTopics: Topic[] = [
  {
    id: '1',
    contactId: '1',
    text: 'New promotion and team leadership',
    category: 'next_time',
    lastDiscussed: new Date(2024, 2, 10),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    contactId: '1',
    text: 'Photography hobby',
    category: 'evergreen',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    contactId: '1',
    text: 'Recent travel to Japan',
    category: 'conversation_starter',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '4',
    contactId: '1',
    text: 'Previous workplace issues',
    category: 'avoid',
    notes: 'Sensitive topic, avoid discussing',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const categoryConfig = {
  next_time: {
    title: 'Next Time',
    color: Colors.primary,
    icon: MessageSquare,
  },
  conversation_starter: {
    title: 'Conversation Starters',
    color: Colors.accent,
    icon: MessageSquare,
  },
  evergreen: {
    title: 'Evergreen Topics',
    color: Colors.success,
    icon: MessageSquare,
  },
  avoid: {
    title: 'Topics to Avoid',
    color: Colors.error,
    icon: AlertTriangle,
  },
} as const;

function TopicChip({ topic }: { topic: Topic }) {
  const config = categoryConfig[topic.category];
  
  return (
    <View style={[styles.chip, { backgroundColor: config.color + '20' }]}>
      <config.icon size={14} color={config.color} />
      <Text style={[styles.chipText, { color: config.color }]}>{topic.text}</Text>
      {topic.lastDiscussed && (
        <Text style={[styles.chipDate, { color: config.color }]}>
          {format(topic.lastDiscussed, 'MMM d')}
        </Text>
      )}
    </View>
  );
}

function TopicSection({ title, topics, color }: { 
  title: string;
  topics: Topic[];
  color: string;
}) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Pressable 
          style={[styles.addButton, { backgroundColor: color + '20' }]}
          onPress={() => {
            // Handle adding new topic
          }}>
          <Plus size={16} color={color} />
        </Pressable>
      </View>
      <View style={styles.chipContainer}>
        {topics.map((topic) => (
          <TopicChip key={topic.id} topic={topic} />
        ))}
      </View>
    </View>
  );
}

function SuggestedTopics({ interactions }: { interactions: Interaction[] }) {
  const suggestions = useMemo(() => {
    return interactions
      .slice(0, 3)
      .map(interaction => ({
        id: interaction.id,
        text: interaction.notes?.split('.')[0] || '',
        source: format(new Date(interaction.date), 'MMM d'),
      }))
      .filter(suggestion => suggestion.text);
  }, [interactions]);

  if (!suggestions.length) return null;

  return (
    <View style={styles.suggestionsContainer}>
      <Text style={styles.suggestionsTitle}>Suggested Topics</Text>
      <Text style={styles.suggestionsSubtitle}>
        Based on recent interactions
      </Text>
      {suggestions.map((suggestion) => (
        <View key={suggestion.id} style={styles.suggestionItem}>
          <Text style={styles.suggestionText}>{suggestion.text}</Text>
          <Text style={styles.suggestionSource}>From {suggestion.source}</Text>
        </View>
      ))}
    </View>
  );
}

export function TopicsTab({ contact, recentInteractions }: TopicsTabProps) {
  const topicsByCategory = useMemo(() => {
    return mockTopics.reduce((acc, topic) => {
      if (!acc[topic.category]) {
        acc[topic.category] = [];
      }
      acc[topic.category].push(topic);
      return acc;
    }, {} as Record<TopicCategory, Topic[]>);
  }, []);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <SuggestedTopics interactions={recentInteractions} />
      
      {(Object.keys(categoryConfig) as TopicCategory[]).map((category) => (
        <TopicSection
          key={category}
          title={categoryConfig[category].title}
          topics={topicsByCategory[category] || []}
          color={categoryConfig[category].color}
        />
      ))}
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: Colors.text,
  },
  addButton: {
    padding: 8,
    borderRadius: 8,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 16,
  },
  chipText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  chipDate: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    opacity: 0.8,
  },
  suggestionsContainer: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  suggestionsTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: Colors.text,
    marginBottom: 4,
  },
  suggestionsSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 16,
  },
  suggestionItem: {
    marginBottom: 12,
  },
  suggestionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.text,
    marginBottom: 4,
  },
  suggestionSource: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.textSecondary,
  },
});