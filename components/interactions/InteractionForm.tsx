import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Pressable, ScrollView } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useInteractions } from '@/hooks/useInteractions';
import { useContacts } from '@/hooks/useContacts';
import type { Interaction } from '@/types/models';

interface InteractionFormProps {
  interaction?: Interaction;
  onSubmit?: () => void;
}

export function InteractionForm({ interaction, onSubmit }: InteractionFormProps) {
  const { addInteraction, updateInteraction } = useInteractions();
  const { contacts } = useContacts();
  const params = useLocalSearchParams<{ contactId?: string }>();
  
  const [formData, setFormData] = useState({
    type: interaction?.type || 'life_event',
    date: interaction?.date ? new Date(interaction.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    notes: interaction?.notes || '',
    location: interaction?.location || '',
  });
  const [selectedContacts, setSelectedContacts] = useState<string[]>(
    interaction ? [interaction.contactId] : params.contactId ? [params.contactId] : []
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);

      const submitData = {
        ...formData,
        date: new Date(formData.date),
        contactId: selectedContacts[0],
      };

      if (interaction) {
        await updateInteraction(interaction.id, submitData, selectedContacts);
      } else {
        await addInteraction(submitData, selectedContacts);
      }

      onSubmit?.();
      router.back();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save interaction');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.field}>
        <Text style={styles.label}>Type</Text>
        <View style={styles.typeContainer}>
          {(['life_event', 'relationship_event'] as const).map((type) => (
            <Pressable
              key={type}
              style={[
                styles.typeButton,
                formData.type === type && styles.typeButtonActive
              ]}
              onPress={() => setFormData(prev => ({ ...prev, type }))}>
              <Text style={[
                styles.typeText,
                formData.type === type && styles.typeTextActive
              ]}>
                {type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Date</Text>
        <TextInput
          style={styles.input}
          value={formData.date}
          onChangeText={(text) => setFormData(prev => ({ ...prev, date: text }))}
          placeholder="YYYY-MM-DD"
          placeholderTextColor={Colors.textSecondary}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Location</Text>
        <TextInput
          style={styles.input}
          value={formData.location}
          onChangeText={(text) => setFormData(prev => ({ ...prev, location: text }))}
          placeholder="Enter location"
          placeholderTextColor={Colors.textSecondary}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Notes</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={formData.notes}
          onChangeText={(text) => setFormData(prev => ({ ...prev, notes: text }))}
          placeholder="Enter notes"
          placeholderTextColor={Colors.textSecondary}
          multiline
          numberOfLines={4}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Contacts</Text>
        <View style={styles.contactsContainer}>
          {contacts.map((contact) => (
            <Pressable
              key={contact.id}
              style={[
                styles.contactButton,
                selectedContacts.includes(contact.id) && styles.contactButtonActive
              ]}
              onPress={() => {
                setSelectedContacts(prev =>
                  prev.includes(contact.id)
                    ? prev.filter(id => id !== contact.id)
                    : [...prev, contact.id]
                );
              }}>
              <Text style={[
                styles.contactText,
                selectedContacts.includes(contact.id) && styles.contactTextActive
              ]}>
                {contact.name}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      {error && (
        <Text style={styles.error}>{error}</Text>
      )}

      <Pressable
        style={[
          styles.button,
          loading && styles.buttonDisabled
        ]}
        onPress={handleSubmit}
        disabled={loading}>
        <Text style={styles.buttonText}>
          {loading ? 'Saving...' : interaction ? 'Update Interaction' : 'Create Interaction'}
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  field: {
    marginBottom: 16,
  },
  label: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: Colors.card,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: Colors.text,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  typeContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  typeButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
  },
  typeButtonActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  typeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.text,
  },
  typeTextActive: {
    color: Colors.card,
  },
  contactsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  contactButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  contactButtonActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  contactText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.text,
  },
  contactTextActive: {
    color: Colors.card,
  },
  error: {
    color: Colors.error,
    marginBottom: 16,
    textAlign: 'center',
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: Colors.card,
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
}); 