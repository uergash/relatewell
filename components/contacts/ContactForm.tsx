import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Pressable, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useContacts } from '@/hooks/useContacts';
import type { Contact } from '@/types/models';

interface ContactFormProps {
  contact?: Contact;
  onSubmit?: () => void;
}

export function ContactForm({ contact, onSubmit }: ContactFormProps) {
  const { addContact, updateContact } = useContacts();
  const [formData, setFormData] = useState({
    name: contact?.name || '',
    email: contact?.email || '',
    phone: contact?.phone || '',
    relationshipType: contact?.relationshipType || '',
    birthday: contact?.birthday ? new Date(contact.birthday).toISOString().split('T')[0] : '',
    profilePicture: contact?.profilePicture || '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);

      const submitData = {
        ...formData,
        birthday: formData.birthday ? new Date(formData.birthday) : undefined,
      };

      if (contact) {
        await updateContact(contact.id, submitData);
      } else {
        await addContact(submitData);
      }

      onSubmit?.();
      router.back();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save contact');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.field}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={formData.name}
          onChangeText={(text) => setFormData(prev => ({ ...prev, name: text }))}
          placeholder="Enter name"
          placeholderTextColor={Colors.textSecondary}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={formData.email}
          onChangeText={(text) => setFormData(prev => ({ ...prev, email: text }))}
          placeholder="Enter email"
          placeholderTextColor={Colors.textSecondary}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Phone</Text>
        <TextInput
          style={styles.input}
          value={formData.phone}
          onChangeText={(text) => setFormData(prev => ({ ...prev, phone: text }))}
          placeholder="Enter phone number"
          placeholderTextColor={Colors.textSecondary}
          keyboardType="phone-pad"
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Relationship Type</Text>
        <TextInput
          style={styles.input}
          value={formData.relationshipType}
          onChangeText={(text) => setFormData(prev => ({ ...prev, relationshipType: text }))}
          placeholder="Enter relationship type"
          placeholderTextColor={Colors.textSecondary}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Birthday</Text>
        <TextInput
          style={styles.input}
          value={formData.birthday}
          onChangeText={(text) => setFormData(prev => ({ ...prev, birthday: text }))}
          placeholder="YYYY-MM-DD"
          placeholderTextColor={Colors.textSecondary}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Profile Picture URL</Text>
        <TextInput
          style={styles.input}
          value={formData.profilePicture}
          onChangeText={(text) => setFormData(prev => ({ ...prev, profilePicture: text }))}
          placeholder="Enter profile picture URL"
          placeholderTextColor={Colors.textSecondary}
        />
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
          {loading ? 'Saving...' : contact ? 'Update Contact' : 'Create Contact'}
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