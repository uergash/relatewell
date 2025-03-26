import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { Topic } from '@/types/models';

export function useTopics() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTopics();
  }, []);

  const loadTopics = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('topics')
        .select('*')
        .order('name');

      if (error) throw error;
      setTopics(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load topics');
    } finally {
      setLoading(false);
    }
  };

  const addTopic = async (topic: Omit<Topic, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setError(null);

      const { data, error } = await supabase
        .from('topics')
        .insert([topic])
        .select()
        .single();

      if (error) throw error;
      setTopics(prev => [...prev, data]);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add topic');
      throw err;
    }
  };

  const updateTopic = async (id: string, topic: Partial<Topic>) => {
    try {
      setError(null);

      const { data, error } = await supabase
        .from('topics')
        .update(topic)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setTopics(prev => prev.map(t => t.id === id ? data : t));
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update topic');
      throw err;
    }
  };

  const deleteTopic = async (id: string) => {
    try {
      setError(null);

      const { error } = await supabase
        .from('topics')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setTopics(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete topic');
      throw err;
    }
  };

  return {
    topics,
    loading,
    error,
    addTopic,
    updateTopic,
    deleteTopic,
    refreshTopics: loadTopics,
  };
} 