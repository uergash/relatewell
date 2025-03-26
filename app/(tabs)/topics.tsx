import { useState } from 'react';
import { StyleSheet, View, Text, FlatList, Pressable } from 'react-native';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useTopics } from '@/hooks/useTopics';
import type { Topic } from '@/types/models';

export default function TopicsScreen() {
  const { topics, loading, error, deleteTopic } = useTopics();
  const [selectedCategory, setSelectedCategory] = useState<Topic['category'] | null>(null);

  const filteredTopics = selectedCategory
    ? topics.filter(topic => topic.category === selectedCategory)
    : topics;

  const handleDelete = async (id: string) => {
    try {
      await deleteTopic(id);
    } catch (err) {
      console.error('Failed to delete topic:', err);
    }
  };

  const renderTopic = ({ item }: { item: Topic }) => (
    <Pressable
      style={styles.topicCard}
      onPress={() => router.push(`/topics/${item.id}`)}>
      <View style={styles.topicHeader}>
        <Text style={styles.topicName}>{item.name}</Text>
        <Pressable
          style={styles.deleteButton}
          onPress={() => handleDelete(item.id)}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </Pressable>
      </View>
      <Text style={styles.topicDescription}>{item.description}</Text>
      <View style={styles.topicFooter}>
        <Text style={styles.topicCategory}>{item.category}</Text>
        <Text style={styles.topicDate}>
          {new Date(item.updatedAt).toLocaleDateString()}
        </Text>
      </View>
    </Pressable>
  );

  const renderCategoryFilter = () => (
    <View style={styles.categoryFilter}>
      <Pressable
        style={[
          styles.categoryButton,
          !selectedCategory && styles.categoryButtonActive
        ]}
        onPress={() => setSelectedCategory(null)}>
        <Text style={[
          styles.categoryButtonText,
          !selectedCategory && styles.categoryButtonTextActive
        ]}>
          All
        </Text>
      </Pressable>
      {(['general', 'family', 'work', 'social', 'health'] as const).map((category) => (
        <Pressable
          key={category}
          style={[
            styles.categoryButton,
            selectedCategory === category && styles.categoryButtonActive
          ]}
          onPress={() => setSelectedCategory(category)}>
          <Text style={[
            styles.categoryButtonText,
            selectedCategory === category && styles.categoryButtonTextActive
          ]}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Text>
        </Pressable>
      ))}
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading topics...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Topics</Text>
        <Pressable
          style={styles.addButton}
          onPress={() => router.push('/topics/new')}>
          <Text style={styles.addButtonText}>Add Topic</Text>
        </Pressable>
      </View>

      {renderCategoryFilter()}

      <FlatList
        data={filteredTopics}
        renderItem={renderTopic}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: Colors.text,
  },
  addButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    color: Colors.card,
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  categoryFilter: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 8,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  categoryButtonActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  categoryButtonText: {
    color: Colors.text,
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  categoryButtonTextActive: {
    color: Colors.card,
  },
  list: {
    padding: 16,
  },
  topicCard: {
    backgroundColor: Colors.card,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  topicHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  topicName: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: Colors.text,
  },
  deleteButton: {
    padding: 4,
  },
  deleteButtonText: {
    color: Colors.error,
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  topicDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  topicFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topicCategory: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontFamily: 'Inter-Medium',
  },
  topicDate: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 32,
    fontSize: 16,
    color: Colors.textSecondary,
  },
  errorText: {
    textAlign: 'center',
    marginTop: 32,
    fontSize: 16,
    color: Colors.error,
  },
}); 