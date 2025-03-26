import { supabase } from '@/lib/supabase/client';
import type { Database } from '@/types/supabase';

type Topic = Database['public']['Tables']['topics']['Row'];
type TopicInsert = Database['public']['Tables']['topics']['Insert'];
type TopicUpdate = Database['public']['Tables']['topics']['Update'];

export const topicsService = {
  // Get all topics
  async getAll() {
    const { data, error } = await supabase
      .from('topics')
      .select('*')
      .order('name');
    
    if (error) throw error;
    return data;
  },

  // Get a single topic by ID
  async getById(id: string) {
    const { data, error } = await supabase
      .from('topics')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  // Create a new topic
  async create(topic: TopicInsert) {
    const { data, error } = await supabase
      .from('topics')
      .insert(topic)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Update a topic
  async update(id: string, topic: TopicUpdate) {
    const { data, error } = await supabase
      .from('topics')
      .update(topic)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Delete a topic
  async delete(id: string) {
    const { error } = await supabase
      .from('topics')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  // Get topic with its contacts
  async getWithContacts(id: string) {
    const { data, error } = await supabase
      .from('topics')
      .select(`
        *,
        contact_topics (
          contact:contacts (*)
        )
      `)
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  // Get topics by contact ID
  async getByContactId(contactId: string) {
    const { data, error } = await supabase
      .from('topics')
      .select(`
        *,
        contact_topics!inner (
          contact_id
        )
      `)
      .eq('contact_topics.contact_id', contactId)
      .order('name');
    
    if (error) throw error;
    return data;
  }
}; 