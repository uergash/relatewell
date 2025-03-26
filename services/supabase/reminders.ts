import { supabase } from '@/lib/supabase/client';
import type { Database } from '@/types/supabase';

type Reminder = Database['public']['Tables']['reminders']['Row'];
type ReminderInsert = Database['public']['Tables']['reminders']['Insert'];
type ReminderUpdate = Database['public']['Tables']['reminders']['Update'];

export const remindersService = {
  // Get all reminders
  async getAll() {
    const { data, error } = await supabase
      .from('reminders')
      .select('*')
      .order('date');
    
    if (error) throw error;
    return data;
  },

  // Get a single reminder by ID
  async getById(id: string) {
    const { data, error } = await supabase
      .from('reminders')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  // Create a new reminder
  async create(reminder: ReminderInsert) {
    const { data, error } = await supabase
      .from('reminders')
      .insert(reminder)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Update a reminder
  async update(id: string, reminder: ReminderUpdate) {
    const { data, error } = await supabase
      .from('reminders')
      .update(reminder)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Delete a reminder
  async delete(id: string) {
    const { error } = await supabase
      .from('reminders')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  // Get reminders by contact ID
  async getByContactId(contactId: string) {
    const { data, error } = await supabase
      .from('reminders')
      .select('*')
      .eq('contact_id', contactId)
      .order('date');
    
    if (error) throw error;
    return data;
  },

  // Get reminders by status
  async getByStatus(status: string) {
    const { data, error } = await supabase
      .from('reminders')
      .select('*')
      .eq('status', status)
      .order('date');
    
    if (error) throw error;
    return data;
  },

  // Get reminder with its contact
  async getWithContact(id: string) {
    const { data, error } = await supabase
      .from('reminders')
      .select(`
        *,
        contact:contacts (*)
      `)
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  }
}; 