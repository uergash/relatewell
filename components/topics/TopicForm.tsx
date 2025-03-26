import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Pressable, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useTopics } from '@/hooks/useTopics';
import type { Topic } from '@/types/models';

interface TopicFormProps {
  topic?: Topic;
  onSubmit?: () => void;
}

export function TopicForm({ topic, onSubmit }: TopicFormProps) {
  const { addTopic, updateTopic } = useTopics();
  
  const [formData, setFormData] = useState({
    name: topic?.name || '',
    description: topic?.description || '',
    category: topic?.category || 'general',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);

      if (topic) {
        await updateTopic(topic.id, formData);
      } else {
        await addTopic(formData);
      }

      onSubmit?.();
      router.back();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save topic');
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
          placeholder="Enter topic name"
          placeholderTextColor={Colors.textSecondary}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={formData.description}
          onChangeText={(text) => setFormData(prev => ({ ...prev, description: text }))}
          placeholder="Enter topic description"
          placeholderTextColor={Colors.textSecondary}
          multiline
          numberOfLines={4}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Category</Text>
        <View style={styles.categoryContainer}>
          {(['general', 'family', 'work', 'social', 'health'] as const).map((category) => (
            <Pressable
              key={category}
              style={[
                styles.categoryButton,
                formData.category === category && styles.categoryButtonActive
              ]}
              onPress={() => setFormData(prev => ({ ...prev, category }))}>
              <Text style={[
                styles.categoryText,
                formData.category === category && styles.categoryTextActive
              ]}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
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
          {loading ? 'Saving...' : topic ? 'Update Topic' : 'Create Topic'}
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
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  categoryButtonActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  categoryText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.text,
  },
  categoryTextActive: {
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