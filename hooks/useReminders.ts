import { useState, useEffect } from 'react';
import { remindersService } from '@/services/supabase/reminders';
import type { Reminder } from '@/types/models';

export function useReminders() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    loadReminders();
  }, []);

  const loadReminders = async () => {
    try {
      setLoading(true);
      const data = await remindersService.getAll();
      setReminders(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load reminders'));
    } finally {
      setLoading(false);
    }
  };

  const addReminder = async (reminder: Omit<Reminder, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newReminder = await remindersService.create(reminder);
      setReminders(prev => [...prev, newReminder]);
      return newReminder;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to add reminder'));
      throw err;
    }
  };

  const updateReminder = async (id: string, reminder: Partial<Reminder>) => {
    try {
      const updatedReminder = await remindersService.update(id, reminder);
      setReminders(prev => prev.map(r => r.id === id ? updatedReminder : r));
      return updatedReminder;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update reminder'));
      throw err;
    }
  };

  const deleteReminder = async (id: string) => {
    try {
      await remindersService.delete(id);
      setReminders(prev => prev.filter(r => r.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to delete reminder'));
      throw err;
    }
  };

  const getReminderById = async (id: string) => {
    try {
      return await remindersService.getWithContact(id);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to get reminder'));
      throw err;
    }
  };

  const getRemindersByContact = async (contactId: string) => {
    try {
      return await remindersService.getByContactId(contactId);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to get contact reminders'));
      throw err;
    }
  };

  const getRemindersByStatus = async (status: string) => {
    try {
      return await remindersService.getByStatus(status);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to get reminders by status'));
      throw err;
    }
  };

  return {
    reminders,
    loading,
    error,
    addReminder,
    updateReminder,
    deleteReminder,
    getReminderById,
    getRemindersByContact,
    getRemindersByStatus,
    refreshReminders: loadReminders,
  };
} 