import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Pressable, ScrollView, Platform } from 'react-native';
import { router } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { Screen } from '@/components/common/Screen';
import { Colors } from '@/constants/Colors';
import type { Contact } from '@/types/models';

const relationshipTypes = [
  'Friend',
  'Family',
  'Colleague',
  'Professional',
  'Acquaintance',
  'Other',
] as const;

export default function NewContactScreen() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [relationshipType, setRelationshipType] = useState<typeof relationshipTypes[number]>('Friend');
  const [birthday, setBirthday] = useState<Date | null>(null);

  const handleCreate = () => {
    if (!name.trim()) {
      // Show error
      return;
    }

    const newContact: Partial<Contact> = {
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      relationshipType,
      birthday: birthday || undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // TODO: Save contact to database
    console.log('Creating contact:', newContact);

    router.back();
  };

  return (
    <Screen>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <ChevronLeft size={24} color={Colors.text} />
        </Pressable>
        <Text style={styles.title}>New Contact</Text>
        <Pressable 
          style={[styles.createButton, !name.trim() && styles.createButtonDisabled]}
          onPress={handleCreate}
          disabled={!name.trim()}>
          <Text style={[
            styles.createButtonText,
            !name.trim() && styles.createButtonTextDisabled
          ]}>
            Create
          </Text>
        </Pressable>
      </View>

      <ScrollView style={styles.form} showsVerticalScrollIndicator={false}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Name *</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter contact name"
            placeholderTextColor={Colors.textSecondary}
            autoFocus
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder="Enter phone number"
            placeholderTextColor={Colors.textSecondary}
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter email address"
            placeholderTextColor={Colors.textSecondary}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Relationship Type</Text>
          <View style={styles.relationshipTypes}>
            {relationshipTypes.map((type) => (
              <Pressable
                key={type}
                style={[
                  styles.relationshipChip,
                  relationshipType === type && styles.relationshipChipActive
                ]}
                onPress={() => setRelationshipType(type)}>
                <Text style={[
                  styles.relationshipChipText,
                  relationshipType === type && styles.relationshipChipTextActive
                ]}>
                  {type}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Birthday</Text>
          {Platform.OS === 'web' ? (
            <input
              type="date"
              style={{
                ...styles.input,
                padding: 12,
                border: `1px solid ${Colors.border}`,
                borderRadius: 12,
                fontSize: 16,
                color: Colors.text,
                backgroundColor: Colors.card,
                width: '100%',
                fontFamily: 'Inter-Regular',
              }}
              onChange={(e) => {
                if (e.target.value) {
                  setBirthday(new Date(e.target.value));
                } else {
                  setBirthday(null);
                }
              }}
              value={birthday ? birthday.toISOString().split('T')[0] : ''}
            />
          ) : (
            <Pressable
              style={styles.birthdayButton}
              onPress={() => {
                // Handle native date picker
              }}>
              <Text style={styles.birthdayButtonText}>
                {birthday ? birthday.toLocaleDateString() : 'Select birthday'}
              </Text>
            </Pressable>
          )}
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: Colors.text,
  },
  createButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  createButtonDisabled: {
    opacity: 0.5,
  },
  createButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.primary,
  },
  createButtonTextDisabled: {
    color: Colors.textSecondary,
  },
  form: {
    flex: 1,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  input: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.text,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: Colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  relationshipTypes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  relationshipChip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  relationshipChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  relationshipChipText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.text,
  },
  relationshipChipTextActive: {
    color: Colors.card,
  },
  birthdayButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: Colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  birthdayButtonText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.text,
  },
});