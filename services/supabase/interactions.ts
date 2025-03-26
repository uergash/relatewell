import { supabase } from '@/lib/supabase/client';
import type { Database } from '@/types/supabase';

type Interaction = Database['public']['Tables']['interactions']['Row'];
type InteractionInsert = Database['public']['Tables']['interactions']['Insert'];
type InteractionUpdate = Database['public']['Tables']['interactions']['Update'];

export const interactionsService = {
  // Get all interactions
  async getAll() {
    const { data, error } = await supabase
      .from('interactions')
      .select('*')
      .order('date', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  // Get a single interaction by ID
  async getById(id: string) {
    const { data, error } = await supabase
      .from('interactions')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  // Create a new interaction
  async create(interaction: InteractionInsert, contactIds: string[]) {
    const { data: interactionData, error: interactionError } = await supabase
      .from('interactions')
      .insert(interaction)
      .select()
      .single();
    
    if (interactionError) throw interactionError;

    // Create interaction_contacts relationships
    const { error: relationError } = await supabase
      .from('interaction_contacts')
      .insert(
        contactIds.map(contactId => ({
          interaction_id: interactionData.id,
          contact_id: contactId
        }))
      );

    if (relationError) throw relationError;

    return interactionData;
  },

  // Update an interaction
  async update(id: string, interaction: InteractionUpdate, contactIds?: string[]) {
    const { data, error } = await supabase
      .from('interactions')
      .update(interaction)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;

    // Update contact relationships if provided
    if (contactIds) {
      // Delete existing relationships
      await supabase
        .from('interaction_contacts')
        .delete()
        .eq('interaction_id', id);

      // Create new relationships
      const { error: relationError } = await supabase
        .from('interaction_contacts')
        .insert(
          contactIds.map(contactId => ({
            interaction_id: id,
            contact_id: contactId
          }))
        );

      if (relationError) throw relationError;
    }

    return data;
  },

  // Delete an interaction
  async delete(id: string) {
    const { error } = await supabase
      .from('interactions')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  // Get interaction with its contacts
  async getWithContacts(id: string) {
    const { data, error } = await supabase
      .from('interactions')
      .select(`
        *,
        interaction_contacts (
          contact:contacts (*)
        )
      `)
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  }
}; 