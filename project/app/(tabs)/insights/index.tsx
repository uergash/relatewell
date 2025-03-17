import { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { VictoryPie, VictoryLine, VictoryChart, VictoryAxis } from 'victory-native';
import { format, subDays } from 'date-fns';
import { Screen } from '@/components/common/Screen';
import { Colors } from '@/constants/Colors';
import type { Contact, Interaction } from '@/types/models';

// Mock data - replace with actual data
const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    phone: '+1 (555) 123-4567',
    email: 'sarah.chen@example.com',
    relationshipType: 'Friend',
    birthday: new Date(1990, 2, 15),
    profilePicture: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'Michael Rodriguez',
    phone: '+1 (555) 987-6543',
    email: 'michael.r@example.com',
    relationshipType: 'Colleague',
    birthday: new Date(1988, 5, 22),
    profilePicture: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const mockInteractions: Interaction[] = Array.from({ length: 30 }, (_, i) => ({
  id: i.toString(),
  date: subDays(new Date(), i),
  contactId: Math.random() > 0.5 ? '1' : '2',
  type: Math.random() > 0.5 ? 'relationship_event' : 'life_event',
  notes: 'Mock interaction',
  createdAt: new Date(),
  updatedAt: new Date(),
}));

const timeRanges = ['1W', '1M', '3M', 'All'] as const;
type TimeRange = typeof timeRanges[number];

export default function InsightsScreen() {
  const [selectedRange, setSelectedRange] = useState<TimeRange>('1W');

  const interactionsByType = mockInteractions.reduce((acc, interaction) => {
    acc[interaction.type] = (acc[interaction.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.entries(interactionsByType).map(([type, count]) => ({
    x: type === 'relationship_event' ? 'Relationship' : 'Life Events',
    y: count,
  }));

  const interactionsByDay = mockInteractions.reduce((acc, interaction) => {
    const day = format(new Date(interaction.date), 'MMM d');
    acc[day] = (acc[day] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const lineData = Object.entries(interactionsByDay)
    .slice(0, 7)
    .map(([date, count]) => ({
      x: date,
      y: count,
    }))
    .reverse();

  return (
    <Screen>
      <Text style={styles.title}>Insights</Text>

      <ScrollView 
        style={styles.container} 
        showsVerticalScrollIndicator={false}>
        <View style={styles.timeRangeContainer}>
          {timeRanges.map((range) => (
            <Pressable
              key={range}
              style={[
                styles.timeRangeButton,
                selectedRange === range && styles.timeRangeButtonActive,
              ]}
              onPress={() => setSelectedRange(range)}>
              <Text style={[
                styles.timeRangeText,
                selectedRange === range && styles.timeRangeTextActive,
              ]}>
                {range}
              </Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Interaction Trends</Text>
          <VictoryChart height={200} padding={{ top: 20, bottom: 40, left: 40, right: 20 }}>
            <VictoryAxis
              tickFormat={(t) => t}
              style={{
                axis: { stroke: Colors.border },
                tickLabels: { 
                  fill: Colors.textSecondary,
                  fontSize: 10,
                  angle: -45,
                },
              }}
            />
            <VictoryAxis
              dependentAxis
              tickFormat={(t) => Math.round(t)}
              style={{
                axis: { stroke: Colors.border },
                tickLabels: { 
                  fill: Colors.textSecondary,
                  fontSize: 10,
                },
              }}
            />
            <VictoryLine
              data={lineData}
              style={{
                data: { stroke: Colors.primary },
              }}
              animate={{
                duration: 2000,
                onLoad: { duration: 1000 },
              }}
            />
          </VictoryChart>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Interaction Types</Text>
          <VictoryPie
            data={pieData}
            colorScale={[Colors.primary, Colors.accent]}
            height={200}
            padding={40}
            labels={({ datum }) => `${datum.x}\n${datum.y}`}
            style={{
              labels: {
                fill: Colors.text,
                fontSize: 12,
              },
            }}
            animate={{
              duration: 2000,
              onLoad: { duration: 1000 },
            }}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Reconnect Suggestions</Text>
          {mockContacts.map((contact) => (
            <View key={contact.id} style={styles.contactSuggestion}>
              <Image
                source={{ uri: contact.profilePicture }}
                style={styles.avatar}
                contentFit="cover"
                transition={200}
              />
              <View style={styles.contactInfo}>
                <Text style={styles.contactName}>{contact.name}</Text>
                <Text style={styles.lastInteraction}>
                  Last interaction: 2 weeks ago
                </Text>
              </View>
              <Pressable style={styles.reconnectButton}>
                <Text style={styles.reconnectButtonText}>Reconnect</Text>
              </Pressable>
            </View>
          ))}
        </View>
      </ScrollView>
    </Screen>
  );
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
  timeRangeContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 24,
  },
  timeRangeButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  timeRangeButtonActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  timeRangeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.text,
  },
  timeRangeTextActive: {
    color: Colors.card,
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: Colors.text,
    marginBottom: 16,
  },
  contactSuggestion: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.border,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.text,
  },
  lastInteraction: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.textSecondary,
  },
  reconnectButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: Colors.primary + '20',
    borderRadius: 20,
  },
  reconnectButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.primary,
  },
});