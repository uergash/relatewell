import { supabase } from '@/lib/supabase/client';
import type { Database } from '@/types/supabase';

type Contact = Database['public']['Tables']['contacts']['Row'];
type ContactInsert = Database['public']['Tables']['contacts']['Insert'];
type ContactUpdate = Database['public']['Tables']['contacts']['Update'];

export const contactsService = {
  // Get all contacts
  async getAll() {
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('name');
    
    if (error) throw error;
    return data;
  },

  // Get a single contact by ID
  async getById(id: string) {
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  // Create a new contact
  async create(contact: ContactInsert) {
    const { data, error } = await supabase
      .from('contacts')
      .insert(contact)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Update a contact
  async update(id: string, contact: ContactUpdate) {
    const { data, error } = await supabase
      .from('contacts')
      .update(contact)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Delete a contact
  async delete(id: string) {
    const { error } = await supabase
      .from('contacts')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  // Get contacts with their topics
  async getWithTopics(id: string) {
    const { data, error } = await supabase
      .from('contacts')
      .select(`
        *,
        contact_topics (
          topic:topics (*)
        )
      `)
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  // Get contacts with their interactions
  async getWithInteractions(id: string) {
    const { data, error } = await supabase
      .from('contacts')
      .select(`
        *,
        interaction_contacts (
          interaction:interactions (*)
        )
      `)
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  // Get contacts with their reminders
  async getWithReminders(id: string) {
    const { data, error } = await supabase
      .from('contacts')
      .select(`
        *,
        reminders (*)
      `)
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  }
}; 