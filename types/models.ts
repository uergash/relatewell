export interface Contact {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  relationshipType: string;
  birthday?: Date;
  profilePicture?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Group {
  id: string;
  name: string;
  description?: string;
  contacts: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Interaction {
  id: string;
  date: Date;
  contactId: string;
  type: 'relationship_event' | 'life_event';
  notes?: string;
  location?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type TopicCategory = 'next_time' | 'conversation_starter' | 'evergreen' | 'avoid';

export interface Topic {
  id: string;
  contactId: string;
  text: string;
  category: TopicCategory;
  lastDiscussed?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ConversationTopic {
  id: string;
  contactId: string;
  nextTimeTopics: string[];
  conversationStarters: string[];
  evergreenTopics: string[];
  topicsToAvoid: string[];
  createdAt: Date;
  updatedAt: Date;
}

export type GiftStatus = 'idea' | 'purchased' | 'given';
export type GiftReaction = 'loved' | 'liked' | 'neutral';

export interface Gift {
  id: string;
  name: string;
  description?: string;
  price?: number;
  status: GiftStatus;
  reaction?: GiftReaction;
  contactId: string;
  occasion?: string;
  givenDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type ReminderType = 'birthday' | 'check_in' | 'follow_up' | 'custom';
export type ReminderStatus = 'pending' | 'completed' | 'snoozed';
export type ReminderRecurrence = 'none' | 'daily' | 'weekly' | 'monthly' | 'yearly';

export interface Reminder {
  id: string;
  title: string;
  description?: string;
  type: ReminderType;
  date: Date;
  time?: string;
  contactId: string;
  status: ReminderStatus;
  recurrence: ReminderRecurrence;
  snoozedUntil?: Date;
  interactionId?: string;
  createdAt: Date;
  updatedAt: Date;
}