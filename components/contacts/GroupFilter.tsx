import { useState } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { ChevronDown } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import type { Group } from '@/types/models';

interface GroupFilterProps {
  groups: Group[];
  selectedGroup: string | null;
  onSelectGroup: (groupId: string | null) => void;
}

export function GroupFilter({ groups, selectedGroup, onSelectGroup }: GroupFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedGroupName = selectedGroup 
    ? groups.find(g => g.id === selectedGroup)?.name 
    : 'All Groups';

  return (
    <View style={styles.container}>
      <Pressable 
        style={styles.button}
        onPress={() => setIsOpen(!isOpen)}>
        <Text style={styles.buttonText}>{selectedGroupName}</Text>
        <ChevronDown 
          size={20} 
          color={Colors.text}
          style={[
            styles.icon,
            isOpen && styles.iconOpen
          ]} 
        />
      </Pressable>

      {isOpen && (
        <View style={styles.dropdown}>
          <Pressable
            style={styles.option}
            onPress={() => {
              onSelectGroup(null);
              setIsOpen(false);
            }}>
            <Text style={[
              styles.optionText,
              !selectedGroup && styles.optionTextSelected
            ]}>
              All Groups
            </Text>
          </Pressable>
          {groups.map((group) => (
            <Pressable
              key={group.id}
              style={styles.option}
              onPress={() => {
                onSelectGroup(group.id);
                setIsOpen(false);
              }}>
              <Text style={[
                styles.optionText,
                selectedGroup === group.id && styles.optionTextSelected
              ]}>
                {group.name}
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
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  buttonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.text,
  },
  icon: {
    transform: [{ rotate: '0deg' }],
  },
  iconOpen: {
    transform: [{ rotate: '180deg' }],
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