import { useState } from 'react';
import { StyleSheet, View, Text, Pressable, ScrollView } from 'react-native';
import { ChevronDown, Calendar, Users, Filter } from 'lucide-react-native';
import { format } from 'date-fns';
import { Colors } from '@/constants/Colors';
import type { Contact } from '@/types/models';

interface InteractionFiltersProps {
  contacts: Contact[];
  selectedContact: string | null;
  selectedType: 'all' | 'life_event' | 'relationship_event';
  dateRange: { start: Date; end: Date } | null;
  onSelectContact: (contactId: string | null) => void;
  onSelectType: (type: 'all' | 'life_event' | 'relationship_event') => void;
  onSelectDateRange: (range: { start: Date; end: Date } | null) => void;
}

export function InteractionFilters({
  contacts,
  selectedContact,
  selectedType,
  dateRange,
  onSelectContact,
  onSelectType,
  onSelectDateRange,
}: InteractionFiltersProps) {
  const [isContactsOpen, setIsContactsOpen] = useState(false);
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [isDateOpen, setIsDateOpen] = useState(false);

  const selectedContactName = selectedContact
    ? contacts.find(c => c.id === selectedContact)?.name
    : 'All Contacts';

  const getTypeLabel = (type: typeof selectedType) => {
    switch (type) {
      case 'life_event':
        return 'Life Events';
      case 'relationship_event':
        return 'Relationship Events';
      default:
        return 'All Types';
    }
  };

  const getDateRangeLabel = () => {
    if (!dateRange) return 'All Time';
    return `${format(dateRange.start, 'MMM d')} - ${format(dateRange.end, 'MMM d')}`;
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filtersContainer}>
        <Pressable 
          style={styles.filter}
          onPress={() => setIsContactsOpen(!isContactsOpen)}>
          <Users size={16} color={Colors.text} />
          <Text style={styles.filterText}>{selectedContactName}</Text>
          <ChevronDown size={16} color={Colors.text} />
        </Pressable>

        <Pressable 
          style={styles.filter}
          onPress={() => setIsTypeOpen(!isTypeOpen)}>
          <Filter size={16} color={Colors.text} />
          <Text style={styles.filterText}>{getTypeLabel(selectedType)}</Text>
          <ChevronDown size={16} color={Colors.text} />
        </Pressable>

        <Pressable 
          style={styles.filter}
          onPress={() => setIsDateOpen(!isDateOpen)}>
          <Calendar size={16} color={Colors.text} />
          <Text style={styles.filterText}>{getDateRangeLabel()}</Text>
          <ChevronDown size={16} color={Colors.text} />
        </Pressable>
      </ScrollView>

      {isContactsOpen && (
        <View style={styles.dropdown}>
          <Pressable
            style={styles.option}
            onPress={() => {
              onSelectContact(null);
              setIsContactsOpen(false);
            }}>
            <Text style={[
              styles.optionText,
              !selectedContact && styles.optionTextSelected
            ]}>
              All Contacts
            </Text>
          </Pressable>
          {contacts.map((contact) => (
            <Pressable
              key={contact.id}
              style={styles.option}
              onPress={() => {
                onSelectContact(contact.id);
                setIsContactsOpen(false);
              }}>
              <Text style={[
                styles.optionText,
                selectedContact === contact.id && styles.optionTextSelected
              ]}>
                {contact.name}
              </Text>
            </Pressable>
          ))}
        </View>
      )}

      {isTypeOpen && (
        <View style={styles.dropdown}>
          {(['all', 'life_event', 'relationship_event'] as const).map((type) => (
            <Pressable
              key={type}
              style={styles.option}
              onPress={() => {
                onSelectType(type);
                setIsTypeOpen(false);
              }}>
              <Text style={[
                styles.optionText,
                selectedType === type && styles.optionTextSelected
              ]}>
                {getTypeLabel(type)}
              </Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 1,
  },
  filtersContainer: {
    gap: 8,
    paddingVertical: 8,
  },
  filter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  filterText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.text,
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    marginTop: 4,
    backgroundColor: Colors.card,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  optionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.text,
  },
  optionTextSelected: {
    fontFamily: 'Inter-SemiBold',
    color: Colors.primary,
  },
});