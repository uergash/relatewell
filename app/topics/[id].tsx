import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useTopics } from '@/hooks/useTopics';
import { TopicForm } from '@/components/topics/TopicForm';
import type { Topic } from '@/types/models';

export default function TopicScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { topics } = useTopics();
  const [topic, setTopic] = useState<Topic | undefined>();

  useEffect(() => {
    if (id && id !== 'new') {
      const foundTopic = topics.find(t => t.id === id);
      setTopic(foundTopic);
    }
  }, [id, topics]);

  return (
    <View style={styles.container}>
      <TopicForm topic={topic} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
}); 