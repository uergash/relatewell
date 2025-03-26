import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Pressable, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useReminders } from '@/hooks/useReminders';
import { useContacts } from '@/hooks/useContacts';
import type { Reminder, ReminderType, ReminderStatus, ReminderRecurrence } from '@/types/models';

interface ReminderFormProps {
  reminder?: Reminder;
  onSubmit?: () => void;
}

export function ReminderForm({ reminder, onSubmit }: ReminderFormProps) {
  const { addReminder, updateReminder } = useReminders();
  const { contacts } = useContacts();
  
  const [formData, setFormData] = useState({
    title: reminder?.title || '',
    description: reminder?.description || '',
    date: reminder?.date ? new Date(reminder.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    type: (reminder?.type || 'one-time') as ReminderType,
    status: (reminder?.status || 'pending') as ReminderStatus,
    recurrence: (reminder?.recurrence || 'none') as ReminderRecurrence,
    contactId: reminder?.contactId || '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);

      const submitData = {
        ...formData,
        date: new Date(formData.date),
      };

      if (reminder) {
        await updateReminder(reminder.id, submitData);
      } else {
        await addReminder(submitData);
      }

      onSubmit?.();
      router.back();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save reminder');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.field}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          value={formData.title}
          onChangeText={(text) => setFormData(prev => ({ ...prev, title: text }))}
          placeholder="Enter title"
          placeholderTextColor={Colors.textSecondary}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={formData.description}
          onChangeText={(text) => setFormData(prev => ({ ...prev, description: text }))}
          placeholder="Enter description"
          placeholderTextColor={Colors.textSecondary}
          multiline
          numberOfLines={4}
        />
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
        <Text style={styles.label}>Type</Text>
        <View style={styles.typeContainer}>
          {(['birthday', 'anniversary', 'custom'] as const).map((type) => (
            <Pressable
              key={type}
              style={[
                styles.typeButton,
                formData.type === type && styles.typeButtonActive
              ]}
              onPress={() => setFormData(prev => ({ ...prev, type: type as ReminderType }))}>
              <Text style={[
                styles.typeText,
                formData.type === type && styles.typeTextActive
              ]}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      {formData.type === 'custom' && (
        <View style={styles.field}>
          <Text style={styles.label}>Recurrence</Text>
          <View style={styles.recurrenceContainer}>
            {(['none', 'daily', 'weekly', 'monthly', 'yearly'] as const).map((recurrence) => (
              <Pressable
                key={recurrence}
                style={[
                  styles.recurrenceButton,
                  formData.recurrence === recurrence && styles.recurrenceButtonActive
                ]}
                onPress={() => setFormData(prev => ({ ...prev, recurrence }))}>
                <Text style={[
                  styles.recurrenceText,
                  formData.recurrence === recurrence && styles.recurrenceTextActive
                ]}>
                  {recurrence.charAt(0).toUpperCase() + recurrence.slice(1)}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      )}

      <View style={styles.field}>
        <Text style={styles.label}>Contact</Text>
        <View style={styles.contactsContainer}>
          {contacts.map((contact) => (
            <Pressable
              key={contact.id}
              style={[
                styles.contactButton,
                formData.contactId === contact.id && styles.contactButtonActive
              ]}
              onPress={() => setFormData(prev => ({ ...prev, contactId: contact.id }))}>
              <Text style={[
                styles.contactText,
                formData.contactId === contact.id && styles.contactTextActive
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
          {loading ? 'Saving...' : reminder ? 'Update Reminder' : 'Create Reminder'}
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
  recurrenceContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  recurrenceButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
  },
  recurrenceButtonActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  recurrenceText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.text,
  },
  recurrenceTextActive: {
    color: Colors.card,
  },
}); 