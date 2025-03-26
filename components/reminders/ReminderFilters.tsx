import { StyleSheet, View, Text, ScrollView, Pressable } from 'react-native';
import { Colors } from '@/constants/Colors';

type Status = 'all' | 'pending' | 'completed' | 'snoozed';
type Type = 'all' | 'birthday' | 'follow_up' | 'custom';

interface ReminderFiltersProps {
  selectedStatus: Status;
  selectedType: Type;
  onSelectStatus: (status: Status) => void;
  onSelectType: (type: Type) => void;
}

export function ReminderFilters({
  selectedStatus,
  selectedType,
  onSelectStatus,
  onSelectType,
}: ReminderFiltersProps) {
  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.statusScroll}>
        {(['all', 'pending', 'snoozed', 'completed'] as Status[]).map((status) => (
          <Pressable
            key={status}
            style={[
              styles.filterChip,
              selectedStatus === status && styles.filterChipActive
            ]}
            onPress={() => onSelectStatus(status)}>
            <Text style={[
              styles.filterText,
              selectedStatus === status && styles.filterTextActive
            ]}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.typeScroll}>
        {(['all', 'birthday', 'follow_up', 'custom'] as Type[]).map((type) => (
          <Pressable
            key={type}
            style={[
              styles.filterChip,
              selectedType === type && styles.filterChipActive
            ]}
            onPress={() => onSelectType(type)}>
            <Text style={[
              styles.filterText,
              selectedType === type && styles.filterTextActive
            ]}>
              {type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
    marginBottom: 16,
  },
  statusScroll: {
    gap: 8,
    paddingRight: 16,
  },
  typeScroll: {
    gap: 8,
    paddingRight: 16,
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
}); 