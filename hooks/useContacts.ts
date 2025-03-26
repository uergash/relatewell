import { useState, useEffect } from 'react';
import { contactsService } from '@/services/supabase/contacts';
import type { Contact } from '@/types/models';

export function useContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      setLoading(true);
      const data = await contactsService.getAll();
      setContacts(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load contacts'));
    } finally {
      setLoading(false);
    }
  };

  const addContact = async (contact: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newContact = await contactsService.create(contact);
      setContacts(prev => [...prev, newContact]);
      return newContact;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to add contact'));
      throw err;
    }
  };

  const updateContact = async (id: string, contact: Partial<Contact>) => {
    try {
      const updatedContact = await contactsService.update(id, contact);
      setContacts(prev => prev.map(c => c.id === id ? updatedContact : c));
      return updatedContact;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update contact'));
      throw err;
    }
  };

  const deleteContact = async (id: string) => {
    try {
      await contactsService.delete(id);
      setContacts(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to delete contact'));
      throw err;
    }
  };

  const getContactById = async (id: string) => {
    try {
      return await contactsService.getById(id);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to get contact'));
      throw err;
    }
  };

  return {
    contacts,
    loading,
    error,
    addContact,
    updateContact,
    deleteContact,
    getContactById,
    refreshContacts: loadContacts,
  };
} 