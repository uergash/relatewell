import { useState, useEffect } from 'react';
import { interactionsService } from '@/services/supabase/interactions';
import type { Interaction } from '@/types/models';

export function useInteractions() {
  const [interactions, setInteractions] = useState<Interaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    loadInteractions();
  }, []);

  const loadInteractions = async () => {
    try {
      setLoading(true);
      const data = await interactionsService.getAll();
      setInteractions(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load interactions'));
    } finally {
      setLoading(false);
    }
  };

  const addInteraction = async (interaction: Omit<Interaction, 'id' | 'createdAt' | 'updatedAt'>, contactIds: string[]) => {
    try {
      const newInteraction = await interactionsService.create(interaction, contactIds);
      setInteractions(prev => [...prev, newInteraction]);
      return newInteraction;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to add interaction'));
      throw err;
    }
  };

  const updateInteraction = async (id: string, interaction: Partial<Interaction>, contactIds?: string[]) => {
    try {
      const updatedInteraction = await interactionsService.update(id, interaction, contactIds);
      setInteractions(prev => prev.map(i => i.id === id ? updatedInteraction : i));
      return updatedInteraction;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update interaction'));
      throw err;
    }
  };

  const deleteInteraction = async (id: string) => {
    try {
      await interactionsService.delete(id);
      setInteractions(prev => prev.filter(i => i.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to delete interaction'));
      throw err;
    }
  };

  const getInteractionById = async (id: string) => {
    try {
      return await interactionsService.getWithContacts(id);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to get interaction'));
      throw err;
    }
  };

  return {
    interactions,
    loading,
    error,
    addInteraction,
    updateInteraction,
    deleteInteraction,
    getInteractionById,
    refreshInteractions: loadInteractions,
  };
} 